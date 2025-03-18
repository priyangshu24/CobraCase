'use client'

import { useQuery } from '@tanstack/react-query'
import { getPaymentStatus } from './action'
import { useSearchParams} from 'next/navigation'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import PhonePreview from '@/components/ui/PhonePreview'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'


interface OrderData {
  isPaid: boolean
  configuration: {
    croppedImageUrl: string
    color: string
  }
  billingAddress?: {
    name: string
    street: string
    city: string
    postalCode: string
  }
  shippingAddress?: {
    name: string
    street: string
    city: string
    postalCode: string
  }
  amount: number
}

const AddressSection = ({ 
  address, 
  type 
}: { 
  address: OrderData['billingAddress'], 
  type: 'Shipping' | 'Billing' 
}) => (
  <div>
    <p className='font-medium text-gray-900'>{type} address</p>
    <div className='mt-2 text-zinc-700'>
      {address ? (
        <address className='not-italic'>
          <span className='block'>{address.name}</span>
          <span className='block'>{address.street}</span>
          <span className='block'>
            {address.postalCode} {address.city}
          </span>
        </address>
      ) : (
        <p>No {type.toLowerCase()} address provided</p>
      )}
    </div>
  </div>
)

const ThankYou = () => {
  const searchParams = useSearchParams()
  // const router = useRouter()
  const orderId = searchParams.get('orderId') || ''

  const { data, isLoading, error, refetch } = useQuery<OrderData | true>({
    queryKey: ['get-payment-status', orderId],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: 3,
    retryDelay: 1500,
    enabled: !!orderId,
    refetchInterval: (data) => (!data || !data.isPaid) ? 3000 : true,
  })

  if (isLoading) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
          <h3 className='font-semibold text-xl'>Loading your order...</h3>
          <p>This won&apos;t take long.</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <AlertCircle className='h-12 w-12 text-red-500' />
          <h3 className='font-semibold text-xl text-red-500'>
            Failed to load order details
          </h3>
          <p className='text-zinc-600'>Please try again or contact support.</p>
          <Button 
            onClick={() => refetch()}
            variant="outline"
            className='mt-2'
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  const { configuration, billingAddress, shippingAddress, amount, isPaid } = data
  const { color, croppedImageUrl } = configuration

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='max-w-xl'>
          <div className='flex items-center gap-2'>
            {isPaid ? (
              <CheckCircle className='h-6 w-6 text-green-500' />
            ) : (
              <AlertCircle className='h-6 w-6 text-yellow-500' />
            )}
            <p className={`text-base font-medium ${
              isPaid ? 'text-green-500' : 'text-yellow-500'
            }`}>
              {isPaid ? 'Payment Successful!' : 'Processing Payment...'}
            </p>
          </div>
          
          <h1 className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl'>
            {isPaid ? 'Your case is on the way!' : 'Processing your order...'}
          </h1>
          
          <p className='mt-2 text-base text-zinc-500'>
            {isPaid 
              ? "We've received your payment and are processing your order."
              : "We're verifying your payment. This might take a moment."}
          </p>

          <div className='mt-12 text-sm font-medium'>
            <p className='text-zinc-900'>Order number</p>
            <p className='mt-2 text-zinc-500'>{orderId}</p>
          </div>
        </div>

        <div className='flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl'>
          <PhonePreview
            croppedImageUrl={croppedImageUrl}
            color={color}
          />
        </div>

        <div className='grid grid-cols-2 gap-x-6 py-10 text-sm'>
          <AddressSection address={shippingAddress} type="Shipping" />
          <AddressSection address={billingAddress} type="Billing" />
        </div>

        <div className='grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm'>
          <div>
            <p className='font-medium text-zinc-900'>Payment status</p>
            <p className={`mt-2 font-medium ${
              isPaid ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {isPaid ? 'Paid' : 'Processing'}
            </p>
          </div>
          <div>
            <p className='font-medium text-zinc-900'>Shipping Method</p>
            <p className='mt-2 text-zinc-700'>
              DHL Express (3-5 working days)
            </p>
          </div>
        </div>

        <div className='space-y-6 border-t border-zinc-200 pt-10 text-sm'>
          <div className='flex justify-between'>
            <p className='font-medium text-zinc-900'>Subtotal</p>
            <p className='text-zinc-700'>{formatPrice(amount)}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-medium text-zinc-900'>Shipping</p>
            <p className='text-zinc-700'>{formatPrice(0)}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-medium text-zinc-900'>Total</p>
            <p className='text-zinc-900 font-medium'>{formatPrice(amount)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThankYou