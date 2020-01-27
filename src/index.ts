import { ControlFlowGraphCreator } from "@ethereum-react/utilities"
import {
  Api,
  CompilationResult,
  createIframeClient,
  IRemixApi,
  PluginApi,
  PluginClient,
  RemixTx,
  CompilationFileSources,
} from "@remixproject/plugin"
import { CFGraph } from "./cfg-renderer"
// import blocks from './sampleData.json'
import { getContractByteCode } from "./contract-util"
import { OperationBlock } from "@ethereum-react/types"

const devMode = { port: 8080 }

export class CfGraphPlugin {
  private readonly client: PluginApi<Readonly<IRemixApi>> &
    PluginClient<Api, Readonly<IRemixApi>>
  private cfgRenderer: CFGraph

  private activeTx: RemixTx

  constructor() {
    this.client = createIframeClient({ devMode })
  }

  public async init() {
    console.log("Pluging loaded but waiting for Remix")

    await this.client.onload()
    this.cfgRenderer = new CFGraph(document.getElementById("cfg"))

    setTimeout(
      () =>
        this.client.emit("statusChanged", {
          key: "succeed",
          type: "success",
          title: "Documentation ready !",
        }),
      1000
    )

    document.getElementById("btn").addEventListener("click", async () => {
      this.render()
    })

    this.client.udapp.on("newTransaction", async (transaction: RemixTx) => {
      this.activeTx = transaction
      this.cfgRenderer.clearGraph()
    })

    this.client.solidity.on(
      "compilationFinished",
      async (
        fileName: string,
        source: CompilationFileSources,
        languageVersion: string,
        data: CompilationResult
      ) => {
        this.activeTx = null
        this.cfgRenderer.clearGraph()
      }
    )
  }

  private async render() {
    let traces
    let bytecode

    if (this.activeTx) {
      const { hash, contractAddress } = this.activeTx as any
      const isContractCreation = contractAddress ? true : false

      traces = await this.client.call("debugger" as any, "getTrace", hash)
      bytecode = await getContractByteCode(
        this.client.solidity,
        isContractCreation
      )
    } else {
      bytecode = await getContractByteCode(this.client.solidity, false)
    }

    const flow = new ControlFlowGraphCreator().buildControlFlowGraphFromBytecode(
      bytecode
    )

    this.cfgRenderer.renderGraph(
      (flow.contractRuntime.blocks.values() as any) as OperationBlock[],
      traces ? traces.structLogs : null
    )
    return
  }
}

new CfGraphPlugin().init().then(() => {
  console.log("CFG Plugin loaded!!")
})
