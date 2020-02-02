import React, { useState } from 'react'
import dagreD3 from 'dagre-d3'
import * as d3 from 'd3'
import styled from 'styled-components'
import { OperationBlock, Operation, CFGBlocks } from '@ethereum-react/types'
import { Selection } from 'd3-selection'

import { TransactionTrace } from './types'

export interface ICFGraphProps {
  blocks: CFGBlocks
  trace?: TransactionTrace
  options?: IGraphOptions
  operationSelected?: (op: Operation) => void
  renderTrigger?: any // for manual rendering
}

export interface IGraphOptions {
  dir: 'LR' | 'TB'
}

const offsetColWidth = 60
const opNameColWidth = 120
const argumentColWidth = 120
const rowHeight = 24
const letterWidth = 6.5 // approx for Arial 12px
const nodePadding = 4

export const CFGraph: React.FC<ICFGraphProps> = (props: ICFGraphProps) => {
  // const [activeBlocks, setActiveBlocks] = React.useState()
  const svgElemRef = React.useRef<SVGSVGElement>(null)
  const innerElemRef = React.useRef<SVGSVGElement>(null)

  React.useEffect(() => {
    if (props.blocks && !props.renderTrigger) {
      renderGraph()
    }
  }, [props.blocks])

  const renderGraph = () => {
    const g = new dagreD3.graphlib.Graph().setGraph({
      rankdir: 'LR',
      nodesep: 80
    })

    // Create the renderer
    const render = new dagreD3.render()

    const svg: any = d3.select(svgElemRef.current)
    const inner = d3.select(innerElemRef.current)

    // Set up zoom support
    const zoom = d3.zoom().on("zoom", () => {
      inner.attr("transform", d3.event.transform)
    })

    // clear graph
    inner.selectAll('*').remove()

    // reset display
    svg.call(zoom.transform, d3.zoomIdentity)

    // render blocks
    const blockKeys = props.blocks.keys()

    blockKeys.forEach((key) => {
      const block = props.blocks.get(key)
      renderBlock(block, g)
    })

    blockKeys.forEach((key) => {
      const block = props.blocks.get(key)
      renderEdges(block, g)
    })

    svg.call(zoom)

    // Run the renderer. This is what draws the final graph.
    render(inner as any, g)
  }

  const opSelected = (op: Operation) => {
    if (props.operationSelected) {
      props.operationSelected(op) // this triggers callback.. but now the next part is to make block hightlight when an element within is selected
      // it should be by offset...
      debugger;
      // setActiveBlocks(props.blocks.find(b => b.operations.includes(op)))
    }
  }

  const renderBlock = (block: OperationBlock, graph: dagreD3.graphlib.Graph) => {
    const svgWrap = d3.create("svg")
    const g = svgWrap.append("g")

    const maxArgLength = block.operations.reduce((max, op) => {
      return Math.max(max, getOperationArg(op).length)
    }, 0)

    const options = {
      argumentColLength: Math.max(
        maxArgLength * letterWidth + 20,
        argumentColWidth
      ),
    }

    renderOpRowsOutline(g, block.operations, options)
    renderText(g, block.operations, options)

    graph.setNode(block.offset.toString(), {
      label: g.node(),
      labelType: "svg",
      paddingLeft: nodePadding,
      paddingRight: nodePadding,
      paddingTop: nodePadding,
      paddingBottom: nodePadding
    })
  }

  const isInTrace = (op: Operation) => {
    return props.trace && props.trace.structLogs && !!props.trace.structLogs.find(t => t.pc === op.offset)
  }

  const cellRenderer = (
    selection: Selection<d3.EnterElement, Operation, SVGElement, undefined>,
    key: string,
    width: number,
    xPos: number
  ) => {
    const cells = selection
      .append("rect")
      .attr("id", d => d.offset + "-" + key)
      .attr("width", width)
      .attr("height", rowHeight)
      .attr("x", xPos)
      .attr("y", (d, i) => i * rowHeight)
      .classed("active-item", d => isInTrace(d))

    if (props.operationSelected) {
      cells.on("click", d => opSelected(d))
    }
  }

  const textRenderer = (
    selection: Selection<d3.EnterElement, Operation, SVGElement, undefined>,
    key: string,
    textResolver,
    width: number,
    xPos: number
  ) => {
    const cells = selection
      .append("text")
      .attr("id", d => d.offset + "-" + key + "text")
      .attr("x", xPos + width / 2)
      .attr("y", (d, i) => i * rowHeight + rowHeight / 2)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "central")
      .attr("font-family", "Arial")
      .attr("font-size", "12")
      .text(d => textResolver(d))

    if (props.operationSelected) {
      cells.on("click", d => opSelected(d))
    }
  }

  const getOperationArg = (op: Operation) => {
    return op.opcode.name.startsWith('PUSH') ? '0x' + op.argument.toString(16).toUpperCase() : ''
  }

  const renderOpRowsOutline = (
    g: Selection<SVGGElement, undefined, null, undefined>,
    operations: Operation[],
    options
  ) => {
    const selection = g
      .selectAll('rect')
      .data(operations)
      .enter()

    cellRenderer(selection, 'offset', offsetColWidth, 0)
    cellRenderer(selection, 'op', opNameColWidth, offsetColWidth)
    cellRenderer(selection, 'argument',
      options.argumentColLength,
      offsetColWidth + opNameColWidth)
  }

  const renderText = (g: Selection<SVGGElement, undefined, null, undefined>, operations: Operation[], options) => {
    const selection = g
      .selectAll('text')
      .data(operations)
      .enter()

    textRenderer(selection, 'offset', d => '0x' + d.offset.toString(16).toUpperCase(), offsetColWidth, 0)
    textRenderer(selection, 'op', d => d.opcode.name.toUpperCase(), opNameColWidth, offsetColWidth)
    textRenderer(
      selection,
      'argument',
      d => getOperationArg(d),
      options.argumentColLength,
      offsetColWidth + opNameColWidth
    )
  }

  const renderEdges = (block: OperationBlock, graph: dagreD3.graphlib.Graph) => {
    if (block.childA) {
      graph.setEdge(block.operations[0].offset.toString(), block.childA.toString(), { label: '' })
    }

    if (block.childB) {
      graph.setEdge(block.operations[0].offset.toString(), block.childB.toString(), { label: '' })
    }
  }

  return (
    <StyledWrapper>
      {props.renderTrigger &&
        <button id="btn" className="btn btn-primary" onClick={() => renderGraph()}>
          Render CFG
     </button>}
      <svg ref={svgElemRef} id="graph" width="100%" height="100%">
        <g ref={innerElemRef} />
      </svg>
    </StyledWrapper>

  )
}

const StyledWrapper = styled.div`
  height: 100%;
  svg {
    border: 1.5px solid #999;
    overflow: hidden;
  }

  .node {
    white-space: nowrap;
  }

  .node .label-container {
    stroke: #7a7a7a;
  }

  .node rect,
  .node circle,
  .node ellipse {
    stroke: #c6c6c6;
    fill: #fff;
    stroke-width: 1px;
    cursor: pointer;
  }

  .node text {
    cursor: pointer;
  }

  .node .active-item {
    fill: #eaeaea;
  }

  .cluster rect {
    stroke: #333;
    fill: #000;
    fill-opacity: 0.1;
    stroke-width: 1.5px;
  }

  .edgePath path.path {
    stroke: #6f6f6f;
    stroke-width: 1.5px;
    fill: none;
  }

  .edgePath marker path {
    fill: #6f6f6f;
  }
`
