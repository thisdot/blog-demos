import { css } from "./css-hooks";

export default function Home() {
  return (
    <main
      style={css({ maxWidth: 1200, margin: "0 auto", textAlign: "center" })}
    >
      <h1>CSS Hooks Example</h1>
      <p>Here is an example of CSS Hooks in action!</p>

      <a
        href="https://example.com"
        style={css({
          color: "cornflowerblue",
          "&:hover": { color: "red" },
          customFocusHook: { color: "lime" },
        })}
      >
        Hover over me to make me red
      </a>
    </main>
  );
}
