import { getCachedCart, Product } from "@/app/data-access/cart";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/app/components/ui/table";
import RemoveFromCartButton from "@/app/components/remove-from-cart-button";

export default async function CartContents() {
  const cart = await getCachedCart();

  return (
    <Table>
      <TableBody>
        {cart.items.map((product: Product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="w-10">
              <RemoveFromCartButton productId={product.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
