import { createResource, For } from 'solid-js';

const ProductExample = () => {
  const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    return response.json();
  };
  const [products] = createResource(fetchProducts);

  return (
    <div>
      <div class="container px-6 py-8 mx-auto">
        <h1 class="flex items-center justify-center font-bold text-6xl">
          Products
        </h1>
        <div class="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.loading && (
            <p class="text-center justify-center font-semibold text-2xl mx-auto">
              Loading...
            </p>
          )}
          {products.error && (
            <p class="text-center justify-center w-full text-2xl max-w-lg mx-auto text-red-500">
              An error occurred while fetching products. Try again!
            </p>
          )}
          {products() && (
            <For each={products()}>
              {(product) => (
                <div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                  <img
                    class="object-cover w-full bg-gray-200 rounded-md h-65 xl:h-80"
                    src={product.image}
                    alt={product.title}
                  />
                  <h3 class="mt-2 text-center text-md font-medium text-gray-700">
                    {product.title}
                  </h3>
                  <p class="text-blue-500">{`$${product.price}`}</p>
                  <button class="flex items-center justify-center px-2 py-2 mt-4 font-medium tracking-wide text-white capitalise transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                    <span class="mx-1">Add to Cart</span>
                  </button>
                </div>
              )}
            </For>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductExample;
