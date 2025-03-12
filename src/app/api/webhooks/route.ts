/* eslint-disable @typescript-eslint/no-unused-vars */
import { razorpay } from '@/lib/razorpay'
import { headers } from 'next/headers'
import { db } from '@/db'
import crypto from 'crypto'

export async function POST(req: Request) {
    try {
        const body = await req.text()
        const headersList = headers()
        const signature = (await headersList).get('x-razorpay-signature')
        
        if (!signature) {
            return new Response('Missing Razorpay Signature', { status: 400 })
        }

        // Verify signature
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
            .update(body)
            .digest('hex')

        if (signature !== expectedSignature) {
            return new Response('Invalid signature', { status: 400 })
        }

        const event = JSON.parse(body)

        // Handle payment success
        if (event.event === 'payment.captured') {
            const { order_id } = event.payload.payment.entity

            // Update order status in database
            await db.order.update({
                where: {
                    id: order_id
                },
                data: {
                    isPaid: true,
                    status: 'awaiting_shipment',
                }
            })

            return new Response('Webhook processed successfully', { status: 200 })
        }

        return new Response('Unhandled event type', { status: 200 })
    } catch (err) {
        console.error('Webhook error:', err)
        return new Response('Webhook error', { status: 500 })
    }
}