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
          amount: price / 100,
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
      amount: price,
      currency: 'INR', // Changed from 'IND' to 'INR' (correct currency code)
      receipt: order.id,
      payment_capture: true,
    })

    return { 
      id: razorpayOrder.id,
      amount: price,
      currency: 'INR'
    }
  } catch (error) {
    console.error('Checkout session error:', error)
    throw new Error('Failed to create checkout session')
  }
}