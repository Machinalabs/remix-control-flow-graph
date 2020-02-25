import React, { useState, useEffect } from "react"
import { createIframeClient } from "@remixproject/plugin"

import { Debugger } from "@ethereum-react/components"
import { ControlFlowGraphCreator } from "@ethereum-react/utilities"

import { HomeView, ErrorView } from "./views"
import {
  getContractByteCode,
  getSolidityVersionFromData,
} from "./utils/contract-util"
import { Header } from "./components/Header"
import { Operation, CFGBlocks } from "@ethereum-react/types"
import {
  getContractSourceDetails,
  getActiveSourceForOp,
} from "./utils/source-utils"

const devMode = { port: 8080 }

interface TxDebugData {
  blocks: CFGBlocks
  traces: any
}

export const RemixDebugger: React.FC = () => {
  const [clientInstance, setClientInstance] = useState(undefined)
  const [debuggingTx, setDebuggingTx] = useState(undefined)
  const [isInitialized, setIsInitialized] = useState(false)
  const [blocks, setBlocks] = useState(undefined)
  const [hasError, setHasError] = useState(false)
  const [contract, setContract] = useState("")

  const [renderMode, setRenderMode] = useState(undefined)

  useEffect(() => {
    const client = createIframeClient({ devMode })
    const loadClient = async () => {
      await client.onload()
      setClientInstance(client)

      console.log("Remix Control Flow Graph Plugin has been loaded")

      client.udapp.on("newTransaction", async (transaction: any) => {
        console.log("A new transaction was sent", transaction)
        setRenderMode(null)

        if (!isInitialized) {
          setIsInitialized(true)
        }

        try {
          const { hash, contractAddress } = transaction

          const isContractCreation = contractAddress ? true : false
          const traces = await client.call("debugger" as any, "getTrace", hash)

          console.log("hash", hash)
          console.log("isContractCreation", isContractCreation)
          console.log("contractAddress", contractAddress)
          console.log("traces", traces)

          const compilationResult = await client.solidity.getCompilationResult()
          console.log("Compilation Result", compilationResult)

          const contractData = await getContractByteCode(
            (compilationResult as any).data,
            isContractCreation
          )
          console.log("Contract data", contractData)

          const solidityVersion = getSolidityVersionFromData(
            (compilationResult as any).data
          )
          console.log("Solidity version", solidityVersion)

          const controlFlowGraphResult = new ControlFlowGraphCreator().buildControlFlowGraph(
            contractData.bytecode,
            solidityVersion
          )
          console.log("Control flow graph result", controlFlowGraphResult)

          const blocks = isContractCreation
            ? controlFlowGraphResult.contractConstructor.blocks
            : controlFlowGraphResult.contractRuntime.blocks

          if (!blocks) {
            throw new Error("Couldn't get the blocks")
          }

          const sourceMapDetails = getContractSourceDetails(
            contractData.contractFile,
            contractData.bytecode,
            contractData.sourceMap,
            (compilationResult as any).source
          )

          setDebuggingTx({
            contract: `${contractData.contractName} - ${contractData.contractFile}`,
            txHash: hash,
            traces,
            blocks,
            bytecode: contractData.bytecode,
            source: sourceMapDetails,
          })

          client.emit("statusChanged", {
            key: "edited",
            type: "success",
            title: `Data changed. Run render to update graph`,
          })

          setHasError(false)
        } catch (error) {
          console.log(`An error ocurrer ${error}`)
          setHasError(true)
        }
      })

      client.solidity.on(
        "compilationFinished",
        async (fileName, source, languageVersion, data) => {
          console.log("A compilation finished")

          setRenderMode(null)

          if (!isInitialized) {
            setIsInitialized(true)
          }

          try {
            const solidityVersion = getSolidityVersionFromData(data)
            console.log("Solidity version", solidityVersion)

            const contractData = await getContractByteCode(data, false)
            console.log("Contract data", contractData)

            setContract(
              `${contractData.contractName} - ${contractData.contractFile}`
            )

            const controlFlowGraphResult = new ControlFlowGraphCreator().buildControlFlowGraph(
              contractData.bytecode,
              solidityVersion
            )

            console.log("Control flow graph result", controlFlowGraphResult)

            setBlocks(controlFlowGraphResult.contractRuntime.blocks)
            // setTraces(undefined)

            client.emit("statusChanged", {
              key: "edited",
              type: "success",
              title: `Data changed. Run render to update graph`,
            })
            setHasError(false)
          } catch (error) {
            console.log(`An error ocurrer ${error}`)
            setHasError(true)
          }
        }
      )
    }

    loadClient()
  }, [])

  useEffect(() => {
    if (hasError) {
      clientInstance.emit("statusChanged", {
        key: "failed",
        type: "error",
        title: `There was an error while generating the CFG`,
      })
    }
  }, [hasError])

  const renderRequested = renderMode => {
    setRenderMode(renderMode)
    clientInstance.editor.discardHighlight()

    clientInstance.emit("statusChanged", {
      key: "succeed",
      type: "success",
      title: `Control flow graph successfully generated`,
    })
  }

  const highlightLine = async (op: Operation) => {
    if (!debuggingTx) {
      return
    }

    const sourcePart = getActiveSourceForOp(debuggingTx.source, op.offset)

    if (!sourcePart) {
      clientInstance.editor.discardHighlight()
    }

    await clientInstance.editor.highlight(
      sourcePart,
      debuggingTx.source.contractFile,
      "var(--info)"
    )
  }

  return hasError ? (
    <ErrorView />
  ) : isInitialized ? (
    <div className="d-flex flex-column h-100">
      <Header
        contractDetails={contract ? { contractName: contract } : null}
        txDetails={
          debuggingTx
            ? { txHash: debuggingTx.txHash, contractName: debuggingTx.contract }
            : null
        }
        onRenderRequest={renderRequested}
      />
      <div className="h-100">
        {renderMode === "contract" && (
          <Debugger renderTrigger={false} blocks={blocks} />
        )}
        {renderMode === "traces" && debuggingTx && (
          <Debugger
            renderTrigger={false}
            blocks={debuggingTx.blocks}
            transactionTrace={debuggingTx.traces}
            operationSelected={op => highlightLine(op)}
          />
        )}
      </div>
    </div>
  ) : (
        <HomeView />
      )
}
