import { create } from "zustand";
import { addEdge } from "react-flow-renderer";

const useWorkflowStore = create((set) => ({
  nodes: [],
  edges: [],
  history: [],
  future: [],

  setNodes: (newNodes) =>
    set((state) => ({
      history: [...state.history, state.nodes],
      nodes: newNodes,
      future: [],
    })),

  setEdges: (newEdges) =>
    set((state) => ({
      history: [...state.history, state.edges],
      edges: newEdges,
      future: [],
    })),

  onConnect: (connection) =>
    set((state) => ({
      history: [...state.history, state.edges],
      edges: addEdge(connection, state.edges),
      future: [],
    })),

  undo: () =>
    set((state) =>
      state.history.length
        ? {
            future: [state.nodes, ...state.future],
            nodes: state.history[state.history.length - 1],
            history: state.history.slice(0, -1),
          }
        : state
    ),

  redo: () =>
    set((state) =>
      state.future.length
        ? {
            history: [...state.history, state.nodes],
            nodes: state.future[0],
            future: state.future.slice(1),
          }
        : state
    ),
}));

export default useWorkflowStore;
