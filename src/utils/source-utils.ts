import { StructLog } from "@ethereum-react/types"
import Common from "@ethereumjs/common"
import { getOpcodesForHF } from "@ethereumjs/vm/dist/evm/opcodes"

export const getContractSourceDetails = (
  file: string,
  bytecode: string,
  sourceMap: string,
  compilationSources
) => {
  const originalSourceCode = compilationSources
    ? compilationSources.sources[file].content
    : null

  const [code, instructionsIndexByBytesOffset] = nameOpCodes(
    Buffer.from(bytecode, "hex")
  )
  return {
    sourceCode: originalSourceCode,
    sourceMapDetails: {
      parsedSourceMap: parseSourceMap(sourceMap),
      lineOffsets: buildLineOffsets(originalSourceCode),
      pcToInstructionMappings: instructionsIndexByBytesOffset,
      codeStartsAtLine: contractStartingLine(originalSourceCode),
    },
    contractFile: file,
  }
}

const contractStartingLine = (source: string) =>
  source.substring(0, source.search(/pragma/)).split("\n").length - 1

export const buildLineOffsets = (src: string) => {
  let accu = 0
  return src.split("\n").map(line => {
    const ret = accu
    accu += line.length + 1
    return ret
  })
}

interface IMapping {
  [key: string]: number
}

export const buildPcToInstructionMapping = (codeHexStr: string) => {
  const mapping: IMapping = {}
  let instructionIndex = 0
  console.log("codeHexStr.length", codeHexStr.length)
  console.log("codeHexStr", codeHexStr)

  for (let pc = 0; pc < codeHexStr.length / 2; ) {
    mapping[pc] = instructionIndex

    const byteHex = codeHexStr[pc * 2] + codeHexStr[pc * 2 + 1]
    const byte = parseInt(byteHex, 16)

    // PUSH instruction has immediates
    if (byte >= 0x60 && byte <= 0x7f) {
      const n = byte - 0x60 + 1 // number of immediates
      pc += n + 1
    } else {
      pc += 1
    }
    instructionIndex += 1
  }
  return mapping
}

export const normalizeStructLogs = (structLogs: StructLog[]): StructLog[] => {
  if (structLogs[0].depth === 1) {
    // Geth uses 1-indexed depth counter whilst ganache starts from 0
    const newStructLogs = structLogs.map(structLog => ({
      ...structLog,
      depth: structLog.depth - 1,
    }))
    return newStructLogs
  }
  return structLogs
}

// https://solidity.readthedocs.io/en/develop/miscellaneous.html#source-mappings
export const parseSourceMap = (sourceMap: string) => {
  let prevS: string
  let prevL: string
  let prevF: string
  let prevJ: string

  console.log("SourceMapToParse", sourceMap)

  return sourceMap
    .trim()
    .split(";")
    .map(section => {
      let [s, l, f, j] = section.split(":")

      if (s === "" || s === undefined) {
        s = prevS
      } else {
        prevS = s
      }

      if (l === "" || l === undefined) {
        l = prevL
      } else {
        prevL = l
      }

      if (f === "" || f === undefined) {
        f = prevF
      } else {
        prevF = f
      }

      if (j === "" || j === undefined) {
        j = prevJ
      } else {
        prevJ = j
      }

      return { s: Number(s), l: Number(l), f: Number(f), j }
    })
}

export const getActiveSourceForOp = (contractSourceData, opOffset: number) => {
  const offsets = contractSourceData.sourceMapDetails.lineOffsets

  const instructionIdx =
    contractSourceData.sourceMapDetails.pcToInstructionMappings[opOffset]

  const {
    s: start,
    l: length,
    f: file,
    j,
  } = contractSourceData.sourceMapDetails.parsedSourceMap[instructionIdx]

  // if (file === -1) {
  //   return null
  // }

  const startingLineIndex = offsets.findIndex(o => o >= start) - 1

  const lineStartingOffset = offsets[startingLineIndex]
  const startingColumn = start - lineStartingOffset

  let endingLineIndex = startingLineIndex

  for (let i = startingLineIndex; i < offsets.length; i++) {
    const lineOffset = offsets[i + 1]

    if (lineOffset < start + length) {
      endingLineIndex = i + 1
    } else {
      break
    }
  }

  const endingColumn = start + length - offsets[endingLineIndex]

  return {
    start: { line: startingLineIndex, column: startingColumn },
    end: { line: endingLineIndex, column: endingColumn },
  }
}

export const nameOpCodes = (raw, hardfork = "london") => {
  const common = new Common({ chain: "mainnet", hardfork })
  const opcodes = getOpcodesForHF(common)

  let pushData = ""
  const codeMap = {}
  const code = []

  for (let i = 0; i < raw.length; i++) {
    const pc = i
    let curOpCode
    try {
      curOpCode = opcodes.get(raw[pc]).fullName
    } catch (e) {
      curOpCode = "INVALID"
    }
    codeMap[i] = code.length
    // no destinations into the middle of PUSH
    if (curOpCode.slice(0, 4) === "PUSH") {
      const jumpNum = raw[pc] - 0x5f
      pushData = raw.slice(pc + 1, pc + jumpNum + 1)
      i += jumpNum
    }

    const data =
      (pushData as any).toString("hex") !== ""
        ? " " + (pushData as any).toString("hex")
        : ""

    code.push(pad(pc, roundLog(raw.length, 10)) + " " + curOpCode + data)
    pushData = ""
  }
  return [code, codeMap]
}

export function pad(num, size) {
  let s = num + ""
  while (s.length < size) s = "0" + s
  return s
}

export function log(num, base) {
  return Math.log(num) / Math.log(base)
}

export function roundLog(num, base) {
  return Math.ceil(log(num, base))
}
