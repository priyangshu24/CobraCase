// actions.ts (in the same directory as ThankYou component)
'use server'

import { db } from '@/db'

export async function getPaymentStatus({ orderId }: { orderId: string }) {
  try {
    if (!orderId) return false

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        configuration: true,
        user: true,
      },
    })

    if (!order) return false
    if (!order.isPaid) return false

    return {
      configuration: order.configuration,
      billingAddressId: order.billingAddressId,
      shippingAddressId: order.shippingAddressId,
      amount: order.amount,
    }
  } catch (error) {
    console.error('Error getting payment status:', error)
    return false
  }
}