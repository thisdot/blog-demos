"use client";

import { createContext, useState } from "react";

type CartProviderContextValue = {
  isCartShown: boolean;
  setCartShown: (isCartShown: boolean) => void;
};

export const CartContext = createContext<CartProviderContextValue>({
  isCartShown: false,
  setCartShown: () => {},
});

export interface CartProviderProps {
  children?: React.ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const [isShown, setShown] = useState(false);

  return (
    <CartContext.Provider
      value={{
        isCartShown: isShown,
        setCartShown: setShown,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
