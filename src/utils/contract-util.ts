import { CompilationResult } from "@remixproject/plugin"
import { CompilerVersion } from "@ethereum-react/types"

export const getContractByteCode = (
  data: CompilationResult,
  isContractCreation: boolean
) => {
  const contracts = data.contracts

  for (const file of Object.keys(contracts)) {
    for (const contract of Object.keys(contracts[file])) {
      const currentContractEVMData = contracts[file][contract].evm

      const contractData = isContractCreation
        ? currentContractEVMData.bytecode
        : currentContractEVMData.deployedBytecode

      const bytecode = contractData.object
      const sourceMap = contractData.sourceMap

      return {
        contractName: contract,
        bytecode,
        sourceMap,
        contractFile: file,
      }
    }
  }
}

const SOLIDITY_VERSION_4_REGEX = new RegExp(/0.4.\d+/)
const SOLIDITY_VERSION_5_REGEX = new RegExp(/0.5.\d+/)
const SOLIDITY_VERSION_6_REGEX = new RegExp(/0.6.\d+/)
const SOLIDITY_VERSION_7_REGEX = new RegExp(/0.7.\d+/)
const SOLIDITY_VERSION_8_REGEX = new RegExp(/0.8.\d+/)

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

      if (compilerVersion.match(SOLIDITY_VERSION_7_REGEX)) {
        return CompilerVersion.SOLIDITY_7
      }

      if (compilerVersion.match(SOLIDITY_VERSION_8_REGEX)) {
        return CompilerVersion.SOLIDITY_8
      }

      throw new Error(`Unsupported solidity version ${compilerVersion}`)
    }
  }
}
