"use client";

import { createContext, useState } from "react";

type WrapperContextValue = {
  counterValue: number;
  increaseCounter: () => void;
};

export const WrapperContext = createContext<WrapperContextValue>({
  counterValue: 0,
  increaseCounter: () => {},
});

export interface WrapperComponentProps {
  children?: React.ReactNode;
}

export default function WrapperComponent({ children }: WrapperComponentProps) {
  const [counterValue, setCounterValue] = useState(0);

  return (
    <WrapperContext.Provider
      value={{
        counterValue,
        increaseCounter: () => {
          setCounterValue((prev) => prev + 1);
        },
      }}
    >
      {children}
    </WrapperContext.Provider>
  );
}
