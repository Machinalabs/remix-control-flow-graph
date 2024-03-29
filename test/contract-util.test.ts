import { CompilerVersion } from '@ethereum-react/types'
import { getContractByteCode, getSolidityVersionFromData } from '../src/utils/contract-util'
import { buildFakeCompilationResult, runtimeBytecode, bytecode } from './faker'

describe("Contract utils test", () => {
    describe("getContractByteCode", () => {
        test('bytecode for contract creation', () => {
            const fakeCompilationResult = buildFakeCompilationResult()

            const result = getContractByteCode(fakeCompilationResult, true)

            expect(result.bytecode).toEqual(bytecode)
        })

        test('bytecode for contract runtime', () => {
            const fakeCompilationResult = buildFakeCompilationResult()

            const result = getContractByteCode(fakeCompilationResult, false)

            expect(result.bytecode).toEqual(runtimeBytecode)
        })
    })

    describe("getSolidityVersionFromData", () => {
        test('solidity version 4', () => {
            const fakeCompilationResult = buildFakeCompilationResult(CompilerVersion.SOLIDITY_4)

            const result = getSolidityVersionFromData(fakeCompilationResult)

            expect(result).toEqual(CompilerVersion.SOLIDITY_4)
        })

        test('solidity version 5', () => {
            const fakeCompilationResult = buildFakeCompilationResult(CompilerVersion.SOLIDITY_5)

            const result = getSolidityVersionFromData(fakeCompilationResult)

            expect(result).toEqual(CompilerVersion.SOLIDITY_5)
        })

        test('solidity version 6', () => {
            const fakeCompilationResult = buildFakeCompilationResult(CompilerVersion.SOLIDITY_6)

            const result = getSolidityVersionFromData(fakeCompilationResult)

            expect(result).toEqual(CompilerVersion.SOLIDITY_6)
        })
    })
})