"use client";

import { addToCartAction } from "@/app/actions/cart";
import { Button } from "@/app/components/ui/button";
import { useContext } from "react";
import { CartContext } from "@/app/components/cart-provider";

export type AddToCartButtonProps = {
  productId: number;
};

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { setCartShown } = useContext(CartContext);

  const handleAddToCart = async () => {
    await addToCartAction(productId);
    setCartShown(true);
  };

  return <Button onClick={handleAddToCart}>Add to Cart</Button>;
}
