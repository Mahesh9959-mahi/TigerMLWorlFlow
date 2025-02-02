import { render, screen } from "@testing-library/react";
import Canvas from "../components/Canvas/Canvas";
import { ReactFlowProvider } from "react-flow-renderer";

test("renders React Flow canvas", () => {
  render(
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  );

  expect(screen.getByText(/Undo/i)).toBeInTheDocument();
  expect(screen.getByText(/Redo/i)).toBeInTheDocument();
});
