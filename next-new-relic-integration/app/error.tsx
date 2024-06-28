"use client";

import { useEffect } from "react";

export default function ErrorPage({
                                    error,
                                  }: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    if (window.newrelic) {
      window.newrelic.noticeError(error);
    } else {
      console.error("Cannot report error to New Relic", error);
    }
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
    </div>
  );
}
