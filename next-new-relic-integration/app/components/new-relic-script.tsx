import Script from 'next/script';
import { IS_PRODUCTION, IS_STAGING } from '@/utilities/environment';
import { DEV_SCRIPT, PRODUCTION_SCRIPT, STAGING_SCRIPT } from '@/app/components/new-relic-scripts-per-env';

function getScriptContent() {
  if (IS_PRODUCTION) {
    return PRODUCTION_SCRIPT;
  }

  if (IS_STAGING) {
    return STAGING_SCRIPT;
  }

  return DEV_SCRIPT;
}

export default function NewRelicScript() {
  const scriptContent = getScriptContent();

  return (
    <Script
      id="nr-browser-agent"
      strategy="beforeInteractive"
    >
      {scriptContent}
    </Script>
  );
}