import * as S from "./App.css";
import { ActionBar } from "./components/ActionBar";
import { Canvas } from "./components/Canvas";
import { ToolBar } from "./components/ToolBar";
import { useDrawing } from "./hooks/useDrawing";
import { BrushTool } from "./libs/brush";
import { EraserTool } from "./libs/eraser";
import { PenTool } from "./libs/pen";

function App() {
  const { canvasRef, setTool, activeToolId, undo, redo, canUndo, canRedo } =
    useDrawing({
      pen: PenTool,
      brush: BrushTool,
      eraser: EraserTool,
    });

  return (
    <div className={S.Container}>
      <ActionBar undo={undo} redo={redo} canUndo={canUndo} canRedo={canRedo} />
      <Canvas canvasRef={canvasRef} />
      <ToolBar setTool={setTool} activeToolId={activeToolId} />
    </div>
  );
}

export default App;
