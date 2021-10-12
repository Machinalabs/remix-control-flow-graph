import { CompilationResult } from "@remixproject/plugin"
import { CompilerVersion } from "../src/utils/contract-util"

export const bytecode = "608060405234801561001057600080fd5b5060c78061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80636057361d146037578063b05784b8146062575b600080fd5b606060048036036020811015604b57600080fd5b8101908080359060200190929190505050607e565b005b60686088565b6040518082815260200191505060405180910390f35b8060008190555050565b6000805490509056fea264697066735822122078fcdd186f07e48f2aee328c99bd40f9d5f25425a57536fb1cda58aaa09ecec264736f6c63430006010033"
export const runtimeBytecode = "6080604052348015600f57600080fd5b506004361060325760003560e01c80636057361d146037578063b05784b8146062575b600080fd5b606060048036036020811015604b57600080fd5b8101908080359060200190929190505050607e565b005b60686088565b6040518082815260200191505060405180910390f35b8060008190555050565b6000805490509056fea264697066735822122078fcdd186f07e48f2aee328c99bd40f9d5f25425a57536fb1cda58aaa09ecec264736f6c63430006010033"

export const buildFakeCompilationResult = (compilerVersion: CompilerVersion = CompilerVersion.SOLIDITY_4) => {
    const result = {
        "contracts": {
            "browser/1_Storage.sol": {
                "Storage": {
                    "abi": [
                        {
                            "inputs": [],
                            "name": "retreive",
                            "outputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "num",
                                    "type": "uint256"
                                }
                            ],
                            "name": "store",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        }
                    ],
                    "devdoc": {
                        "details": "Store & retreive value in a variable",
                        "methods": {
                            "retreive()": {
                                "details": "Return value ",
                                "returns": {
                                    "_0": "value of 'number'"
                                }
                            },
                            "store(uint256)": {
                                "details": "Store value in variable",
                                "params": {
                                    "num": "value to store"
                                }
                            }
                        },
                        "title": "Storage"
                    },
                    "evm": {
                        "bytecode": {
                            "linkReferences": {},
                            "object": bytecode,
                            "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0xC7 DUP1 PUSH2 0x1F PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH1 0xF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH1 0x32 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x6057361D EQ PUSH1 0x37 JUMPI DUP1 PUSH4 0xB05784B8 EQ PUSH1 0x62 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x60 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH1 0x4B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH1 0x7E JUMP JUMPDEST STOP JUMPDEST PUSH1 0x68 PUSH1 0x88 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST DUP1 PUSH1 0x0 DUP2 SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD SWAP1 POP SWAP1 JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 PUSH25 0xFCDD186F07E48F2AEE328C99BD40F9D5F25425A57536FB1CDA PC 0xAA LOG0 SWAP15 0xCE 0xC2 PUSH5 0x736F6C6343 STOP MOD ADD STOP CALLER ",
                            "sourceMap": "105:356:0:-:0;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;105:356:0;;;;;;;"
                        },
                        "deployedBytecode": {
                            "linkReferences": {},
                            "object": runtimeBytecode,
                            "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH1 0xF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH1 0x32 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x6057361D EQ PUSH1 0x37 JUMPI DUP1 PUSH4 0xB05784B8 EQ PUSH1 0x62 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x60 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH1 0x4B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH1 0x7E JUMP JUMPDEST STOP JUMPDEST PUSH1 0x68 PUSH1 0x88 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST DUP1 PUSH1 0x0 DUP2 SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD SWAP1 POP SWAP1 JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 PUSH25 0xFCDD186F07E48F2AEE328C99BD40F9D5F25425A57536FB1CDA PC 0xAA LOG0 SWAP15 0xCE 0xC2 PUSH5 0x736F6C6343 STOP MOD ADD STOP CALLER ",
                            "sourceMap": "105:356:0:-:0;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;105:356:0;;;;;;;;;;;;;;;;;;;;;;;;235:64;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;235:64:0;;;;;;;;;;;;;;;;;:::i;:::-;;380:79;;;:::i;:::-;;;;;;;;;;;;;;;;;;;235:64;289:3;280:6;:12;;;;235:64;:::o;380:79::-;421:7;446:6;;439:13;;380:79;:::o"
                        },
                        "gasEstimates": {
                            "creation": {
                                "codeDepositCost": "39800",
                                "executionCost": "93",
                                "totalCost": "39893"
                            },
                            "external": {
                                "retreive()": "1013",
                                "store(uint256)": "20220"
                            }
                        },
                        "legacyAssembly": {
                            ".code": [
                                {
                                    "begin": 105,
                                    "end": 461,
                                    "name": "PUSH",
                                    "value": "80"
                                },
                                {
                                    "begin": 105,
                                    "end": 461,
                                    "name": "PUSH",
                                    "value": "40"
                                },
                                {
                                    "begin": 105,
                                    "end": 461,
                                    "name": "MSTORE"
                                },
                                {
                                    "begin": 105,
                                    "end": 461,
                                    "name": "CALLVALUE"
                                },
                                {
                                    "begin": 8,
                                    "end": 17,
                                    "name": "DUP1"
                                },
                                {
                                    "begin": 5,
                                    "end": 7,
                                    "name": "ISZERO"
                                },
                                {
                                    "begin": 5,
                                    "end": 7,
                                    "name": "PUSH [tag]",
                                    "value": "1"
                                },
                                {
                                    "begin": 5,
                                    "end": 7,
                                    "name": "JUMPI"
                                },
                                {
                                    "begin": 30,
                                    "end": 31,
                                    "name": "PUSH",
                                    "value": "0"
                                },
                                {
                                    "begin": 27,
                                    "end": 28,
                                    "name": "DUP1"
                                },
                                {
                                    "begin": 20,
                                    "end": 32,
                                    "name": "REVERT"
                                },
                                {
                                    "begin": 5,
                                    "end": 7,
                                    "name": "tag",
                                    "value": "1"
                                },
                                {
                                    "begin": 5,
                                    "end": 7,
                                    "name": "JUMPDEST"
                                },
                                {
                                    "begin": 105,
                                    "end": 461,
                                    "name": "POP"
                                },
                                {
                                    "begin": 105,
                                    "end": 461,
                                    "name": "PUSH #[$]",
                                    "value": "0000000000000000000000000000000000000000000000000000000000000000"
                                },
                                {
                                    "begin": 105,
                                    "end": 461,
                                    "name": "DUP1"
                                },
                                {
                                    "begin": 105,
                                    "end": 461,
                                    "name": "PUSH [$]",
                                    "value": "0000000000000000000000000000000000000000000000000000000000000000"
                                },
                                {
                                    "begin": 105,
                                    "end": 461,
                                    "name": "PUSH",
                                    "value": "0"
                                },
                                {
                                    "begin": 105,
                                    "end": 461,
                                    "name": "CODECOPY"
                                },
                                {
                                    "begin": 105,
                                    "end": 461,
                                    "name": "PUSH",
                                    "value": "0"
                                },
                                {
                                    "begin": 105,
                                    "end": 461,
                                    "name": "RETURN"
                                }
                            ],
                            ".data": {
                                "0": {
                                    ".auxdata": "a264697066735822122078fcdd186f07e48f2aee328c99bd40f9d5f25425a57536fb1cda58aaa09ecec264736f6c63430006010033",
                                    ".code": [
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "PUSH",
                                            "value": "80"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "PUSH",
                                            "value": "40"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "MSTORE"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "CALLVALUE"
                                        },
                                        {
                                            "begin": 8,
                                            "end": 17,
                                            "name": "DUP1"
                                        },
                                        {
                                            "begin": 5,
                                            "end": 7,
                                            "name": "ISZERO"
                                        },
                                        {
                                            "begin": 5,
                                            "end": 7,
                                            "name": "PUSH [tag]",
                                            "value": "1"
                                        },
                                        {
                                            "begin": 5,
                                            "end": 7,
                                            "name": "JUMPI"
                                        },
                                        {
                                            "begin": 30,
                                            "end": 31,
                                            "name": "PUSH",
                                            "value": "0"
                                        },
                                        {
                                            "begin": 27,
                                            "end": 28,
                                            "name": "DUP1"
                                        },
                                        {
                                            "begin": 20,
                                            "end": 32,
                                            "name": "REVERT"
                                        },
                                        {
                                            "begin": 5,
                                            "end": 7,
                                            "name": "tag",
                                            "value": "1"
                                        },
                                        {
                                            "begin": 5,
                                            "end": 7,
                                            "name": "JUMPDEST"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "POP"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "PUSH",
                                            "value": "4"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "CALLDATASIZE"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "LT"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "PUSH [tag]",
                                            "value": "2"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "JUMPI"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "PUSH",
                                            "value": "0"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "CALLDATALOAD"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "PUSH",
                                            "value": "E0"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "SHR"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "DUP1"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "PUSH",
                                            "value": "6057361D"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "EQ"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "PUSH [tag]",
                                            "value": "3"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "JUMPI"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "DUP1"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "PUSH",
                                            "value": "B05784B8"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "EQ"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "PUSH [tag]",
                                            "value": "4"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "JUMPI"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "tag",
                                            "value": "2"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "JUMPDEST"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "PUSH",
                                            "value": "0"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "DUP1"
                                        },
                                        {
                                            "begin": 105,
                                            "end": 461,
                                            "name": "REVERT"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "tag",
                                            "value": "3"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "JUMPDEST"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "PUSH [tag]",
                                            "value": "5"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "PUSH",
                                            "value": "4"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "DUP1"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "CALLDATASIZE"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "SUB"
                                        },
                                        {
                                            "begin": 13,
                                            "end": 15,
                                            "name": "PUSH",
                                            "value": "20"
                                        },
                                        {
                                            "begin": 8,
                                            "end": 11,
                                            "name": "DUP2"
                                        },
                                        {
                                            "begin": 5,
                                            "end": 16,
                                            "name": "LT"
                                        },
                                        {
                                            "begin": 2,
                                            "end": 4,
                                            "name": "ISZERO"
                                        },
                                        {
                                            "begin": 2,
                                            "end": 4,
                                            "name": "PUSH [tag]",
                                            "value": "6"
                                        },
                                        {
                                            "begin": 2,
                                            "end": 4,
                                            "name": "JUMPI"
                                        },
                                        {
                                            "begin": 29,
                                            "end": 30,
                                            "name": "PUSH",
                                            "value": "0"
                                        },
                                        {
                                            "begin": 26,
                                            "end": 27,
                                            "name": "DUP1"
                                        },
                                        {
                                            "begin": 19,
                                            "end": 31,
                                            "name": "REVERT"
                                        },
                                        {
                                            "begin": 2,
                                            "end": 4,
                                            "name": "tag",
                                            "value": "6"
                                        },
                                        {
                                            "begin": 2,
                                            "end": 4,
                                            "name": "JUMPDEST"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "DUP2"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "ADD"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "SWAP1"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "DUP1"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "DUP1"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "CALLDATALOAD"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "SWAP1"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "PUSH",
                                            "value": "20"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "ADD"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "SWAP1"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "SWAP3"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "SWAP2"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "SWAP1"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "POP"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "POP"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "POP"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "PUSH [tag]",
                                            "value": "7"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "JUMP",
                                            "value": "[in]"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "tag",
                                            "value": "5"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "JUMPDEST"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "STOP"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "tag",
                                            "value": "4"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "JUMPDEST"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "PUSH [tag]",
                                            "value": "8"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "PUSH [tag]",
                                            "value": "9"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "JUMP",
                                            "value": "[in]"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "tag",
                                            "value": "8"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "JUMPDEST"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "PUSH",
                                            "value": "40"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "MLOAD"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "DUP1"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "DUP3"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "DUP2"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "MSTORE"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "PUSH",
                                            "value": "20"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "ADD"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "SWAP2"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "POP"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "POP"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "PUSH",
                                            "value": "40"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "MLOAD"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "DUP1"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "SWAP2"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "SUB"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "SWAP1"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "RETURN"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "tag",
                                            "value": "7"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "JUMPDEST"
                                        },
                                        {
                                            "begin": 289,
                                            "end": 292,
                                            "name": "DUP1"
                                        },
                                        {
                                            "begin": 280,
                                            "end": 286,
                                            "name": "PUSH",
                                            "value": "0"
                                        },
                                        {
                                            "begin": 280,
                                            "end": 292,
                                            "name": "DUP2"
                                        },
                                        {
                                            "begin": 280,
                                            "end": 292,
                                            "name": "SWAP1"
                                        },
                                        {
                                            "begin": 280,
                                            "end": 292,
                                            "name": "SSTORE"
                                        },
                                        {
                                            "begin": 280,
                                            "end": 292,
                                            "name": "POP"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "POP"
                                        },
                                        {
                                            "begin": 235,
                                            "end": 299,
                                            "name": "JUMP",
                                            "value": "[out]"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "tag",
                                            "value": "9"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "JUMPDEST"
                                        },
                                        {
                                            "begin": 421,
                                            "end": 428,
                                            "name": "PUSH",
                                            "value": "0"
                                        },
                                        {
                                            "begin": 446,
                                            "end": 452,
                                            "name": "DUP1"
                                        },
                                        {
                                            "begin": 446,
                                            "end": 452,
                                            "name": "SLOAD"
                                        },
                                        {
                                            "begin": 439,
                                            "end": 452,
                                            "name": "SWAP1"
                                        },
                                        {
                                            "begin": 439,
                                            "end": 452,
                                            "name": "POP"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "SWAP1"
                                        },
                                        {
                                            "begin": 380,
                                            "end": 459,
                                            "name": "JUMP",
                                            "value": "[out]"
                                        }
                                    ]
                                }
                            }
                        },
                        "methodIdentifiers": {
                            "retreive()": "b05784b8",
                            "store(uint256)": "6057361d"
                        }
                    },
                    "metadata": getMetadataFor(compilerVersion),
                    "userdoc": {
                        "methods": {}
                    }
                }
            }
        },
        "sources": {
            "browser/1_Storage.sol": {
                "ast": {
                    "absolutePath": "browser/1_Storage.sol",
                    "exportedSymbols": {
                        "Storage": [
                            22
                        ]
                    },
                    "id": 23,
                    "nodeType": "SourceUnit",
                    "nodes": [
                        {
                            "id": 1,
                            "literals": [
                                "solidity",
                                ">=",
                                "0.4",
                                ".22",
                                "<",
                                "0.7",
                                ".0"
                            ],
                            "nodeType": "PragmaDirective",
                            "src": "0:32:0"
                        },
                        {
                            "abstract": false,
                            "baseContracts": [],
                            "contractDependencies": [],
                            "contractKind": "contract",
                            "documentation": "@title Storage\n@dev Store & retreive value in a variable",
                            "fullyImplemented": true,
                            "id": 22,
                            "linearizedBaseContracts": [
                                22
                            ],
                            "name": "Storage",
                            "nodeType": "ContractDefinition",
                            "nodes": [
                                {
                                    "constant": false,
                                    "id": 3,
                                    "name": "number",
                                    "nodeType": "VariableDeclaration",
                                    "overrides": null,
                                    "scope": 22,
                                    "src": "129:14:0",
                                    "stateVariable": true,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 2,
                                        "name": "uint256",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "129:7:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "body": {
                                        "id": 12,
                                        "nodeType": "Block",
                                        "src": "270:29:0",
                                        "statements": [
                                            {
                                                "expression": {
                                                    "argumentTypes": null,
                                                    "id": 10,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "lValueRequested": false,
                                                    "leftHandSide": {
                                                        "argumentTypes": null,
                                                        "id": 8,
                                                        "name": "number",
                                                        "nodeType": "Identifier",
                                                        "overloadedDeclarations": [],
                                                        "referencedDeclaration": 3,
                                                        "src": "280:6:0",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_uint256",
                                                            "typeString": "uint256"
                                                        }
                                                    },
                                                    "nodeType": "Assignment",
                                                    "operator": "=",
                                                    "rightHandSide": {
                                                        "argumentTypes": null,
                                                        "id": 9,
                                                        "name": "num",
                                                        "nodeType": "Identifier",
                                                        "overloadedDeclarations": [],
                                                        "referencedDeclaration": 5,
                                                        "src": "289:3:0",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_uint256",
                                                            "typeString": "uint256"
                                                        }
                                                    },
                                                    "src": "280:12:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                "id": 11,
                                                "nodeType": "ExpressionStatement",
                                                "src": "280:12:0"
                                            }
                                        ]
                                    },
                                    "documentation": "@dev Store value in variable\n@param num value to store",
                                    "functionSelector": "6057361d",
                                    "id": 13,
                                    "implemented": true,
                                    "kind": "function",
                                    "modifiers": [],
                                    "name": "store",
                                    "nodeType": "FunctionDefinition",
                                    "overrides": null,
                                    "parameters": {
                                        "id": 6,
                                        "nodeType": "ParameterList",
                                        "parameters": [
                                            {
                                                "constant": false,
                                                "id": 5,
                                                "name": "num",
                                                "nodeType": "VariableDeclaration",
                                                "overrides": null,
                                                "scope": 13,
                                                "src": "250:11:0",
                                                "stateVariable": false,
                                                "storageLocation": "default",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                },
                                                "typeName": {
                                                    "id": 4,
                                                    "name": "uint256",
                                                    "nodeType": "ElementaryTypeName",
                                                    "src": "250:7:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                "value": null,
                                                "visibility": "internal"
                                            }
                                        ],
                                        "src": "249:13:0"
                                    },
                                    "returnParameters": {
                                        "id": 7,
                                        "nodeType": "ParameterList",
                                        "parameters": [],
                                        "src": "270:0:0"
                                    },
                                    "scope": 22,
                                    "src": "235:64:0",
                                    "stateMutability": "nonpayable",
                                    "virtual": false,
                                    "visibility": "public"
                                },
                                {
                                    "body": {
                                        "id": 20,
                                        "nodeType": "Block",
                                        "src": "429:30:0",
                                        "statements": [
                                            {
                                                "expression": {
                                                    "argumentTypes": null,
                                                    "id": 18,
                                                    "name": "number",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 3,
                                                    "src": "446:6:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                "functionReturnParameters": 17,
                                                "id": 19,
                                                "nodeType": "Return",
                                                "src": "439:13:0"
                                            }
                                        ]
                                    },
                                    "documentation": "@dev Return value \n@return value of 'number'",
                                    "functionSelector": "b05784b8",
                                    "id": 21,
                                    "implemented": true,
                                    "kind": "function",
                                    "modifiers": [],
                                    "name": "retreive",
                                    "nodeType": "FunctionDefinition",
                                    "overrides": null,
                                    "parameters": {
                                        "id": 14,
                                        "nodeType": "ParameterList",
                                        "parameters": [],
                                        "src": "397:2:0"
                                    },
                                    "returnParameters": {
                                        "id": 17,
                                        "nodeType": "ParameterList",
                                        "parameters": [
                                            {
                                                "constant": false,
                                                "id": 16,
                                                "name": "",
                                                "nodeType": "VariableDeclaration",
                                                "overrides": null,
                                                "scope": 21,
                                                "src": "421:7:0",
                                                "stateVariable": false,
                                                "storageLocation": "default",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                },
                                                "typeName": {
                                                    "id": 15,
                                                    "name": "uint256",
                                                    "nodeType": "ElementaryTypeName",
                                                    "src": "421:7:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                "value": null,
                                                "visibility": "internal"
                                            }
                                        ],
                                        "src": "420:9:0"
                                    },
                                    "scope": 22,
                                    "src": "380:79:0",
                                    "stateMutability": "view",
                                    "virtual": false,
                                    "visibility": "public"
                                }
                            ],
                            "scope": 23,
                            "src": "105:356:0"
                        }
                    ],
                    "src": "0:461:0"
                },
                "id": 0,
                "legacyAST": {
                    "attributes": {
                        "absolutePath": "browser/1_Storage.sol",
                        "exportedSymbols": {
                            "Storage": [
                                22
                            ]
                        }
                    },
                    "children": [
                        {
                            "attributes": {
                                "literals": [
                                    "solidity",
                                    ">=",
                                    "0.4",
                                    ".22",
                                    "<",
                                    "0.7",
                                    ".0"
                                ]
                            },
                            "id": 1,
                            "name": "PragmaDirective",
                            "src": "0:32:0"
                        },
                        {
                            "attributes": {
                                "abstract": false,
                                "baseContracts": [
                                    null
                                ],
                                "contractDependencies": [
                                    null
                                ],
                                "contractKind": "contract",
                                "documentation": "@title Storage\n@dev Store & retreive value in a variable",
                                "fullyImplemented": true,
                                "linearizedBaseContracts": [
                                    22
                                ],
                                "name": "Storage",
                                "scope": 23
                            },
                            "children": [
                                {
                                    "attributes": {
                                        "constant": false,
                                        "name": "number",
                                        "overrides": null,
                                        "scope": 22,
                                        "stateVariable": true,
                                        "storageLocation": "default",
                                        "type": "uint256",
                                        "value": null,
                                        "visibility": "internal"
                                    },
                                    "children": [
                                        {
                                            "attributes": {
                                                "name": "uint256",
                                                "type": "uint256"
                                            },
                                            "id": 2,
                                            "name": "ElementaryTypeName",
                                            "src": "129:7:0"
                                        }
                                    ],
                                    "id": 3,
                                    "name": "VariableDeclaration",
                                    "src": "129:14:0"
                                },
                                {
                                    "attributes": {
                                        "documentation": "@dev Store value in variable\n@param num value to store",
                                        "functionSelector": "6057361d",
                                        "implemented": true,
                                        "isConstructor": false,
                                        "kind": "function",
                                        "modifiers": [
                                            null
                                        ],
                                        "name": "store",
                                        "overrides": null,
                                        "scope": 22,
                                        "stateMutability": "nonpayable",
                                        "virtual": false,
                                        "visibility": "public"
                                    },
                                    "children": [
                                        {
                                            "children": [
                                                {
                                                    "attributes": {
                                                        "constant": false,
                                                        "name": "num",
                                                        "overrides": null,
                                                        "scope": 13,
                                                        "stateVariable": false,
                                                        "storageLocation": "default",
                                                        "type": "uint256",
                                                        "value": null,
                                                        "visibility": "internal"
                                                    },
                                                    "children": [
                                                        {
                                                            "attributes": {
                                                                "name": "uint256",
                                                                "type": "uint256"
                                                            },
                                                            "id": 4,
                                                            "name": "ElementaryTypeName",
                                                            "src": "250:7:0"
                                                        }
                                                    ],
                                                    "id": 5,
                                                    "name": "VariableDeclaration",
                                                    "src": "250:11:0"
                                                }
                                            ],
                                            "id": 6,
                                            "name": "ParameterList",
                                            "src": "249:13:0"
                                        },
                                        {
                                            "attributes": {
                                                "parameters": [
                                                    null
                                                ]
                                            },
                                            "children": [],
                                            "id": 7,
                                            "name": "ParameterList",
                                            "src": "270:0:0"
                                        },
                                        {
                                            "children": [
                                                {
                                                    "children": [
                                                        {
                                                            "attributes": {
                                                                "argumentTypes": null,
                                                                "isConstant": false,
                                                                "isLValue": false,
                                                                "isPure": false,
                                                                "lValueRequested": false,
                                                                "operator": "=",
                                                                "type": "uint256"
                                                            },
                                                            "children": [
                                                                {
                                                                    "attributes": {
                                                                        "argumentTypes": null,
                                                                        "overloadedDeclarations": [
                                                                            null
                                                                        ],
                                                                        "referencedDeclaration": 3,
                                                                        "type": "uint256",
                                                                        "value": "number"
                                                                    },
                                                                    "id": 8,
                                                                    "name": "Identifier",
                                                                    "src": "280:6:0"
                                                                },
                                                                {
                                                                    "attributes": {
                                                                        "argumentTypes": null,
                                                                        "overloadedDeclarations": [
                                                                            null
                                                                        ],
                                                                        "referencedDeclaration": 5,
                                                                        "type": "uint256",
                                                                        "value": "num"
                                                                    },
                                                                    "id": 9,
                                                                    "name": "Identifier",
                                                                    "src": "289:3:0"
                                                                }
                                                            ],
                                                            "id": 10,
                                                            "name": "Assignment",
                                                            "src": "280:12:0"
                                                        }
                                                    ],
                                                    "id": 11,
                                                    "name": "ExpressionStatement",
                                                    "src": "280:12:0"
                                                }
                                            ],
                                            "id": 12,
                                            "name": "Block",
                                            "src": "270:29:0"
                                        }
                                    ],
                                    "id": 13,
                                    "name": "FunctionDefinition",
                                    "src": "235:64:0"
                                },
                                {
                                    "attributes": {
                                        "documentation": "@dev Return value \n@return value of 'number'",
                                        "functionSelector": "b05784b8",
                                        "implemented": true,
                                        "isConstructor": false,
                                        "kind": "function",
                                        "modifiers": [
                                            null
                                        ],
                                        "name": "retreive",
                                        "overrides": null,
                                        "scope": 22,
                                        "stateMutability": "view",
                                        "virtual": false,
                                        "visibility": "public"
                                    },
                                    "children": [
                                        {
                                            "attributes": {
                                                "parameters": [
                                                    null
                                                ]
                                            },
                                            "children": [],
                                            "id": 14,
                                            "name": "ParameterList",
                                            "src": "397:2:0"
                                        },
                                        {
                                            "children": [
                                                {
                                                    "attributes": {
                                                        "constant": false,
                                                        "name": "",
                                                        "overrides": null,
                                                        "scope": 21,
                                                        "stateVariable": false,
                                                        "storageLocation": "default",
                                                        "type": "uint256",
                                                        "value": null,
                                                        "visibility": "internal"
                                                    },
                                                    "children": [
                                                        {
                                                            "attributes": {
                                                                "name": "uint256",
                                                                "type": "uint256"
                                                            },
                                                            "id": 15,
                                                            "name": "ElementaryTypeName",
                                                            "src": "421:7:0"
                                                        }
                                                    ],
                                                    "id": 16,
                                                    "name": "VariableDeclaration",
                                                    "src": "421:7:0"
                                                }
                                            ],
                                            "id": 17,
                                            "name": "ParameterList",
                                            "src": "420:9:0"
                                        },
                                        {
                                            "children": [
                                                {
                                                    "attributes": {
                                                        "functionReturnParameters": 17
                                                    },
                                                    "children": [
                                                        {
                                                            "attributes": {
                                                                "argumentTypes": null,
                                                                "overloadedDeclarations": [
                                                                    null
                                                                ],
                                                                "referencedDeclaration": 3,
                                                                "type": "uint256",
                                                                "value": "number"
                                                            },
                                                            "id": 18,
                                                            "name": "Identifier",
                                                            "src": "446:6:0"
                                                        }
                                                    ],
                                                    "id": 19,
                                                    "name": "Return",
                                                    "src": "439:13:0"
                                                }
                                            ],
                                            "id": 20,
                                            "name": "Block",
                                            "src": "429:30:0"
                                        }
                                    ],
                                    "id": 21,
                                    "name": "FunctionDefinition",
                                    "src": "380:79:0"
                                }
                            ],
                            "id": 22,
                            "name": "ContractDefinition",
                            "src": "105:356:0"
                        }
                    ],
                    "id": 23,
                    "name": "SourceUnit",
                    "src": "0:461:0"
                }
            }
        }
    } as any
    return result as CompilationResult
}

