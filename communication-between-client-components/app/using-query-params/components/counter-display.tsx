"use client";
import { useSearchParams } from "next/navigation";

export default function CounterDisplay() {
  const searchParams = useSearchParams();
  const currentValue = searchParams.get("counterValue") || "0";

  return <div>Counter Value: {currentValue}</div>;
}
