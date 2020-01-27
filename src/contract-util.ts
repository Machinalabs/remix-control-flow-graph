import { CompilationResult, CustomApi, ICompiler } from "@remixproject/plugin"

export const getContractByteCode = async (
  solidity: CustomApi<ICompiler>,
  isContractCreation: boolean
) => {
  const compilationResult: CompilationResult = await solidity.getCompilationResult()
  console.log("Compilation Result", compilationResult)

  const contracts = (compilationResult as any).data.contracts

  for (const file of Object.keys(contracts)) {
    for (const contract of Object.keys(contracts[file])) {
      const currentContractEVMData = contracts[file][contract].evm
      const bytecode = isContractCreation
        ? currentContractEVMData.bytecode.object
        : currentContractEVMData.deployedBytecode.object

      // const bytecode = currentContractEVMData.bytecode.object

      return bytecode
    }
  }
}
