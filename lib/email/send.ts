import { resend, EMAIL_FROM_ADDRESS } from "./resend"

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface OrderConfirmationOptions {
  to: string
  orderNumber: string
  items: OrderItem[]
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
}

export async function sendOrderConfirmationEmail(opts: OrderConfirmationOptions) {
  const itemsHtml = opts.items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #2a2a28;">${item.name} × ${item.quantity}</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #2a2a28; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join("")

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmed — NOREN</title>
    </head>
    <body style="background: #0f0f0f; color: #f0ebe3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 40px 20px;">
      <div style="max-width: 560px; margin: 0 auto;">
        <h1 style="font-size: 28px; font-weight: 900; letter-spacing: -0.02em; margin: 0 0 8px;">NOREN 暖簾</h1>
        <p style="color: #a09a90; margin: 0 0 40px;">Wear the Culture.</p>

        <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 8px;">Order Confirmed 🎉</h2>
        <p style="color: #a09a90; margin: 0 0 32px;">Thank you for your order! We're getting it printed and on its way.</p>

        <p style="font-size: 14px; color: #a09a90; margin: 0 0 4px;">Order number</p>
        <p style="font-size: 18px; font-weight: 700; margin: 0 0 32px; color: #cc4444;">${opts.orderNumber}</p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 4px 0; color: #a09a90;">Subtotal</td>
            <td style="padding: 4px 0; text-align: right;">$${opts.subtotal.toFixed(2)}</td>
          </tr>
          ${opts.discount > 0 ? `<tr>
            <td style="padding: 4px 0; color: #4ade80;">Discount</td>
            <td style="padding: 4px 0; text-align: right; color: #4ade80;">-$${opts.discount.toFixed(2)}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 4px 0; color: #a09a90;">Shipping</td>
            <td style="padding: 4px 0; text-align: right;">${opts.shipping === 0 ? "FREE" : `$${opts.shipping.toFixed(2)}`}</td>
          </tr>
          ${opts.tax > 0 ? `<tr>
            <td style="padding: 4px 0; color: #a09a90;">Tax</td>
            <td style="padding: 4px 0; text-align: right;">$${opts.tax.toFixed(2)}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 12px 0 4px; font-weight: 700; font-size: 18px; border-top: 1px solid #2a2a28;">Total</td>
            <td style="padding: 12px 0 4px; text-align: right; font-weight: 700; font-size: 18px; border-top: 1px solid #2a2a28;">$${opts.total.toFixed(2)}</td>
          </tr>
        </table>

        <div style="margin-top: 40px; padding: 20px; background: #1a1a1a; border-radius: 12px; border: 1px solid #2a2a28;">
          <p style="margin: 0 0 8px; font-weight: 600;">What happens next?</p>
          <p style="margin: 0; color: #a09a90; font-size: 14px; line-height: 1.6;">
            Your order is being printed and will ship within 2-3 business days.
            You'll receive a shipping notification with tracking info as soon as it's on its way.
          </p>
        </div>

        <p style="margin-top: 40px; color: #a09a90; font-size: 12px;">
          Questions? Email us at <a href="mailto:hello@norenstore.com" style="color: #cc4444;">hello@norenstore.com</a>
          <br>© 2026 NOREN. Made with 🍜 in the USA.
        </p>
      </div>
    </body>
    </html>
  `

  return resend.emails.send({
    from: EMAIL_FROM_ADDRESS,
    to: opts.to,
    subject: `Order confirmed — ${opts.orderNumber}`,
    html,
  })
}

interface ShippingNotificationOptions {
  to: string
  orderNumber: string
  trackingNumber: string
  trackingUrl: string
  carrier: string
}

export async function sendShippingNotificationEmail(opts: ShippingNotificationOptions) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>Your NOREN order shipped!</title></head>
    <body style="background: #0f0f0f; color: #f0ebe3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 40px 20px;">
      <div style="max-width: 560px; margin: 0 auto;">
        <h1 style="font-size: 28px; font-weight: 900; letter-spacing: -0.02em; margin: 0 0 8px;">NOREN 暖簾</h1>
        <p style="color: #a09a90; margin: 0 0 40px;">Wear the Culture.</p>

        <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 8px;">Your order shipped! 📦</h2>
        <p style="color: #a09a90; margin: 0 0 32px;">Order ${opts.orderNumber} is on its way.</p>

        <div style="margin-bottom: 24px;">
          <p style="font-size: 14px; color: #a09a90; margin: 0 0 4px;">Carrier</p>
          <p style="font-weight: 600; margin: 0 0 16px;">${opts.carrier}</p>
          <p style="font-size: 14px; color: #a09a90; margin: 0 0 4px;">Tracking number</p>
          <p style="font-weight: 600; font-family: monospace; margin: 0;">${opts.trackingNumber}</p>
        </div>

        <a href="${opts.trackingUrl}" style="display: inline-block; padding: 14px 28px; background: #cc4444; color: #f0ebe3; text-decoration: none; font-weight: 700; border-radius: 10px;">
          Track Your Package →
        </a>

        <p style="margin-top: 40px; color: #a09a90; font-size: 12px;">
          © 2026 NOREN. Made with 🍜 in the USA.
        </p>
      </div>
    </body>
    </html>
  `

  return resend.emails.send({
    from: EMAIL_FROM_ADDRESS,
    to: opts.to,
    subject: `Your NOREN order shipped! — ${opts.orderNumber}`,
    html,
  })
}

interface WelcomeEmailOptions {
  to: string
  discountCode?: string
}

export async function sendWelcomeEmail(opts: WelcomeEmailOptions) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>Welcome to NOREN!</title></head>
    <body style="background: #0f0f0f; color: #f0ebe3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 40px 20px;">
      <div style="max-width: 560px; margin: 0 auto; text-align: center;">
        <h1 style="font-size: 40px; font-weight: 900; margin: 0 0 8px;">🍜</h1>
        <h2 style="font-size: 28px; font-weight: 900; letter-spacing: -0.02em; margin: 0 0 8px;">Welcome to NOREN</h2>
        <p style="color: #a09a90; margin: 0 0 32px;">You're officially part of the Noodle Crew.</p>

        ${opts.discountCode ? `
        <div style="padding: 24px; background: #1a1a1a; border-radius: 12px; border: 1px solid #2a2a28; margin-bottom: 32px;">
          <p style="margin: 0 0 8px; color: #a09a90; font-size: 14px;">Your welcome discount</p>
          <p style="margin: 0 0 8px; font-size: 28px; font-weight: 900; letter-spacing: 0.1em; color: #cc4444;">${opts.discountCode}</p>
          <p style="margin: 0; color: #a09a90; font-size: 14px;">25% off your first order</p>
        </div>
        ` : ""}

        <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://norenstore.com"}/products" style="display: inline-block; padding: 16px 32px; background: #cc4444; color: #f0ebe3; text-decoration: none; font-weight: 700; border-radius: 10px; font-size: 16px;">
          SHOP THE COLLECTION →
        </a>

        <p style="margin-top: 40px; color: #a09a90; font-size: 12px;">
          © 2026 NOREN. Made with 🍜 in the USA.
        </p>
      </div>
    </body>
    </html>
  `

  return resend.emails.send({
    from: EMAIL_FROM_ADDRESS,
    to: opts.to,
    subject: "Welcome to NOREN — here's your 25% off 🍜",
    html,
  })
}

interface AbandonedCartEmailOptions {
  to: string
  cartItems: Array<{ name: string; emoji: string; price: number; quantity: number }>
  total: number
  cartSessionId: string
}

export async function sendAbandonedCartEmail(opts: AbandonedCartEmailOptions) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://norenstore.com"
  const itemsHtml = opts.cartItems
    .map(
      (item) =>
        `<div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #1a1a1a; border-radius: 8px; margin-bottom: 8px;">
          <span style="font-size: 24px;">${item.emoji}</span>
          <div>
            <p style="margin: 0; font-weight: 600;">${item.name}</p>
            <p style="margin: 0; color: #a09a90; font-size: 14px;">Qty: ${item.quantity} · $${item.price.toFixed(2)}</p>
          </div>
        </div>`
    )
    .join("")

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>You left something behind...</title></head>
    <body style="background: #0f0f0f; color: #f0ebe3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 40px 20px;">
      <div style="max-width: 560px; margin: 0 auto;">
        <h1 style="font-size: 28px; font-weight: 900; margin: 0 0 8px;">NOREN 暖簾</h1>
        <p style="color: #a09a90; margin: 0 0 40px;">Wear the Culture.</p>

        <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 8px;">Your cart misses you 🍜</h2>
        <p style="color: #a09a90; margin: 0 0 24px;">You left some great stuff behind. Come back and complete your order!</p>

        <div style="margin-bottom: 32px;">${itemsHtml}</div>

        <p style="margin: 0 0 24px; font-size: 18px; font-weight: 700;">
          Cart total: $${opts.total.toFixed(2)}
        </p>

        <a href="${baseUrl}/cart?session=${opts.cartSessionId}" style="display: inline-block; padding: 16px 32px; background: #cc4444; color: #f0ebe3; text-decoration: none; font-weight: 700; border-radius: 10px; font-size: 16px;">
          COMPLETE MY ORDER →
        </a>

        <p style="margin-top: 40px; color: #a09a90; font-size: 12px;">
          © 2026 NOREN. Made with 🍜 in the USA.
          <br>You're receiving this because you started a checkout on norenstore.com.
        </p>
      </div>
    </body>
    </html>
  `

  return resend.emails.send({
    from: EMAIL_FROM_ADDRESS,
    to: opts.to,
    subject: "You left something behind... 🍜",
    html,
  })
}
