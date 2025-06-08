import * as S from "./App.css";
import { ActionBar } from "./components/ActionBar";
import { Canvas } from "./components/Canvas";
import { ToolBar } from "./components/ToolBar";
import { useDrawing } from "./hooks/useDrawing";
import { PenTool } from "./utils/pen";

function App() {
  const { canvasRef, setTool, activeToolId } = useDrawing({
    pen: PenTool,
  });

  return (
    <div className={S.Container}>
      <ActionBar />
      <Canvas canvasRef={canvasRef} />
      <ToolBar setTool={setTool} activeToolId={activeToolId} />
    </div>
  );
}

export default App;
