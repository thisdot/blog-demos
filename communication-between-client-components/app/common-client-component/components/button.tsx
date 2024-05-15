"use client";
import { WrapperContext } from "@/app/common-client-component/components/wrapper-component";
import { useContext } from "react";

export default function Button() {
  const { increaseCounter } = useContext(WrapperContext);

  return <button onClick={increaseCounter}>Click me</button>;
}
