import React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "react-flow-renderer";
import { useStore } from "./store";
import Operator from "./nodes/Operator";
import './index.css';

const nodeTypes = {
  operator: Operator,
};

const App = () => {
  const store = useStore();

  const handleConnect = (params) => {
    store.addEdge(params.source, params.target);
  };

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={store.nodes}
      edges={store.edges}
      onNodesChange={store.onNodesChange} 
      onConnect={handleConnect} 
      fitView
    >
      <MiniMap />
      <Controls />
            <button className="button-1" onClick={store.addOperator}>
              Add Operator
            </button>
      <Background />
    </ReactFlow>
  );
};

export default App;
