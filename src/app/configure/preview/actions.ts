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

    // Calculate price (converting to paise for Razorpay)
    const { finish, material } = configuration
    let priceInINR = BASE_PRICE * 75 // Converting USD to INR (approximate conversion)
    if (finish === 'textured') priceInINR += PRODUCT_PRICES.finish.textured * 75
    if (material === 'polycarbonate') priceInINR += PRODUCT_PRICES.material.polycarbonate * 75

    // Convert to paise (1 INR = 100 paise)
    const priceInPaise = Math.round(priceInINR * 100)

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
          amount: priceInINR, // Store amount in INR
          userId: dbUser.id,
          configurationId: configuration.id,
          status: 'awaiting_shipment',
          isPaid: false,
        },
      })
      console.log('Created new order:', order)
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: priceInPaise, // Amount in paise
      currency: 'INR',
      receipt: order.id,
      payment_capture: true,
      notes: {
        orderId: order.id,
        userId: dbUser.id,
        configurationId: configuration.id,
      }
    })

    return { 
      id: razorpayOrder.id,
      amount: priceInPaise,
      currency: 'INR'
    }
  } catch (error) {
    console.error('Checkout session error:', error)
    throw new Error('Failed to create checkout session')
  }
}