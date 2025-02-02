import React from "react";
import { useForm } from "react-hook-form";
import useWorkflowStore from "../../hooks/useWorkflowStore";

const NodeConfigPanel = ({ selectedNode }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: selectedNode?.data || {},
  });

  const { setNodes } = useWorkflowStore();

  const onSubmit = (data) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === selectedNode.id ? { ...node, data } : node
      )
    );
  };

  if (!selectedNode) return null;

  return (
    <div className="config-panel">
      <h3>Configure Node</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Node Name:</label>
        <input {...register("label", { required: true })} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NodeConfigPanel;
