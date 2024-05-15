import CounterDisplay from "@/app/using-query-params/components/counter-display";
import Button from "@/app/using-query-params/components/button";
import { Suspense } from "react";

export default function UsingQueryParamsPage() {
  return (
    <div>
      <h1>Using Query Params Page</h1>
      <Suspense>
        <CounterDisplay />
      </Suspense>
      <p>Some content goes here</p>
      <Suspense>
        <Button />
      </Suspense>
    </div>
  );
}
