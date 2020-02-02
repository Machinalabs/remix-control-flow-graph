import React, { useState } from 'react'
import styled from 'styled-components'

import { Operation, CFGBlocks } from '@ethereum-react/types'
import { CFGraph } from './CFGraph'
import { TransactionTrace, StructLog } from './types'

export interface IDebuggerProps {
  blocks: CFGBlocks
  transactionTrace?: TransactionTrace
  renderTrigger?: any
  transactionHash?: string
}

export const Debugger: React.FC<IDebuggerProps> = (props: IDebuggerProps) => {
  const [memory, setMemory] = useState([])
  const [stack, setStack] = useState([])
  const [storage, setStorage] = useState(undefined) // {}
  const [gas, setGas] = useState(0)
  const [gasCost, setGasCost] = useState(0)

  const onClick = (op: Operation) => {
    console.log('Operation clicked', op)

    if (props.transactionTrace && props.transactionTrace.structLogs.length > 0) {
      const trace = props.transactionTrace.structLogs.find((item: StructLog) => {
        return item.pc === op.offset
      })

      setMemory(trace.memory)
      setStack(trace.stack)
      setStorage(trace.storage)
      setGas(trace.gas)
      setGasCost(trace.gasCost)
    }
  }

  const hasTraces = props.transactionTrace !== undefined
  return (
    <Container>
      {props.transactionHash &&
        <h4>Transaction hash: {props.transactionHash}</h4>}
      <GraphContainer>
        <CFGraph renderTrigger={props.renderTrigger} trace={props.transactionTrace} blocks={props.blocks} operationSelected={op => onClick(op)} />
      </GraphContainer>

      {hasTraces && memory.length > 0 &&
        <MemoryDiv>
          <h4>Memory</h4>
          {memory.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </MemoryDiv>}

      {hasTraces && stack.length > 0 &&
        <StackDiv>
          <h4>Stack</h4>
          {stack.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </StackDiv>}

      {hasTraces && storage &&
        <StorageDiv>
          <h4>Storage</h4>
          <StorageTable storage={storage} />
        </StorageDiv>}
    </Container>
  )
}

interface IStorageTableProps {
  storage: any
}

const StorageTable: React.FC<IStorageTableProps> = (props: IStorageTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Slot</td>
          <td>Value</td>
        </tr>
      </thead>
      <tbody>
        {Object.keys(props.storage).map((item, index) => {
          return (
            <tr key={index}>
              <td>{item}</td>
              <td>{props.storage[item]}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 80% 20%;
  grid-row-gap: 0.4px;
  grid-template-areas:
    'graph graph graph graph'
    'memory stack storage storage';
`

export const GraphContainer = styled.section`
  grid-area: graph;
  height: 100%;
`

export const DetailsContainer = styled.section`
  grid-area: details;
`

export const MemoryDiv = styled.section`
  grid-area: memory;
  font-size: 0.8em;
`

export const StackDiv = styled.section`
  grid-area: stack;
  font-size: 0.8em;
`

export const StorageDiv = styled.section`
  grid-area: storage;
  font-size: 0.8em;
`
