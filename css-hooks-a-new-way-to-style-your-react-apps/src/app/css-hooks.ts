import { createHooks } from "@css-hooks/react";
import { recommended } from "@css-hooks/recommended";

export const [hooks, css] = createHooks({
  ...recommended({
    breakpoints: ["500px", "1000px"],
    colorSchemes: ["dark", "light"],
    pseudoClasses: [":hover", ":focus", ":active", ":disabled"],
  }),

  // Your own custom hooks can go here.
  customFocusHook: "&:focus",
});
