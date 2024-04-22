import { unstable_cache } from "next/cache";

const { FSDB } = require("file-system-db");

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type Cart = {
  items: Product[];
};

export const PRODUCTS: Product[] = [
  { id: 1, name: "Phone XL", price: 799 },
  { id: 2, name: "Phone Mini", price: 699 },
  { id: 3, name: "Phone Standard", price: 299 },
];

const db = new FSDB("db.json", false);

export function getProducts() {
  return Promise.resolve(structuredClone(PRODUCTS));
}

/**
 * We use the `unstable_cache` function to cache the cart data, and to tag it with the "cart" tag.
 * This helps in revalidation of the cache when the cart data changes.
 */
export const getCachedCart = unstable_cache(
  async () => {
    return await getCart();
  },
  ["getCart"],
  { tags: ["cart"] },
);

export function getCart(): Promise<Cart> {
  // We return a promise to simulate an async operation (which a database call would be).
  return Promise.resolve(db.get("cart"));
}

export async function addToCart(productId: number) {
  const product = PRODUCTS.find((product) => product.id === productId);
  if (product) {
    const cart = await getCart();
    cart.items.push(product);
    await db.set("cart", cart);
  }

  return Promise.resolve();
}

export async function removeFromCart(productId: number) {
  const cart = await getCart();
  const index = cart.items.findIndex((item: Product) => item.id === productId);
  if (index !== -1) {
    cart.items.splice(index, 1);
    await db.set("cart", cart);
  }

  return Promise.resolve();
}
