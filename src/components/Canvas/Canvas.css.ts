import { style } from "@vanilla-extract/css";

export const Container = style({
  width: "100vw",
  height: "100vh",
  flexGrow: 1,
  backgroundColor: "#f5f5f5",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
