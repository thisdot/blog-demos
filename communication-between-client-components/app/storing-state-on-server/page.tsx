import CounterDisplay from "@/app/storing-state-on-server/components/counter-display";
import Button from "@/app/storing-state-on-server/components/button";

async function getCounterValue() {
  return Promise.resolve(0); // This would be an API/database call in a real app
}

export default async function StoringStateOnServerPage() {
  const counterValue = await getCounterValue();
  return (
    <div>
      <h1>Storing State on Server Page</h1>
      <CounterDisplay counterValue={counterValue} />
      <p>Some content goes here</p>
      <Button />
    </div>
  );
}
