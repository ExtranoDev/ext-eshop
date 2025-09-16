import { getOrderById } from "@/lib/actions/order.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import OrderDetailsTable from "@/app/(root)/order/[id]/order-details-table";
import { ShippingAddress } from "@/types";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Order details",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const order = await getOrderById(id);
  const session = await auth();

  if (!order) notFound();

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
        user: {
          ...order.user,
          name: order.user.name ?? "", // Ensure name is always a string
        },
        paymentResult: null,
      }}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
      isAdmin={session?.user?.role === "admin" || false}
    />
  );
};

export default OrderDetailsPage;
