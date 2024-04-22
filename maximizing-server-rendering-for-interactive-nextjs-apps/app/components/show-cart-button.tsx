"use client";

import { Button } from "@/app/components/ui/button";
import { useContext } from "react";
import { CartContext } from "@/app/components/cart-provider";

export default function ShowCartButton() {
  const { setCartShown } = useContext(CartContext);

  const handleShowCart = async () => {
    setCartShown(true);
  };

  return <Button onClick={handleShowCart}>Show Cart</Button>;
}
