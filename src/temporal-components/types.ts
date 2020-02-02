export interface StructLog {
  depth: number
  error?: string
  gas: number
  gasCost: number
  memory: string[]
  op: string
  pc: number
  stack: string[]
  storage: {
    [location: string]: string
  }
}

export interface TransactionTrace {
  transactionHash: string
  connectionId: number
  gas: number
  returnValue: any
  structLogs: StructLog[]
}
