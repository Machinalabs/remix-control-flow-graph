import { CompilerVersion } from "@ethereum-react/types"
import { CompilationResult } from "@remixproject/plugin"

export const getContractByteCode = (
  data: CompilationResult,
  isContractCreation: boolean
) => {
  const contracts = data.contracts

  for (const file of Object.keys(contracts)) {
    for (const contract of Object.keys(contracts[file])) {
      const currentContractEVMData = contracts[file][contract].evm
      const bytecode = isContractCreation
        ? currentContractEVMData.bytecode.object
        : currentContractEVMData.deployedBytecode.object
      return { bytecode, contract, contractFile: file }
    }
  }
}

const SOLIDITY_VERSION_4_REGEX = new RegExp(/0.4.\d+/)
const SOLIDITY_VERSION_5_REGEX = new RegExp(/0.5.\d+/)
const SOLIDITY_VERSION_6_REGEX = new RegExp(/0.6.\d+/)

export const getSolidityVersionFromData = (data: CompilationResult) => {
  const contracts = data.contracts

  for (const file of Object.keys(contracts)) {
    for (const contract of Object.keys(contracts[file])) {
      const currentContractMetadata = JSON.parse(
        contracts[file][contract].metadata
      )
      const compilerVersion = currentContractMetadata.compiler.version as string
      if (compilerVersion.match(SOLIDITY_VERSION_4_REGEX)) {
        return CompilerVersion.SOLIDITY_4
      }
      if (compilerVersion.match(SOLIDITY_VERSION_5_REGEX)) {
        return CompilerVersion.SOLIDITY_5
      }

      if (compilerVersion.match(SOLIDITY_VERSION_6_REGEX)) {
        return CompilerVersion.SOLIDITY_6
      }

      throw new Error(`Unsupported solidity version ${compilerVersion}`)
    }
  }
}
