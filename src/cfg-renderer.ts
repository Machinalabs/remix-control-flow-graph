import dagreD3 from "dagre-d3"
import * as d3 from "d3"
import { Selection } from "d3-selection"
import { OperationBlock, Operation } from "@ethereum-react/types"

export type Trace = Array<{
  depth: number
  error?: any
  gas: string
  gasCost: string
  memory: string[]
  op: string
  pc: number
  stack?: string[]
  storage?: any
}>

export interface IGraphOptions {
  dir: "LR" | "TB"
}

export class CFGraph {
  private offsetColWidth = 60
  private opNameColWidth = 120
  private argumentColWidth = 120
  private rowHeight = 24
  private letterWidth = 6.5 // approx for Arial 12px
  private nodePadding = 4

  private innerElem: SVGGElement
  private operationSelected?: (op: Operation) => void
  private trace: Trace
  private zoom: d3.ZoomBehavior<Element, unknown>
  private g: dagreD3.graphlib.Graph

  constructor(
    private element: HTMLElement,
    operationSelected?: (op: Operation) => void
  ) {
    this.innerElem = document.createElementNS("http://www.w3.org/2000/svg", "g")
    this.element.appendChild(this.innerElem)

    this.operationSelected = operationSelected

    const svg: any = d3.select(this.element)
    const inner = d3.select(this.innerElem)

    // Set up zoom support
    const zoom = d3.zoom().on("zoom", () => {
      inner.attr("transform", d3.event.transform)
    })

    this.zoom = zoom
    svg.call(zoom)
  }

  renderGraph(blocks: OperationBlock[], trace?: Trace) {
    // TODO: do not set private prop here
    this.trace = trace

    // setup graph rendering
    this.g = new dagreD3.graphlib.Graph().setGraph({
      rankdir: "LR",
      nodesep: 80,
    })

    // Create the renderer
    const render = new dagreD3.render()
    blocks.forEach(block => this.renderBlock(block, this.g))
    blocks.forEach(block => this.renderEdges(block, this.g))
    // Run the renderer. This is what draws the final graph.
    const inner = d3.select(this.innerElem)
    render(inner as any, this.g)

    // // Center the graph
    // const initialScale = 1
    // svg.call(
    //   zoom.transform,
    //   d3.zoomIdentity.translate(0, 0).scale(initialScale)
    // )
    // svg.attr('height', g.graph().height * initialScale + 40)
  }

  public clearGraph() {
    const inner = d3.select(this.innerElem)
    inner.selectAll("*").remove()

    this.resetDisplay()
  }

  private resetDisplay() {
    const svg: any = d3.select(this.element)
    svg.call(this.zoom.transform, d3.zoomIdentity)
  }

  private renderBlock(block: OperationBlock, graph: dagreD3.graphlib.Graph) {
    const svgWrap = d3.create("svg")
    const g = svgWrap.append("g")

    const maxArgLength = block.operations.reduce((max, op) => {
      return Math.max(max, this.getOperationArg(op).length)
    }, 0)

    const options = {
      argumentColLength: Math.max(
        maxArgLength * this.letterWidth + 20,
        this.argumentColWidth
      ),
    }

    this.renderOpRowsOutline(g, block.operations, options)
    this.renderText(g, block.operations, options)

    graph.setNode(block.offset.toString(), {
      label: g.node(),
      labelType: "svg",
      paddingLeft: this.nodePadding,
      paddingRight: this.nodePadding,
      paddingTop: this.nodePadding,
      paddingBottom: this.nodePadding,
    })
  }

  private renderText(
    g: Selection<SVGGElement, undefined, null, undefined>,
    operations: Operation[],
    options
  ) {
    const selection = g
      .selectAll("text")
      .data(operations)
      .enter()

    this.textRenderer(
      selection,
      "offset",
      d => "0x" + d.offset.toString(16).toUpperCase(),
      this.offsetColWidth,
      0
    )
    this.textRenderer(
      selection,
      "op",
      d => d.opcode.name.toUpperCase(),
      this.opNameColWidth,
      this.offsetColWidth
    )
    this.textRenderer(
      selection,
      "argument",
      d => this.getOperationArg(d),
      options.argumentColLength,
      this.offsetColWidth + this.opNameColWidth
    )
  }

  private renderOpRowsOutline(
    g: Selection<SVGGElement, undefined, null, undefined>,
    operations: Operation[],
    options
  ) {
    const selection = g
      .selectAll("rect")
      .data(operations)
      .enter()

    this.cellRenderer(selection, "offset", this.offsetColWidth, 0)
    this.cellRenderer(selection, "op", this.opNameColWidth, this.offsetColWidth)
    this.cellRenderer(
      selection,
      "argument",
      options.argumentColLength,
      this.offsetColWidth + this.opNameColWidth
    )
  }

  private cellRenderer(
    selection: Selection<d3.EnterElement, Operation, SVGElement, undefined>,
    key: string,
    width: number,
    xPos: number
  ) {
    const cells = selection
      .append("rect")
      .attr("id", d => d.offset + "-" + key)
      .attr("width", width)
      .attr("height", this.rowHeight)
      .attr("x", xPos)
      .attr("y", (d, i) => i * this.rowHeight)
      .classed("active-item", d => this.isInTrace(d))

    if (this.operationSelected) {
      cells.on("click", d => this.opSelected(d))
    }
  }

  private textRenderer(
    selection: Selection<d3.EnterElement, Operation, SVGElement, undefined>,
    key: string,
    textResolver,
    width: number,
    xPos: number
  ) {
    const cells = selection
      .append("text")
      .attr("id", d => d.offset + "-" + key + "text")
      .attr("x", xPos + width / 2)
      .attr("y", (d, i) => i * this.rowHeight + this.rowHeight / 2)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "central")
      .attr("font-family", "Arial")
      .attr("font-size", "12")
      .text(d => textResolver(d))

    if (this.operationSelected) {
      cells.on("click", d => this.opSelected(d))
    }
  }

  private renderEdges(block: OperationBlock, graph: dagreD3.graphlib.Graph) {
    if (block.childA) {
      graph.setEdge(
        block.operations[0].offset.toString(),
        block.childA.toString(),
        { label: "" }
      )
    }

    if (block.childB) {
      graph.setEdge(
        block.operations[0].offset.toString(),
        block.childB.toString(),
        { label: "" }
      )
    }
  }

  private isInTrace(op: Operation) {
    return this.trace && !!this.trace.find(t => t.pc === op.offset)
  }

  private opSelected(op: Operation) {
    if (this.operationSelected) {
      this.operationSelected(op)
      // setActiveBlocks(props.blocks.find(b => b.operations.includes(op)))
    }
  }

  private getOperationArg(op: Operation) {
    return op.opcode.name.startsWith("PUSH")
      ? "0x" + op.argument.toString(16).toUpperCase()
      : ""
  }
}
