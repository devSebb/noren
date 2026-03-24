import { Resend } from "resend"

let _resend: Resend | null = null

function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error("Missing RESEND_API_KEY environment variable")
    _resend = new Resend(key)
  }
  return _resend
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resend = new Proxy({} as Resend, {
  get(_target, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getResend() as any)[prop]
  },
})

export const EMAIL_FROM = process.env.EMAIL_FROM ?? "orders@norenstore.com"
export const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME ?? "NOREN"
export const EMAIL_FROM_ADDRESS = `${EMAIL_FROM_NAME} <${EMAIL_FROM}>`
