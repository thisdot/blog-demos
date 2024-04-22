"use server";

import { addToCart, removeFromCart } from "@/app/data-access/cart";
import { revalidateTag } from "next/cache";

export async function addToCartAction(productId: number) {
  await addToCart(productId);
  // Adding the following revalidates the data cache and makes this server action return updated RSC data, which the client part re-renders
  revalidateTag("cart");
}

export async function removeFromCartAction(productId: number) {
  await removeFromCart(productId);
  revalidateTag("cart");
}
