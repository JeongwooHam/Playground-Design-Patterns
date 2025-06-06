import { Canvas } from "./components/Canvas"
import { ToolBar } from "./components/ToolBar"
import * as S from './App.css'

function App() {
  return (
    <div className={S.Container}>
      <ToolBar />
      <Canvas />
    </div>
  )
}

export default App
