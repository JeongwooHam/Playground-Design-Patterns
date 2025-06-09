import { style } from "@vanilla-extract/css";

export const Button = style({
  padding: "0.5rem 1rem",
  borderRadius: "0.375rem",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "background-color 0.3s ease, transform 0.2s ease",

  selectors: {
    "&:hover": {
      transform: "scale(1.05)",
    },
    "&:active": {
      transform: "scale(0.98)",
    },
  },
});

export const Icon = style({
  transition: "transform 0.2s ease",
});

// @Todo: Active 상태의 버튼 UI 고민해보기
export const Active = style({});
