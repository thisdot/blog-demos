import { ProductList } from "@/app/components/product-list";
import CartContents from "./components/cart-contents";
import CartDrawer from "@/app/components/cart-drawer";
import ShowCartButton from "@/app/components/show-cart-button";

export default function Home() {
  return (
    <main className="w-8/12 mx-auto p-32">
      <ProductList />
      <div className="text-center p-16">
        <ShowCartButton />
      </div>
      <CartDrawer>
        <CartContents />
      </CartDrawer>
    </main>
  );
}
