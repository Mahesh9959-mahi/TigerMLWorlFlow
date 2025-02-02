import { render, screen, fireEvent } from "@testing-library/react";
import NodeConfigPanel from "../components/NodeConfigPanel/NodeConfigPanel";
import useWorkflowStore from "../hooks/useWorkflowStore";

jest.mock("../hooks/useWorkflowStore");

test("renders node configuration form", () => {
  useWorkflowStore.mockReturnValue({
    setNodes: jest.fn(),
  });

  render(
    <NodeConfigPanel selectedNode={{ id: "1", data: { label: "Task 1" } }} />
  );

  expect(screen.getByText(/Configure Node/i)).toBeInTheDocument();
  const input = screen.getByLabelText(/Node Name:/i);
  fireEvent.change(input, { target: { value: "Updated Task" } });

  expect(input.value).toBe("Updated Task");
});
