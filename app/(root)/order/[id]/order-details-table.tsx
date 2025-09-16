"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Order } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import {
  approvePayPalOrder,
  createPayPalOrder,
  deliverOrder,
  updateOrderToPaidCOD,
} from "@/lib/actions/order.actions";
import { toast } from "sonner";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

const OrderDetailsTable = ({
  order,
  paypalClientId,
  isAdmin,
}: {
  order: Order;
  paypalClientId: string;
  isAdmin: boolean;
}) => {
  const {
    shippingAddress,
    orderitems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt,
  } = order;

  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    let status = "";

    if (isPending) {
      status = "Loading Paypal";
    } else if (isRejected) {
      status = "Error Loading PayPal";
    }

    return status;
  };

  const handleCreatePayPalOrder = async () => {
    const res = await createPayPalOrder(order.id);

    if (!res.success) {
      toast.error(res.message);
    }

    return res.data;
  };

  // Button to mark order as paid
  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition();

    return (
      <Button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToPaidCOD(order.id);
            if (res.success) toast.success(res.message);
            else toast.error(res.message);
          })
        }
      >
        {isPending ? "processing..." : "Mark as Paid"}
      </Button>
    );
  };

  // Button to mark order as paid
  const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition();

    return (
      <Button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await deliverOrder(order.id);
            if (res.success) toast.success(res.message);
            else toast.error(res.message);
          })
        }
      >
        {isPending ? "processing..." : "Mark as Delivered"}
      </Button>
    );
  };

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePayPalOrder(order.id, data);

    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }
  };

  return (
    <>
      <h1 className="py-4 text-2xl">Order {formatId(order.id)}</h1>
      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2 space-4-y overflow-x-auto">
          <Card>
            <CardContent className="gap-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p className="mb-2">{paymentMethod}</p>
              {isPaid ? (
                <Badge variant="secondary">
                  Paid at {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not Paid</Badge>
              )}
            </CardContent>
          </Card>
          <Card className="my-3">
            <CardContent className="gap-4">
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p className="mb-2">
                {shippingAddress.streetAddress}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isPaid ? (
                <Badge variant="secondary">
                  Delivered at {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not Delivered</Badge>
              )}
            </CardContent>
          </Card>
          <Card className="p-6 gap-4">
            <h2 className="text-xl pb-4">Order Items</h2>
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {orderitems.map((item) => (
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
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="gap-4 space-y-3">
              <div className="flex justify-between">
                <div className="font-bold">Items</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Tax</div>
                <div>{formatCurrency(taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Shipping</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>
              {/* PayPal Payment */}
              {!isPaid && paymentMethod === "PayPal" && (
                <div>
                  <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                    <PrintLoadingState />
                    <PayPalButtons
                      createOrder={handleCreatePayPalOrder}
                      onApprove={handleApprovePayPalOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              )}

              {/* Cash on Delivery */}
              {isAdmin && !isPaid && paymentMethod === "CashOnDelivery" && (
                <MarkAsPaidButton />
              )}
              {isAdmin && isPaid && !isDelivered && <MarkAsDeliveredButton />}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;
