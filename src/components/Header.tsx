import React, { useState } from "react"
import classNames from "classnames"

type RenderMode = "contract" | "traces"

export interface Props {
  contractDetails: { contractName: string }
  txDetails: { contractName: string; txHash: string }
  onRenderRequest: (type: RenderMode) => void
}

export const Header: React.FC<Props> = (props: Props) => {
  const [renderMode, setRenderMode] = useState<RenderMode>()
  return (
    <div className="p-2 mb-2 border border-secondary">
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className={classNames({
            "btn btn-outline-primary btn-sm": true,
            active: renderMode === "contract",
          })}
          disabled={!props.contractDetails}
          onClick={() => setRenderMode("contract")}
        >
          Contract
        </button>
        <button
          type="button"
          className={classNames({
            "btn btn-outline-primary btn-sm": true,
            active: renderMode === "traces",
          })}
          disabled={!props.txDetails}
          onClick={() => setRenderMode("traces")}
        >
          Transaction
        </button>
      </div>
      <button
        className="btn btn-primary btn-sm float-right"
        disabled={!renderMode}
        onClick={() => props.onRenderRequest(renderMode)}
      >
        <i aria-hidden="true" className="fa fa-play"></i>
      </button>
      {renderMode && (
        <div className="my-2">
          {renderMode === "contract" && (
            <div className="item-section">
              {/*<div>
            <label>Contract name</label>
          </div>*/}
              <div className="bg-light item-display text-truncate">
                {props.contractDetails.contractName || "-"}
              </div>
            </div>
          )}

          {renderMode === "traces" && (
            <div className="item-section">
              {/*<div>
              <label>Transaction</label>
            </div>*/}
              <div className="bg-light item-display text-truncate">
                {props.txDetails.contractName || "-"}
              </div>
              <div className="bg-light item-display text-truncate">
                {props.txDetails.txHash || "-"}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
