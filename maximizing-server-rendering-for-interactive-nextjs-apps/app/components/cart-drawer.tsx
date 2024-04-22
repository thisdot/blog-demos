"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "@/app/components/cart-provider";

type CartDrawerProps = {
  children: React.ReactNode;
};

export default function CartDrawer({ children }: CartDrawerProps) {
  const { isCartShown, setCartShown } = useContext(CartContext);

  return (
    <Sheet open={isCartShown} onOpenChange={setCartShown}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
