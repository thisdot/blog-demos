"use client";
import { incrementCounterAction } from "@/app/storing-state-on-server/actions/actions";

export default function Button() {
  const handleClick = async () => {
    await incrementCounterAction();
  };

  return <button onClick={handleClick}>Increment</button>;
}
