import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  Background,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { callAI, saveQuery } from './services/api';
import InputNode from './components/InputNode';
import ResultNode from './components/ResultNode';
import './App.css';

const nodeTypes = {
  input: InputNode,
  result: ResultNode,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: '1',
      data: { label: 'Text Input', inputValue: '' },
      position: { x: 0, y: 100 },
      type: 'input',
    },
    {
      id: '2',
      data: { label: 'Waiting for response...', isLoading: false },
      position: { x: 500, y: 100 },
      type: 'result',
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      markerEnd: { type: MarkerType.ArrowClosed },
      animated: true,
      style: { stroke: '#60a5fa', strokeWidth: 3 },
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [notification, setNotification] = useState('');

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(''), 4000);
  };

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const handleRunFlow = async () => {
    if (!inputValue.trim()) {
      showNotification('Please enter a prompt', 'error');
      return;
    }

    setLoading(true);

    // Update input node
    setNodes((nds) =>
      nds.map((node) =>
        node.id === '1'
          ? {
              ...node,
              data: { ...node.data, inputValue },
            }
          : node
      )
    );

    // Show loading state in result node
    setNodes((nds) =>
      nds.map((node) =>
        node.id === '2'
          ? {
              ...node,
              data: { ...node.data, label: 'Processing...', isLoading: true },
            }
          : node
      )
    );

    try {
      const response = await callAI(inputValue);

      // Update result node with response
      setNodes((nds) =>
        nds.map((node) =>
          node.id === '2'
            ? {
                ...node,
                data: { ...node.data, label: response, isLoading: false },
              }
            : node
        )
      );

      showNotification('Response generated successfully!', 'success');
    } catch (error) {
      let errorMsg = 'Failed to get response';
      if (error.response?.status === 429) {
        errorMsg = 'Rate limit reached. Try again in a moment.';
      } else if (error.message) {
        errorMsg = error.message;
      }

      showNotification(errorMsg, 'error');
      setNodes((nds) =>
        nds.map((node) =>
          node.id === '2'
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: 'Error occurred',
                  isLoading: false,
                },
              }
            : node
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveQuery = async () => {
    const resultLabel = nodes.find((n) => n.id === '2')?.data?.label;
    if (!resultLabel || resultLabel === 'Result') {
      showNotification('Please run a query first before saving', 'error');
      return;
    }

    try {
      await saveQuery(inputValue, resultLabel);
      showNotification('Query saved successfully! ✓', 'success');
    } catch (error) {
      showNotification('Error saving query', 'error');
    }
  };

  const handleClear = () => {
    setInputValue('');
    setNodes((nds) =>
      nds.map((node) =>
        node.id === '1'
          ? { ...node, data: { ...node.data, inputValue: '' } }
          : node.id === '2'
          ? { ...node, data: { ...node.data, label: 'Waiting for response...' } }
          : node
      )
    );
  };

  return (
    <div className="app-container">
      {notification && (
        <div
          className={`notification notification-${notification.type}`}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background:
              notification.type === 'success'
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : notification.type === 'error'
                ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white',
            padding: '14px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
            animation: 'slideInUp 0.3s ease-out',
            maxWidth: '300px',
            fontSize: '14px',
            fontWeight: 500,
            borderLeft: '4px solid rgba(255,255,255,0.3)',
          }}
        >
          {notification.message}
        </div>
      )}

      <div className="controls">
        <div>
          <h1>FutureBlink Task : MERN App</h1>
          <p>Interactive AI Prompt Engine</p>
        </div>

        <div className="input-section">
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
            Enter Your Prompt
          </label>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything... e.g., 'What is the capital of France?'"
            rows="5"
            disabled={loading}
          />
        </div>

        <div className="button-section">
          <button onClick={handleRunFlow} disabled={loading} style={{ position: 'relative' }}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              '▶ Run Flow'
            )}
          </button>
          <button onClick={handleSaveQuery} disabled={loading}>
            💾 Save Query
          </button>
          <button
            onClick={handleClear}
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
              boxShadow: '0 4px 12px rgba(100, 116, 139, 0.3)',
            }}
          >
            🔄 Clear
          </button>
        </div>

        <div
          style={{
            marginTop: 'auto',
            padding: '12px',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '8px',
            borderLeft: '3px solid #3b82f6',
            fontSize: '12px',
            color: '#94a3b8',
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: '#60a5fa' }}>💡 Tip:</strong> Type your prompt, click "Run Flow" to get an AI response, then save it to your database.
        </div>
      </div>

      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background
            color="#334155"
            gap={16}
            size={1}
            style={{ backgroundColor: '#0f172a' }}
          />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