const getMetadataFor = (version: CompilerVersion) => {
    switch (version) {
        case CompilerVersion.SOLIDITY_4:
            return "{\"compiler\":{\"version\":\"0.4.26+commit.e6f7d5a4\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"retreive\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"num\",\"type\":\"uint256\"}],\"name\":\"store\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"Store & retreive value in a variable\",\"methods\":{\"retreive()\":{\"details\":\"Return value \",\"returns\":{\"_0\":\"value of 'number'\"}},\"store(uint256)\":{\"details\":\"Store value in variable\",\"params\":{\"num\":\"value to store\"}}},\"title\":\"Storage\"},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"browser/1_Storage.sol\":\"Storage\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[]},\"sources\":{\"browser/1_Storage.sol\":{\"keccak256\":\"0xaedc7086ad8503907209f50bac1e4dc6c2eca2ed41b15d03740fea748ea3f88e\",\"urls\":[\"bzz-raw://4bc331951c25951321cb29abbd689eb3af669530222c6bb2d45ff45334ee83a7\",\"dweb:/ipfs/QmWb1NQ6Pw8ZLMFX8uDjMyftgcEieT9iP2TvWisPhjN3U2\"]}},\"version\":1}"
        case CompilerVersion.SOLIDITY_5:
            return "{\"compiler\":{\"version\":\"0.5.1+commit.e6f7d5a4\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"retreive\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"num\",\"type\":\"uint256\"}],\"name\":\"store\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"Store & retreive value in a variable\",\"methods\":{\"retreive()\":{\"details\":\"Return value \",\"returns\":{\"_0\":\"value of 'number'\"}},\"store(uint256)\":{\"details\":\"Store value in variable\",\"params\":{\"num\":\"value to store\"}}},\"title\":\"Storage\"},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"browser/1_Storage.sol\":\"Storage\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[]},\"sources\":{\"browser/1_Storage.sol\":{\"keccak256\":\"0xaedc7086ad8503907209f50bac1e4dc6c2eca2ed41b15d03740fea748ea3f88e\",\"urls\":[\"bzz-raw://4bc331951c25951321cb29abbd689eb3af669530222c6bb2d45ff45334ee83a7\",\"dweb:/ipfs/QmWb1NQ6Pw8ZLMFX8uDjMyftgcEieT9iP2TvWisPhjN3U2\"]}},\"version\":1}"
        case CompilerVersion.SOLIDITY_6:
            return "{\"compiler\":{\"version\":\"0.6.1+commit.e6f7d5a4\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"retreive\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"num\",\"type\":\"uint256\"}],\"name\":\"store\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"Store & retreive value in a variable\",\"methods\":{\"retreive()\":{\"details\":\"Return value \",\"returns\":{\"_0\":\"value of 'number'\"}},\"store(uint256)\":{\"details\":\"Store value in variable\",\"params\":{\"num\":\"value to store\"}}},\"title\":\"Storage\"},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"browser/1_Storage.sol\":\"Storage\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[]},\"sources\":{\"browser/1_Storage.sol\":{\"keccak256\":\"0xaedc7086ad8503907209f50bac1e4dc6c2eca2ed41b15d03740fea748ea3f88e\",\"urls\":[\"bzz-raw://4bc331951c25951321cb29abbd689eb3af669530222c6bb2d45ff45334ee83a7\",\"dweb:/ipfs/QmWb1NQ6Pw8ZLMFX8uDjMyftgcEieT9iP2TvWisPhjN3U2\"]}},\"version\":1}"
    }
}