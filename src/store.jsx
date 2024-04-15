import { applyNodeChanges, applyEdgeChanges } from "react-flow-renderer";
import { create } from "zustand";
import { nanoid } from "nanoid"; 

export const useStore = create((set, get) => ({
  nodes: [
    { id: 'operand1', type: "operand1", position: { x: 0, y: 0 }, data: { label: '5' } },
    { id: 'operand2', type: "operand2", position: { x: 0, y: 100 }, data: { label: '6' } },
    { id: 'operator', type: "operator", position: { x: 0, y: 200 }, data: { operator: '+' } },
    { id: 'operator1', type: "operator", position: { x: 0, y: 300 }, data: { operator: '+' } },
  ],
  edges: [],
 
  updateNode(id, data) {
    set(state => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    }));
  },

  onNodesChange(changes) {
    set(state => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },
  
  addEdge(sourceId, targetId) {
    set((state) => ({
      edges: [...state.edges, { id: `edge-${sourceId}-${targetId}-${state.edges.length}`, source: sourceId, target: targetId }],
    }));
  },
  
  onEdgesChange(changes) {
    set(state => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  createNode(type, x, y) {
    const id = nanoid();
    switch (type) {
      case 'operator': {
        const data = { operator: '+' }; 
        const position = { x, y };
        set((state) => ({
          nodes: [...state.nodes, { id, type, position, data }],
        }));
        break;
      }
    
      default:
        break;
    }
  },
}));
