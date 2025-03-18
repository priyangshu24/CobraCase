'use server'

import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products'
import { db } from '@/db'
import { razorpay } from '@/lib/razorpay'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Order } from '@prisma/client'

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string
}) => {
  try {
    // Find configuration
    const configuration = await db.configuration.findUnique({
      where: { id: configId },
    })
    
    if (!configuration || !configuration.id) {
      throw new Error('No such configuration found')
    }
    
    // Get user from session
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    
    if (!user || !user.id || !user.email) {
      throw new Error('You need to be logged in')
    }
    
    // Find or create user in database
    let dbUser = await db.user.findUnique({
      where: { id: user.id },
    })
    
    if (!dbUser) {
      dbUser = await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      })
    }
    
    // Calculate price
    const { finish, material } = configuration
    let price = BASE_PRICE
    if (finish === 'textured') price += PRODUCT_PRICES.finish.textured
    if (material === 'polycarbonate') price += PRODUCT_PRICES.material.polycarbonate
    
    // Convert price to paise for Razorpay
    const amountInPaise = Math.round(price)
    
    // Create new order (don't reuse existing orders)
    const order = await db.order.create({
      data: {
        amount: price,
        userId: dbUser.id,
        configurationId: configuration.id,
        isPaid: false
      }
    })

    // Generate URLs with proper error handling
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const successUrl = encodeURI(`${serverUrl}/thank-you?orderId=${order.id}`)
    const cancelUrl = encodeURI(`${serverUrl}/configure/preview?id=${configuration.id}`)
    
    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: order.id,
      payment_capture: true,
      notes: {
        userId: user.id,
        orderId: order.id,
        configurationId: configuration.id,
        successUrl,
        cancelUrl
      }
    })
    
    // Return order details
    return {
      id: razorpayOrder.id,
      amount: amountInPaise,
      currency: 'INR',
      orderId: order.id,
      configId: configuration.id,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      notes: {
        userId: user.id,
        orderId: order.id,
        configurationId: configuration.id,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    }
  } catch (error) {
    console.error('Checkout session error:', error)
    throw new Error('Failed to create checkout session')
  }
}