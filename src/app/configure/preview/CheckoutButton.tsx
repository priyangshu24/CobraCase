'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createCheckoutSession } from './actions'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

// Define interfaces for type safety
interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

interface RazorpayError {
  error: {
    code: string
    description: string
    source: string
    step: string
    reason: string
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  notes: Record<string, string>
  prefill: {
    name?: string
    email?: string
    contact?: string
  }
  handler: (response: RazorpayResponse) => void
  modal: {
    ondismiss: () => void
  }
  theme: {
    color: string
  }
}

// Update Razorpay window type
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void
      on: (event: string, handler: (response: RazorpayError) => void) => void
    }
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

      const checkoutData = await createCheckoutSession({ configId })
      
      if (!checkoutData?.key) {
        throw new Error('Failed to create checkout session')
      }

      if (typeof window === 'undefined') {
        throw new Error('Window is not defined')
      }

      // Load Razorpay script if needed
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Failed to load Razorpay'))
          document.body.appendChild(script)
        })
      }

      const options: RazorpayOptions = {
        key: checkoutData.key,
        amount: checkoutData.amount,
        currency: checkoutData.currency,
        name: 'CaseCobra',
        description: 'Custom Phone Case',
        order_id: checkoutData.id,
        notes: checkoutData.notes,
        prefill: {},
        handler: function (response: RazorpayResponse) {
          console.log('Payment succeeded:', response)
          router.push(`/thank-you?orderId=${checkoutData.orderId}&paymentId=${response.razorpay_payment_id}`)
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false)
          },
        },
        theme: {
          color: '#0070f3',
        },
      }

      const razorpay = new window.Razorpay(options)
      
      razorpay.on('payment.failed', function (response: RazorpayError) {
        console.error('Payment failed:', response.error)
        setIsLoading(false)
      })

      razorpay.open()
    } catch (error) {
      console.error('Checkout error:', error)
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