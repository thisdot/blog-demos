import { getPageContent, onLinkNavigate, transitionHelper } from "../utils.js";

const dustUrl = 'https://cdn.glitch.global/b2a0e9e8-12a2-4158-b2d8-11ef08ab8d68/dust%20(1).avif?v=1676473942321';

async function decodeImg(url) {
  const img = new Image();
  img.src = url;
  await img.decode();
}

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
  const dustDecode = decodeImg(dustUrl).catch(() => {});
  const content = await getPageContent(toPath);
  
  // Dummy element for the dust
  const div = document.createElement('div');
  div.style.viewTransitionName = 'dust';
  div.style.contain = 'paint';
  document.body.append(div);

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
    
    await dustDecode;

    // To set pseudo styles, you need to use a stylesheet:
    const style = document.createElement("style");

    document.head.append(style);
    transition.finished.finally(() => style.remove());

    style.textContent = `
      ::view-transition-new(root) {
        transform: translateY(0%);
      }
    `;

    const setTransform = (transform) =>
      (style.sheet.rules[0].style.transform = transform);
    
    const dropDuration = 1500;
    const dustLaunch = dropDuration * 0.364;
    const start = document.timeline.currentTime;

    const frame = (now) => {
      const time = Math.min(now - start, dropDuration);
      const pos = time / dropDuration;

      setTransform(`translateY(${(1 - easeOutBounce(pos)) * -100}%)`);

      if (pos < 1) {
        requestAnimationFrame(frame);
      } else {
        // Release the hold
        holdAnim.finish();
      }
    };

    requestAnimationFrame(frame);
    
    const dustDuration = 500;
    
    document.documentElement.animate(
      {
        transform: ['translateY(100%)', 'none'],
      },
      {
        duration: dustDuration,
        delay: dustLaunch,
        fill: 'both',
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        pseudoElement: "::view-transition-group(dust)",
      }
    );
    
    document.documentElement.animate(
      {
        scale: ['1', '1.3'],
      },
      {
        duration: dustDuration,
        delay: dustLaunch,
        fill: 'both',
        easing: 'linear',
        pseudoElement: "::view-transition-group(dust)",
      }
    );
    
    document.documentElement.animate(
      {
        opacity: ['0', '1'],
      },
      {
        duration: 50,
        delay: dustLaunch,
        fill: 'both',
        easing: 'ease',
        pseudoElement: "::view-transition-group(dust)",
      }
    );
    
    document.documentElement.animate(
      {
        opacity: ['1', '0'],
      },
      {
        duration: 300,
        delay: dustLaunch + (dustDuration - 300),
        fill: 'both',
        easing: 'ease',
        pseudoElement: "::view-transition-group(dust)",
      }
    );
  });
});
