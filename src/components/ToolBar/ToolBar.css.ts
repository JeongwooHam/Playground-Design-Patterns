import { style } from "@vanilla-extract/css";

export const Container = style({
  position: "fixed",
  bottom: 10,
  backgroundColor: "white",
  borderRadius: "0.5rem",
  padding: "1rem",
  boxShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  display: "flex",
  justifyContent: "center",
  transition: "width 0.3s ease",
});

export const ToolBox = style({
  display: "flex",
  gap: "1rem",
});

export const Option = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
