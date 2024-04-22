"use client";

import { removeFromCartAction } from "@/app/actions/cart";
import { Button } from "@/app/components/ui/button";
import { useContext } from "react";
import { CartContext } from "@/app/components/cart-provider";

export type RemoveFromCartButtonProps = {
  productId: number;
};

export default function RemoveFromCartButton({
  productId,
}: RemoveFromCartButtonProps) {
  const { setCartShown } = useContext(CartContext);

  const handleRemoveFromCart = async () => {
    await removeFromCartAction(productId);
    setCartShown(true);
  };

  return <Button onClick={handleRemoveFromCart}>Remove</Button>;
}
