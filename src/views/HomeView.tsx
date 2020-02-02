import React from "react"

export const HomeView: React.FC = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-title">Description</h6>
        <p className="card-text">
          Visualise the control flow graph of Solidity source code and of the
          transaction execution
        </p>

        <h6 className="card-title">How to use?</h6>
        <p className="card-text">
          Compile or execute a transaction and open the control flow graph tab
        </p>

        <h6 className="card-title">Required plugins</h6>
        <ul>
          <li>Debugger</li>
          <li>Solidity Compiler</li>
          <li>Deploy & run transactions</li>
        </ul>

        <h6 className="card-title">Limitations</h6>
        <ul>
          <li>Debug can only be performed in contracts within 1 file</li>
        </ul>

        <h6 className="card-title">Links</h6>
        <div className="card-title">
          <a
            target="_parent"
            href="https://github.com/solid-studio/remix-control-flow-graph/issues"
            className="card-link"
          >
            Issues / bug tracker
          </a>
          <a
            target="_parent"
            href="https://github.com/solid-studio/remix-control-flow-graph"
            className="card-link"
          >
            Repository
          </a>
        </div>

        <h6 className="card-title">Contact author</h6>
        <a
          target="_blank"
          href="mailto:admin@getsolidstudio.com"
          className="card-link">
          Machina Labs Team
        </a>
      </div>
    </div>
  )
}
