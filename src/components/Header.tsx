import React from "react"

export interface Props {
  contractName: string
  txHash: string
  onRenderRequest: (type: "contract" | "traces") => void
}

export const Header: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <div className="item-section">
        <div>
          <label>Contract</label>
          <button
            className="btn btn-primary btn-sm float-right"
            disabled={!props.contractName}
            onClick={() => props.onRenderRequest("contract")}
          >
            <i aria-hidden="true" className="fa fa-play"></i>
          </button>
        </div>
        <div className="bg-secondary item-display text-truncate">
          {props.contractName || "-"}
        </div>
      </div>
      <div className="item-section">
        <div>
          <label>Transaction</label>
          <button
            className="btn btn-primary btn-sm float-right"
            disabled={!props.txHash}
            onClick={() => props.onRenderRequest("traces")}
          >
            <i aria-hidden="true" className="fa fa-play"></i>
          </button>
        </div>
        <div className="bg-secondary item-display text-truncate">
          {props.txHash || "-"}
        </div>
      </div>
    </div>
  )
}
