import { Cart, Product } from "@/types";
import ProductCard from "@/components/shared/product/product-card";

const ProductList = ({
  data,
  title,
  limit,
  cart,
}: {
  data: Product[];
  title?: string;
  limit?: number;
  cart: Cart;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-5">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map((product: Product) => (
            <ProductCard key={product.slug} product={product} cart={cart} />
          ))}
        </div>
      ) : (
        <div>
          <p>No Products Found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
