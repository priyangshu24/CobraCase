'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createCheckoutSession } from './actions'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

// Define the shape of the Razorpay response
interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

// Declare the global Razorpay type
declare global {
  interface Window {
    Razorpay: any
  }
}

interface CheckoutButtonProps {
  configId: string
  className?: string
  variant?: 'default' | 'secondary' | 'outline'
}

const CheckoutButton = ({
  configId,
  className = '',
  variant = 'default',
}: CheckoutButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    try {
      setIsLoading(true)

      // Create checkout session
      const checkoutData = await createCheckoutSession({ configId })
      console.log('Checkout data:', checkoutData)

      if (!checkoutData || !checkoutData.key) {
        throw new Error('Failed to create checkout session')
      }

      // Load the Razorpay script dynamically if not already loaded
      if (typeof window !== 'undefined' && !window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Failed to load Razorpay'))
          document.body.appendChild(script)
        })
      }

      // Configure Razorpay
      const options = {
        key: checkoutData.key,
        amount: checkoutData.amount,
        currency: checkoutData.currency,
        name: 'CaseCobra',
        description: 'Custom Phone Case',
        order_id: checkoutData.id,
        notes: checkoutData.notes,
        // Prefill customer information if available
        prefill: {
          // name: user.name,
          // email: user.email,
          // contact: user.phone
        },
        handler: function (response: RazorpayResponse) {
          console.log('Payment succeeded:', response)
          // Redirect to success page
          router.push(`/thank-you?orderId=${checkoutData.orderId}`)
        },
        modal: {
          ondismiss: function () {
            console.log('Payment modal closed')
            setIsLoading(false)
          },
        },
        theme: {
          color: '#0070f3',
        },
      }

      // Initialize and open Razorpay
      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error)
        setIsLoading(false)
        alert('Payment failed. Please try again.')
      })

      razorpay.open()
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout process. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      variant={variant}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
        </>
      ) : (
        'Buy Now'
      )}
    </Button>
  )
}

export default CheckoutButton