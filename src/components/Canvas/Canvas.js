import React, { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import useWorkFlowStore from "../../hooks/useWorkFlow";

const Canvas = () => {
  const { nodes, setNodes, edges, setEdges, onConnect, undo, redo } =
    useWorkFlowStore();

  //   const onConnect = useCallback(
  //     (connection) => setEdges((eds) => addEdge(connection, eds)),
  //     []
  //   );

  const handleExport = () => {
    const workflow = { nodes, edges };
    const blob = new Blob([JSON.stringify(workflow, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const importedData = JSON.parse(e.target.result);
      setNodes(importedData.nodes || []);
      setEdges(importedData.edges || []);
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ width: "100vw", height: "90vh" }}>
      <button onClick={handleExport}>Export JSON</button>
      <input type="file" onChange={handleImport} />
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
