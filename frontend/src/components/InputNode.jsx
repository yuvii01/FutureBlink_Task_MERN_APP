import React from 'react';
import { Handle, Position } from 'reactflow';
import './InputNode.css';

export default function InputNode({ data }) {
  return (
    <div className="input-node">
      <div className="node-header">Input Prompt</div>
      <div className="node-content">
        {data.inputValue ? (
          <p>{data.inputValue.substring(0, 100)}...</p>
        ) : (
          <p className="placeholder">Waiting for input...</p>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
