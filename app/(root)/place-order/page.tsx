import PlaceOrderForm from "@/app/(root)/place-order/place-order-form";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { Card, CardContent } from "@/components/ui/card";
import { getUserByID } from "@/lib/actions/user.actions";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { redirect } from "next/navigation";
import { ShippingAddress } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import { auth } from "@/auth";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Place Order",
};

const PlaceOrder = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const user = await getUserByID(userId);

  if (!cart || cart.items.length === 0) redirect("/cart");
  if (!user.address) redirect("/shipping-address");
  if (!user.paymentMethod) redirect("/payment-method");

  const userAddress = user.address as ShippingAddress;

  return (
    <>
      <CheckoutSteps current={3} />
      <h1 className="py-4 text-2xl">Place Order</h1>
      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2 overflow-x-auto space-y-4">
          <Card>
            <CardContent className="gap-4">
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <p>{userAddress.fullName}</p>
              <p>
                {userAddress.streetAddress}, {userAddress.city}{" "}
                {userAddress.postalCode}, {userAddress.country}
              </p>
              <div className="mt-3">
                <Link href="/shipping-address">
                  <Button variant="outline">Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="gap-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p>{user.paymentMethod}</p>
              <div className="mt-3">
                <Link href="/payment-method">
                  <Button variant="outline">Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="gap-4">
              <h2 className="text-xl pb-4">Order Items</h2>
              <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
                {cart.items.map((item) => (
                  // A single flex row for each item. 'gap-4' provides space between the image and details.
                  <div key={item.slug} className="py-4 flex gap-4">
                    {/* 1. Image size is reduced and fixed. */}
                    <div className="w-18 h-18 md:w-24 md:h-24 flex-shrink-0">
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
                          {/* Price calculates total (price * quantity). */}
                          <p className="font-bold text-right flex-shrink-0">
                            {formatCurrency(Number(item.price) * item.qty)}
                          </p>
                        </div>
                        {/* Unit price displayed */}
                        <p className="text-sm text-gray-500 mt-1">
                          Unit: {formatCurrency(Number(item.price))}
                        </p>
                        {/* Display quantity without affecting design */}
                        <p className="text-sm text-gray-500 mt-1">
                          Qty: {item.qty}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="gap-4 space-y-3">
              <div className="flex justify-between">
                <div className="font-bold">Items</div>
                <div>{formatCurrency(cart.itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Tax</div>
                <div>{formatCurrency(cart.taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Shipping</div>
                <div>{formatCurrency(cart.shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Total</div>
                <div>{formatCurrency(cart.totalPrice)}</div>
              </div>

              <PlaceOrderForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
