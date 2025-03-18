'use server'

import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products'
import { db } from '@/db'
import { razorpay } from '@/lib/razorpay'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Order, User } from '@prisma/client'

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
    
    if (!configuration) {
      throw new Error('No such configuration found')
    }
    
    // Get user from session
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    
    console.log('Retrieved user:', user)
    
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
      console.log('Created new user:', dbUser)
    }
    
    // Calculate price
    const { finish, material } = configuration
    let price = BASE_PRICE
    if (finish === 'textured') price += PRODUCT_PRICES.finish.textured
    if (material === 'polycarbonate') price += PRODUCT_PRICES.material.polycarbonate
    
    // Ensure price is in paise/cents (Razorpay expects amount in smallest currency unit)
    const amountInPaise = Math.round(price)
    
    // Find or create order
    let order: Order | null = await db.order.findFirst({
      where: {
        userId: dbUser.id,
        configurationId: configuration.id,
        isPaid: false,
      },
    })
    
    if (!order) {
      order = await db.order.create({
        data: {
          // Store amount in database as the actual amount (not in paise)
          amount: price,
          userId: dbUser.id,
          configurationId: configuration.id,
          status: 'awaiting_shipment',
          isPaid: false,
        },
      })
      console.log('Created new order:', order)
    }
    
    // Generate URLs for success and failure
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const successUrl = `${serverUrl}/thank-you?orderId=${order.id}`
    const cancelUrl = `${serverUrl}/configure/preview?id=${configuration.id}`
    
    // Create Razorpay order with additional parameters
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: order.id,
      payment_capture: true,
      notes: {
        userId: user.id,
        orderId: order.id,
        configurationId: configuration.id,
        successUrl: successUrl,
        cancelUrl: cancelUrl
      }
    })
    
    console.log('Created Razorpay order:', razorpayOrder.id)
    
    // Return order details 
    return {
      id: razorpayOrder.id,
      amount: amountInPaise,
      currency: 'INR',
      orderId: order.id,
      configId: configuration.id,
      key: process.env.RAZORPAY_KEY_ID!,
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