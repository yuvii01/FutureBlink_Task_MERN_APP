import React from 'react';
import { Handle, Position } from 'reactflow';
import './ResultNode.css';

export default function ResultNode({ data }) {
  return (
    <div className="result-node">
      <div className="node-header">AI Response</div>
      <div className="node-content">
        {data.isLoading ? (
          <div className="loading">
            <span className="spinner"></span>
            Processing...
          </div>
        ) : data.label === 'Waiting for response...' ? (
          <p className="placeholder">Ready for input...</p>
        ) : (
          <p>{data.label}</p>
        )}
      </div>
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
