"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function Button() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValue = searchParams.get("counterValue") || "0";

  const handleClick = () => {
    const newValue = parseInt(currentValue) + 1;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("counterValue", newValue.toString());
    router.replace(`?${newSearchParams.toString()}`);
  };

  return <button onClick={handleClick}>Increment</button>;
}
