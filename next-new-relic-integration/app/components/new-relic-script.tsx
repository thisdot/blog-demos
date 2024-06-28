import Script from 'next/script';
import { IS_PRODUCTION, IS_STAGING } from '@/utilities/environment';
import { DEV_SCRIPT, PRODUCTION_SCRIPT, STAGING_SCRIPT } from '@/app/components/new-relic-scripts-per-env';

export default function NewRelicScript() {
  const scriptContent = IS_PRODUCTION
    ? PRODUCTION_SCRIPT
    : IS_STAGING
      ? STAGING_SCRIPT
      : DEV_SCRIPT;

  return (
    <Script
      // We have to set an id for inline scripts.
      // See https://nextjs.org/docs/app/building-your-application/optimizing/scripts#inline-scripts
      id="nr-browser-agent"
      // By setting the strategy to "beforeInteractive" we guarantee that
      // the script will be added to the document's `head` element.
      strategy="beforeInteractive"
    >
      {scriptContent}
    </Script>
  );
}