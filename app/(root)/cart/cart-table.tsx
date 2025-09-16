"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { formatCurrency } from "@/lib/utils";
import { Cart, CartItem } from "@/types"; // [IMPROVEMENT] Import CartItem for stricter typing
import { Separator } from "@/components/ui/separator";

// [IMPROVEMENT] Define props type for better readability and type safety
type CartTableProps = {
  cart?: Cart;
};

const CartTable = ({ cart }: CartTableProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // [OPTIMIZATION] State to track which specific item is being updated.
  // This prevents all buttons from showing a loading spinner at once.
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  // [REFACTOR] Abstract the quantity change logic into a handler function.
  const handleQuantityChange = (item: CartItem, action: "add" | "remove") => {
    startTransition(async () => {
      setLoadingItemId(item.productId);
      const res =
        action === "add"
          ? await addItemToCart(item)
          : await removeItemFromCart(item.productId);

      if (!res || !res.success) {
        toast.error(res?.message || "An error occurred.");
      }

      setLoadingItemId(null); // Reset after completion
    });
  };

  // [REFACTOR] Abstract the checkout logic into a handler function.
  const handleCheckout = () => {
    startTransition(() => {
      router.push("/shipping-address");
    });
  };

  // [OPTIMIZATION] Memoize the calculation of total items to prevent re-calculating on every render.
  const totalItems = useMemo(() => {
    if (!cart) return 0;
    return cart.items.reduce((acc, item) => acc + item.qty, 0);
  }, [cart]);

  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 lg:gap-5">
          <div className="overflow-x-auto lg:col-span-3">
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cart.items.map((item) => (
                // A single flex row for each item. 'gap-4' provides space between the image and details.
                <div key={item.slug} className="py-4 flex gap-4">
                  {/* 1. Image size is reduced and fixed. */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <Link href={`/product/${item.slug}`}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full rounded-md"
                      />
                    </Link>
                  </div>

                  {/* Details container now grows to fill available space. */}
                  <div className="flex-grow flex flex-col justify-between">
                    {/* Top section with name and price */}
                    <div>
                      <div className="flex justify-between items-start gap-2 text-sm md:text-l">
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-semibold text-gray-800 hover:underline"
                        >
                          {item.name}
                        </Link>
                        {/* 3. Price now calculates total (price * quantity). */}
                        <p className="font-bold text-right flex-shrink-0">
                          {formatCurrency(Number(item.price) * item.qty)}
                        </p>
                      </div>
                      {/* It's good practice to still show the unit price */}
                      <p className="text-sm text-gray-500 mt-1">
                        Unit: {formatCurrency(Number(item.price))}
                      </p>
                    </div>

                    {/* Bottom section with quantity controls */}
                    <div className="flex items-center mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        {/* REMOVED size="icon" and added responsive classes */}
                        <Button
                          disabled={isPending}
                          variant="ghost"
                          onClick={() => handleQuantityChange(item, "remove")}
                          className="rounded-r-none h-8 w-8 sm:h-9 sm:w-9" // Mobile: h-8, w-8 | Desktop: h-9, w-9
                        >
                          {isPending && loadingItemId === item.productId ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Minus className="w-4 h-4" />
                          )}
                        </Button>
                        {/* REDUCED padding on mobile for the quantity text */}
                        <span className="px-3 sm:px-4 py-1 text-center font-medium">
                          {item.qty}
                        </span>
                        {/* REMOVED size="icon" and added responsive classes */}
                        <Button
                          disabled={isPending}
                          variant="ghost"
                          onClick={() => handleQuantityChange(item, "add")}
                          className="rounded-l-none h-8 w-8 sm:h-9 sm:w-9" // Mobile: h-8, w-8 | Desktop: h-9, w-9
                        >
                          {isPending && loadingItemId === item.productId ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="mt-8 lg:mt-0">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatCurrency(cart.itemsPrice)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-sm">
                <span>Shipping</span>
                <span>Calculating...</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-sm">
                <span>Taxes</span>
                <span>Calculating...</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-l font-bold">
                <span>Order Total</span>
                <span>{formatCurrency(cart.itemsPrice)}</span>
              </div>
              <Button
                className="w-full text-lg mt-4"
                size="lg"
                disabled={isPending}
                onClick={handleCheckout}
                style={{ fontSize: "12px" }}
              >
                {isPending && !loadingItemId ? (
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5 mr-2" />
                )}
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CartTable;
