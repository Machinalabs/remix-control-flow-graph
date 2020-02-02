import React, { useState, useEffect } from "react"
import { createIframeClient } from "@remixproject/plugin"

import { Debugger } from "@ethereum-react/components"
import { ControlFlowGraphCreator } from "@ethereum-react/utilities"

import { HomeView, ErrorView } from "./views"
import {
  getContractByteCode,
  getSolidityVersionFromData,
} from "./contract-util"

const devMode = { port: 8000 }

export const RemixDebugger: React.FC = () => {
  const [clientInstance, setClientInstance] = useState(undefined)
  const [traces, setTraces] = useState(undefined)
  const [isInitialized, setIsInitialized] = useState(false)
  const [blocks, setBlocks] = useState(undefined)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const client = createIframeClient({ devMode })
    const loadClient = async () => {
      await client.onload()
      setClientInstance(client)

      console.log("Remix Control Flow Graph Plugin has been loaded")

      client.udapp.on("newTransaction", async (transaction: any) => {
        console.log("A new transaction was sent", transaction)

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

          const bytecode = await getContractByteCode(
            (compilationResult as any).data,
            isContractCreation
          )
          console.log("bytecode", bytecode)

          const solidityVersion = getSolidityVersionFromData(
            (compilationResult as any).data
          )
          console.log("Solidity version", solidityVersion)

          const controlFlowGraphResult = new ControlFlowGraphCreator().buildControlFlowGraph(
            bytecode,
            solidityVersion
          )
          console.log("Control flow graph result", controlFlowGraphResult)

          const blocks = isContractCreation
            ? controlFlowGraphResult.contractConstructor.blocks
            : controlFlowGraphResult.contractRuntime.blocks

          setBlocks(blocks)
          setTraces(traces)

          client.emit("statusChanged", {
            key: "succeed",
            type: "success",
            title: `Control flow graph successfully generated`,
          })
        } catch (error) {
          console.log(`An error ocurrer ${error}`)
          setHasError(true)
        }
      })

      client.solidity.on(
        "compilationFinished",
        async (fileName, source, languageVersion, data) => {
          console.log("A compilation finished")
          if (!isInitialized) {
            setIsInitialized(true)
          }

          try {
            const solidityVersion = getSolidityVersionFromData(data)
            console.log("Solidity version", solidityVersion)

            const bytecode = await getContractByteCode(data, false)
            console.log("Bytecode", bytecode)

            const controlFlowGraphResult = new ControlFlowGraphCreator().buildControlFlowGraph(
              bytecode,
              solidityVersion
            )

            console.log("Control flow graph result", controlFlowGraphResult)

            setBlocks(controlFlowGraphResult.contractRuntime.blocks)
            setTraces([])

            client.emit("statusChanged", {
              key: "succeed",
              type: "success",
              title: `Control flow graph successfully generated`,
            })
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
      setHasError(false)
    }
  }, [hasError])
  return hasError ? (
    <ErrorView />
  ) : isInitialized ? (
    <Debugger renderTrigger={true} blocks={blocks} transactionTrace={traces} />
  ) : (
        <HomeView />
      )
}
