import { getPageContent, onLinkNavigate, transitionHelper } from "../utils.js";
import { getStyleDeclaration } from "./utils.js";

function easeOutBounce(x) {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

onLinkNavigate(async ({ toPath }) => {
  const content = await getPageContent(toPath);

  const transition = transitionHelper({
    updateDOM() {
      // This is a pretty heavy-handed way to update page content.
      // In production, you'd likely be modifying DOM elements directly,
      // or using a framework.
      // innerHTML is used here just to keep the DOM update super simple.
      document.body.innerHTML = content;
    },
  });

  transition.ready.then(async () => {
    // To stop the transition ending automatically
    const holdAnim = document.documentElement.animate(
      {},
      {
        duration: 60_000,
        pseudoElement: "::view-transition-group(root)",
      }
    );

    const newRootStyles = getStyleDeclaration('::view-transition-new(root)');
    
    const dropDuration = 1500;
    const start = document.timeline.currentTime;

    const frame = (now) => {
      const time = Math.min(now - start, dropDuration);
      const pos = time / dropDuration;

      newRootStyles.transform = `translateY(${(1 - easeOutBounce(pos)) * -100}%)`;

      if (pos < 1) {
        requestAnimationFrame(frame);
      } else {
        // Release the hold
        holdAnim.finish();
      }
    };

    requestAnimationFrame(frame);
  });
});
