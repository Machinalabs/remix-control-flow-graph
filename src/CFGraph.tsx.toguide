import React from 'react'
import dagreD3 from 'dagre-d3'
import * as d3 from 'd3'
import styled from 'styled-components'
import { OperationBlock, Operation } from '@ethereum-react/types'
import { Selection } from 'd3-selection'
import { ICFGraphProps } from './types'

export const CFGraph: React.FC<ICFGraphProps> = (props: ICFGraphProps) => {
  const [activeBlocks, setActiveBlocks] = React.useState()
  React.useEffect(() => {
    clearGraph()
    renderGraph()
  }, [props.blocks])

  const svgElem = React.useRef<SVGSVGElement>(null)
  const innerElem = React.useRef<SVGSVGElement>(null)

  const opSelected = (op: Operation) => {
    if (props.operationSelected) {
      props.operationSelected(op)
      setActiveBlocks(props.blocks.find(b => b.operations.includes(op)))
    }
  }

  const isInTrace = (op: Operation) => {
    return props.trace && !!props.trace.find(t => t.pc === op.offset)
  }

  const offsetColWidth = 60
  const opNameColWidth = 120
  const argumentColWidth = 120
  const rowHeight = 24
  const letterWidth = 6.5 // approx for Arial 12px
  const nodePadding = 4

  const cellRenderer = (
    selection: Selection<d3.EnterElement, Operation, SVGElement, undefined>,
    key: string,
    width: number,
    xPos: number
  ) => {
    const cells = selection
      .append('rect')
      .attr('id', d => d.offset + '-' + key)
      .attr('width', width)
      .attr('height', rowHeight)
      .attr('x', xPos)
      .attr('y', (d, i) => i * rowHeight)
      .classed('active-item', d => isInTrace(d))

    if (props.operationSelected) {
      cells.on('click', d => opSelected(d))
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
      .append('text')
      .attr('id', d => d.offset + '-' + key + 'text')
      .attr('x', xPos + width / 2)
      .attr('y', (d, i) => i * rowHeight + rowHeight / 2)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .attr('font-family', 'Arial')
      .attr('font-size', '12')
      .text(d => textResolver(d))

    if (props.operationSelected) {
      cells.on('click', d => opSelected(d))
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
    cellRenderer(selection, 'argument', options.argumentColLength, offsetColWidth + opNameColWidth)
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

  const renderBlock = (block: OperationBlock, graph: dagreD3.graphlib.Graph) => {
    const svgWrap = d3.create('svg')
    const g = svgWrap.append('g')

    const maxArgLength = block.operations.reduce((max, op) => {
      return Math.max(max, getOperationArg(op).length)
    }, 0)

    const options = { argumentColLength: Math.max(maxArgLength * letterWidth + 20, argumentColWidth) }

    renderOpRowsOutline(g, block.operations, options)
    renderText(g, block.operations, options)

    graph.setNode(block.offset.toString(), {
      label: g.node(),
      labelType: 'svg',
      paddingLeft: nodePadding,
      paddingRight: nodePadding,
      paddingTop: nodePadding,
      paddingBottom: nodePadding
    })
  }

  const renderEdges = (block: OperationBlock, graph: dagreD3.graphlib.Graph) => {
    if (block.childA) {
      graph.setEdge(block.operations[0].offset.toString(), block.childA.toString(), { label: '' })
    }

    if (block.childB) {
      graph.setEdge(block.operations[0].offset.toString(), block.childB.toString(), { label: '' })
    }
  }

  const clearGraph = () => {
    const inner = d3.select(innerElem.current)
    inner.selectAll('*').remove()
  }

  const renderGraph = () => {
    const g = new dagreD3.graphlib.Graph().setGraph({
      rankdir: 'LR'
    })

    props.blocks.forEach(block => renderBlock(block, g))
    props.blocks.forEach(block => renderEdges(block, g))

    const svg: any = d3.select(svgElem.current)
    const inner = d3.select(innerElem.current)

    // Set up zoom support
    const zoom = d3.zoom().on('zoom', () => {
      inner.attr('transform', d3.event.transform)
    })

    svg.call(zoom)

    // Create the renderer
    const render = new dagreD3.render()

    // Run the renderer. This is what draws the final graph.
    render(inner as any, g)

    // // Center the graph
    // const initialScale = 1
    // svg.call(
    //   zoom.transform,
    //   d3.zoomIdentity.translate((svg.attr('width') - g.graph().width * initialScale) / 2, 20).scale(initialScale)
    // )
    // svg.attr('height', g.graph().height * initialScale + 40)
  }

  return (
    <StyledWrapper>
      <svg ref={svgElem} id="graph" width="100%" height="100%">
        <g ref={innerElem} />
      </svg>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
    svg {
      border: 1.5px solid #999;
      overflow: hidden;
      width: 100%; 
      height: 60vh;
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