"use client";

export type CounterDisplayProps = {
  counterValue: number;
};

export default function CounterDisplay({ counterValue }: CounterDisplayProps) {
  return <div>Counter Value: {counterValue}</div>;
}
