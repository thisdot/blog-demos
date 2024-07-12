import { getPageContent, onLinkNavigate, transitionHelper } from "../utils.js";

const dustUrl =
  "https://cdn.glitch.global/b2a0e9e8-12a2-4158-b2d8-11ef08ab8d68/dust%20(1).avif?v=1676473942321";

async function decodeImg(url) {
  const img = new Image();
  img.src = url;
  await img.decode();
}

onLinkNavigate(async ({ toPath }) => {
  const dustDecode = decodeImg(dustUrl).catch(() => {});
  const content = await getPageContent(toPath);

  // Dummy element for the dust
  for (const name of ['dust-1', 'dust-2']) {
    const div = document.createElement("div");
    div.style.viewTransitionName = name;
    div.style.contain = "paint";
    document.body.append(div);  
  }
  

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
      ::view-transition {
        transform: translateY(0%);
      }
      ::view-transition-group(dust-1) {
        background-position: ${Math.random() * 1000}px 100%;
      }
      ::view-transition-group(dust-2) {
        background-position: ${Math.random() * 1000}px 100%;
      }
    `;

    const setTransform = (transform) =>
      (style.sheet.rules[0].style.transform = transform);
    
    const dropDuration = innerHeight / 3;
    const dustDuration = 500;

    
    for (const name of ['dust-1', 'dust-2']) {
      document.documentElement.animate(
        {
          transform: ["translateY(100%)", "none"],
        },
        {
          duration: dustDuration,
          delay: dropDuration,
          fill: "both",
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: `::view-transition-group(${name})`,
        }
      );

      document.documentElement.animate(
        {
          scale: ["1", "1.3"],
        },
        {
          duration: dustDuration,
          delay: dropDuration,
          fill: "both",
          easing: "linear",
          pseudoElement: `::view-transition-group(${name})`,
        }
      );
      
      document.documentElement.animate(
        {
          opacity: ["0", "1"],
        },
        {
          duration: 50,
          delay: dropDuration,
          fill: "both",
          easing: "ease",
          pseudoElement: `::view-transition-group(${name})`,
        }
      );

      document.documentElement.animate(
        {
          opacity: ["1", "0"],
        },
        {
          duration: 300,
          delay: dropDuration + (dustDuration - 300),
          fill: "both",
          easing: "ease",
          pseudoElement: `::view-transition-group(${name})`,
        }
      );
    }

    

    await document.documentElement.animate(
      {
        transform: ["translateY(-100%)", "none"],
      },
      {
        duration: dropDuration,
        fill: "both",
        easing: "linear",
        pseudoElement: "::view-transition-new(root)",
      }
    ).finished;

    const duration = 300;
    const maxDistance = 25;
    const start = document.timeline.currentTime;

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const frameMaxDistance = maxDistance - maxDistance * progress;
      const y = Math.random() * frameMaxDistance * 2 - frameMaxDistance;

      setTransform(`translateY(${y}px)`);

      if (progress !== 1) {
        requestAnimationFrame(frame);
      } else {
        holdAnim.finish();
      }
    }

    requestAnimationFrame(frame);
  });
});
