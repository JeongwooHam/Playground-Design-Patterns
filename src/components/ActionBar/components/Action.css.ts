import { style } from "@vanilla-extract/css";

export const Button = style({
  padding: "0.5rem 1rem",
  borderRadius: "0.375rem",
  border: "none",
  backgroundColor: "transparent",
});

export const DisabledButton = style({
  color: "#ccc",
  cursor: "not-allowed",
});

export const ActiveButton = style({
  cursor: "pointer",
  color: "#444444",
  transition: "transform 0.2s ease",
  selectors: {
    "&:hover": {
      transform: "scale(1.05)",
    },
    "&:active": {
      transform: "scale(0.98)",
    },
  },
});

export const Label = style({
  fontSize: "0.875rem",
  marginTop: "0.25rem",
  textAlign: "center",
  display: "block",
  maxWidth: "100px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const ActiveLabel = style({
  color: "#444444",
});

export const DisabledLabel = style({
  color: "#ccc",
});
