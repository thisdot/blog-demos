import CounterDisplay from "@/app/common-client-component/components/counter-display";
import Button from "@/app/common-client-component/components/button";

export default function CommonClientComponentPage() {
  return (
    <div>
      <h1>Common Client Component Page</h1>
      <CounterDisplay />
      <p>Some content goes here</p>
      <Button />
    </div>
  );
}
