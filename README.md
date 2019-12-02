
Control Flow Graph Remix Plugin

Introduction

Control flow graphs are graphical representations of computer programs that are very convenient when we want to understand a program’s logic and its structure. They are mostly used in static analysis and in the context of Ethereum and smart contract development, they could be used to perform audits and security reviews of solidity code.

Background

Previous work has been done by different actors in the Ethereum ecosystem, for instance, trail of bits has created an EVM CFG builder and Mythil developed a Symbolic Trace Explorer, which provides a control flow graph visualisation. However these components are not easily reusable and it is difficult to integrate this functionality into a different platform, i.e. in Remix, that is the most popular online IDE and that would be the perfect place to add this kind of functionality.

Features

Interactive control flow graph
Solidity support
Control flow graph generation from bytecode (normal mode) 
Control flow graph generation and execution trace highlighted (debug mode) Note: only runtime 
Source mapping highlight (limited to 1 single Remix contract file)
EVM state exploration in debug mode (storage viewer, memory viewer, stack viewer)

Architecture

At a high level, the CFG Remix plugin will be a wrapper of the CFG component of the ethereum-react-components monorepo library.

High level architecture

The ethereum-react-components will consist of the following components (due to change). And the CFG will be the first component of this library.

Ethereum react components library

The monorepo additionally will contain the following utility packages:
Dissasembler 
Control Flow Graph Generator

In general the desired interface of the CFG component will be in the form of:

Interface CFG {
	traces?: Trace[]
	bytecode: string
}

Consumers should be responsible for compiling the solidity code. In the Remix case, this is perfectly suitable, as Remix plugins engine provides traces and solidity compiler results

Future work

Support for contract calls in different files (if Remix allows)

Requirements

Traces from the Remix plugin
Code editor highlighting Remix plugin capabilities

Appendix A: Mocks

Mock of Control Flow Graph Remix Plugin in normal mode

Potential icon options to be used by the Remix Plugin

