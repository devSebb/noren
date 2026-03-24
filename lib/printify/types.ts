export interface PrintifyShippingAddress {
  first_name?: string
  last_name?: string
  email: string
  phone?: string
  country: string
  region?: string
  address1: string
  address2?: string
  city: string
  zip: string
}

export interface PrintifyLineItem {
  product_id: string
  variant_id: number
  quantity: number
}

export interface PrintifyOrderPayload {
  external_id: string
  label: string
  line_items: PrintifyLineItem[]
  shipping_method: number
  send_shipping_notification: boolean
  address_to: PrintifyShippingAddress
}

export interface PrintifyOrderResponse {
  id: string
  status: string
  external_id: string
}

export interface PrintifyShippingUpdate {
  type: "order:shipping-update" | "order:delivery-update" | "order:status-update"
  data: {
    order_id: string
    external_id: string
    status?: string
    carrier?: string
    tracking_number?: string
    tracking_url?: string
  }
}
