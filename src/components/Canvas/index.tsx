import type { RefObject } from "react";
import * as S from "./Canvas.css";

type CanvasProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

export const Canvas = ({ canvasRef }: CanvasProps) => {
  return (
    <div className={S.Container}>
      <canvas
        ref={canvasRef}
        width={"1000rem"}
        height={"500rem"}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
};
