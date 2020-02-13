import React, { useState, useEffect } from "react"
import { createIframeClient } from "@remixproject/plugin"

import { Debugger } from "@ethereum-react/components"
import { ControlFlowGraphCreator } from "@ethereum-react/utilities"

import { HomeView, ErrorView } from "./views"
import {
  getContractByteCode,
  getSolidityVersionFromData,
} from "./contract-util"
import { Header } from "./components/header"

const devMode = { port: 8080 }

export const RemixDebugger: React.FC = () => {
  const [clientInstance, setClientInstance] = useState(undefined)
  const [traces, setTraces] = useState(undefined)
  const [isInitialized, setIsInitialized] = useState(false)
  const [blocks, setBlocks] = useState(undefined)
  const [hasError, setHasError] = useState(false)
  const [contract, setContract] = useState("")
  const [txHash, setTxHash] = useState("")

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
          console.log("isContractCreation", isContractCreation)
          console.log("hash", hash)
          console.log("contractAddress", contractAddress)
          console.log("traces", traces)

          const compilationResult = await client.solidity.getCompilationResult()
          console.log("Compilation Result", compilationResult)

          const contractData = await getContractByteCode(
            (compilationResult as any).data,
            isContractCreation
          )

          setContract(`${contractData.contract} - ${contractData.contractFile}`)
          setTxHash(hash)
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
          setBlocks(blocks)
          setTraces(traces)

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
              `${contractData.contract} - ${contractData.contractFile}`
            )

            const controlFlowGraphResult = new ControlFlowGraphCreator().buildControlFlowGraph(
              contractData.bytecode,
              solidityVersion
            )

            console.log("Control flow graph result", controlFlowGraphResult)

            setBlocks(controlFlowGraphResult.contractRuntime.blocks)
            setTraces(undefined)

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

    clientInstance.emit("statusChanged", {
      key: "succeed",
      type: "success",
      title: `Control flow graph successfully generated`,
    })
  }

  return hasError ? (
    <ErrorView />
  ) : isInitialized ? (
    <div className="d-flex flex-column h-100">
      <Header
        contractName={contract}
        txHash={txHash}
        onRenderRequest={renderRequested}
      />
      <div className="h-100">
        <Debugger
          renderTrigger={false}
          blocks={renderMode && blocks}
          transactionTrace={renderMode === "traces" ? traces : undefined}
        />
      </div>
    </div>
  ) : (
    <HomeView />
  )
}
