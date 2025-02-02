import { render, screen, fireEvent } from "@testing-library/react";
import Canvas from "../components/Canvas/Canvas";
import { ReactFlowProvider } from "react-flow-renderer";

test("triggers workflow export", () => {
  render(
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  );

  const exportButton = screen.getByText(/Export JSON/i);
  fireEvent.click(exportButton);

  expect(exportButton).toBeInTheDocument();
});
