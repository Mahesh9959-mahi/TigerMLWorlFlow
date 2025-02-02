import { render, screen } from "@testing-library/react";
import WorkflowTable from "../components/WorkflowTable/WorkflowTable";
import useWorkflowStore from "../hooks/useWorkflowStore";
import { act } from "react-dom/test-utils";

// Mock Zustand store
jest.mock("../hooks/useWorkflowStore");

test("renders workflow table with sample nodes", () => {
  useWorkflowStore.mockReturnValue({
    nodes: [{ id: "1", data: { label: "Task 1" }, type: "taskNode" }],
    setNodes: jest.fn(),
  });

  render(<WorkflowTable />);

  expect(screen.getByText(/Node ID/i)).toBeInTheDocument();
  expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
});
