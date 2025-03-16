// action.ts (in the thank-you directory)
'use server'

import { db } from '@/db'

export async function getPaymentStatus({ orderId }: { orderId: string }) {
  try {
    if (!orderId) return false

    // Wait for a moment to give webhook time to process
    await new Promise(resolve => setTimeout(resolve, 1000))

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        configuration: true,
        user: true,
        billingAddress: true,
        shippingAddress: true
      },
    })

    if (!order) {
      console.log('Order not found:', orderId)
      return false
    }

    // Check if payment has been processed by webhook
    if (!order.isPaid) {
      console.log('Order not paid yet:', orderId)
      
      // Try to manually verify payment status from Razorpay
      // This is a fallback in case the webhook fails
      // You would need to implement this using Razorpay API
      
      // For now, just return the order details
      return {
        isPaid: false,
        configuration: order.configuration,
        billingAddress: order.billingAddress,
        shippingAddress: order.shippingAddress,
        amount: order.amount,
      }
    }

    return {
      isPaid: true,
      configuration: order.configuration,
      billingAddress: order.billingAddress,
      shippingAddress: order.shippingAddress,
      amount: order.amount,
    }
  } catch (error) {
    console.error('Error getting payment status:', error)
    return false
  }
}