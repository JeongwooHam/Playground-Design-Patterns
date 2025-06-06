import * as S from "./App.css";
import { ActionBar } from "./components/ActionBar";
import { Canvas } from "./components/Canvas";
import { ToolBar } from "./components/ToolBar";

function App() {
  return (
    <div className={S.Container}>
      <ActionBar />
      <Canvas />
      <ToolBar />
    </div>
  );
}

export default App;
