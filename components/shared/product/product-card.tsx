import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import ProductPrice from "@/components/shared/product/product-price";
import { Cart, Product } from "@/types";
import Rating from "./rating";
import { Button } from "@/components/ui/button";
import AddToCart from "./add-to-cart";

const ProductCard = ({ product, cart }: { product: Product; cart: Cart }) => {
  return (
    <Card className="w-full max-w-xs overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02]">
      <Link href={`/product/${product.slug}`} className="block">
        <CardHeader className="relative p-4 aspect-square">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="transition-transform duration-300 ease-in-out hover:scale-105"
            priority={true}
          />
        </CardHeader>
      </Link>
      <CardContent className="grid gap-2">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h2 className="text-sm font-semibold tracking-wide text-gray-900 transition-colors duration-200 hover:text-pink-600">
              {product.name}
            </h2>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rating value={Number(product.rating)} />
            <span className="text-xs text-gray-500">
              ({product.numReviews || 0})
            </span>
          </div>
          {product.stock > 0 ? (
            <ProductPrice
              value={Number(product.price)}
              className="font-bold text-gray-900 text-base"
            />
          ) : (
            <p className="text-xs font-medium text-destructive">Out of Stock</p>
          )}
        </div>
        <div className="mt-4">
          {product.stock > 0 ? (
            <AddToCart
              cart={cart}
              item={{
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                qty: 1,
                image: product.images![0],
              }}
            />
          ) : (
            <Button
              className="w-full rounded-full py-2 text-gray-500 cursor-not-allowed border-gray-300"
              variant="outline"
              disabled
            >
              Sold Out
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter className="[.border-b]:pb-2">
        <div className="text-[10px] md:text-[8px] font-light text-gray-600 italic bg-gray-100 rounded-md px-2 py-1">
          {product.brand}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
