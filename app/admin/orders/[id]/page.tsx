import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { orders, orderItems, orderEvents } from "@/lib/db/schema"
import { eq, asc } from "drizzle-orm"
import { formatCents } from "@/lib/utils/format"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

const statusColors: Record<string, string> = {
  created: "text-muted-foreground",
  paid: "text-[#4ade80]",
  sent_to_printify: "text-accent",
  printify_accepted: "text-accent",
  shipped: "text-[#4ade80]",
  delivered: "text-[#4ade80]",
  refunded: "text-primary",
  cancelled: "text-primary",
  printify_error: "text-primary",
}

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params

  let order = null
  let items: typeof orderItems.$inferSelect[] = []
  let events: typeof orderEvents.$inferSelect[] = []

  try {
    const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1)
    order = result[0]
    if (order) {
      items = await db.select().from(orderItems).where(eq(orderItems.orderId, id))
      events = await db
        .select()
        .from(orderEvents)
        .where(eq(orderEvents.orderId, id))
        .orderBy(asc(orderEvents.createdAt))
    }
  } catch {
    // DB not configured
  }

  if (!order) notFound()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/orders" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Orders
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">{order.orderNumber}</h1>
        </div>
        <div className="flex gap-2">
          {order.stripePaymentIntentId && (
            <a
              href={`https://dashboard.stripe.com/payments/${order.stripePaymentIntentId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-secondary transition-colors"
            >
              View in Stripe ↗
            </a>
          )}
          {order.printifyOrderId && (
            <a
              href={`https://printify.com/app/orders`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-secondary transition-colors"
            >
              View in Printify ↗
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-bold">Order Items</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Product</th>
                  <th className="text-center p-4 font-medium text-muted-foreground">Qty</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0">
                    <td className="p-4">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-muted-foreground text-xs">{item.variantLabel}</p>
                    </td>
                    <td className="p-4 text-center">{item.quantity}</td>
                    <td className="p-4 text-right">{formatCents(item.totalCents)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 border-t border-border space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatCents(order.subtotalCents)}</span>
              </div>
              {(order.discountCents ?? 0) > 0 && (
                <div className="flex justify-between text-[#4ade80]">
                  <span>Discount ({order.discountCode})</span>
                  <span>-{formatCents(order.discountCents ?? 0)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{(order.shippingCents ?? 0) === 0 ? "FREE" : formatCents(order.shippingCents ?? 0)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                <span>Total</span>
                <span>{formatCents(order.totalCents)}</span>
              </div>
            </div>
          </div>

          {/* Event Timeline */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-bold">Order Timeline</h2>
            </div>
            <div className="p-4 space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                    <div className="w-px flex-1 bg-border mt-1" />
                  </div>
                  <div className="pb-4">
                    <p className={`font-medium text-sm capitalize ${statusColors[event.eventType] ?? "text-foreground"}`}>
                      {event.eventType.replace(/_/g, " ")}
                    </p>
                    {event.description && (
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.createdAt ? new Date(event.createdAt).toLocaleString() : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Status */}
          <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
            <h2 className="font-bold">Status</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order</span>
                <span className="capitalize font-medium">{order.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment</span>
                <span className="capitalize font-medium">{order.paymentStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fulfillment</span>
                <span className="capitalize font-medium">{order.fulfillmentStatus}</span>
              </div>
            </div>
          </div>

          {/* Customer */}
          <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
            <h2 className="font-bold">Customer</h2>
            <p className="text-sm">{order.email}</p>
          </div>

          {/* Shipping */}
          <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
            <h2 className="font-bold">Shipping Address</h2>
            <div className="text-sm text-muted-foreground">
              <p>{order.shippingName}</p>
              <p>{order.shippingAddressLine1}</p>
              {order.shippingAddressLine2 && <p>{order.shippingAddressLine2}</p>}
              <p>{order.shippingCity}, {order.shippingState} {order.shippingPostalCode}</p>
              <p>{order.shippingCountry}</p>
            </div>
          </div>

          {/* Tracking */}
          {order.trackingNumber && (
            <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
              <h2 className="font-bold">Tracking</h2>
              <div className="text-sm">
                <p className="text-muted-foreground">{order.carrier}</p>
                <p className="font-mono font-medium">{order.trackingNumber}</p>
                {order.trackingUrl && (
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-xs mt-1 block"
                  >
                    Track Package →
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
