/* eslint-disable @typescript-eslint/no-unused-vars */
import { razorpay } from '@/lib/razorpay'
import { headers } from 'next/headers'
import { db } from '@/db'
import crypto from 'crypto'

export async function POST(req: Request) {
    try {
        const body = await req.text()
        const headersList = headers()
        const signature = headersList.get('x-razorpay-signature')
        
        console.log('Webhook received:', body.substring(0, 200))
        console.log('Signature:', signature)
        
        if (!signature) {
            console.error('Missing Razorpay Signature')
            return new Response('Missing Razorpay Signature', { status: 400 })
        }

        // Verify signature
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
            .update(body)
            .digest('hex')

        console.log('Expected signature:', expectedSignature)
        
        if (signature !== expectedSignature) {
            console.error('Invalid signature')
            return new Response('Invalid signature', { status: 400 })
        }

        const event = JSON.parse(body)
        console.log('Event type:', event.event)

        // Handle payment success
        if (event.event === 'payment.captured' || event.event === 'payment.authorized') {
            // First, find the order from the notes
            const paymentEntity = event.payload.payment.entity
            const orderNotes = paymentEntity.notes || {}
            const orderId = orderNotes.orderId || ''
            
            console.log('Order ID from notes:', orderId)
            
            if (!orderId) {
                console.error('Order ID not found in payment notes')
                return new Response('Order ID not found', { status: 400 })
            }

            // Update order status in database
            await db.order.update({
                where: {
                    id: orderId
                },
                data: {
                    isPaid: true,
                    // status: 'processing',
                    // paymentId: paymentEntity.id
                }
            })

            console.log(`Order ${orderId} marked as paid`)
            return new Response('Webhook processed successfully', { status: 200 })
        }

        return new Response('Unhandled event type', { status: 200 })
    } catch (error) {
        console.error('Webhook error:', error)
        return new Response(
            `Webhook error: ${error instanceof Error ? error.message : 'Unknown error'}`, 
            { status: 500 }
        )
    }
}