import { style } from "@vanilla-extract/css";

export const Container = style({
  position: "fixed",
  top: 10,
  right: 10,
  display: "flex",
  justifyContent: "center",
  gap: "0.4rem",
  transition: "width 0.3s ease",
});
