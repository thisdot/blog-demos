"use client";
import { useContext } from "react";
import { WrapperContext } from "@/app/common-client-component/components/wrapper-component";

export default function CounterDisplay() {
  const { counterValue } = useContext(WrapperContext);

  return (
    <div>
      <h2>Counter Display</h2>
      <p>Times clicked: {counterValue}</p>
    </div>
  );
}
