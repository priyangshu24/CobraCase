import { notFound } from 'next/navigation'
import { db } from '@/db'
import DesignPreview from './DesignPreview'

export default async function Page({
  params,
  searchParams,
}: {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get configuration ID from search params
  const configId = searchParams.id
  
  // Add debug logging
  console.log('Accessing preview with params:', {
    configId,
    fullUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configId}`
  })

  if (!configId || typeof configId !== 'string') {
    console.log('Invalid or missing configuration ID')
    return notFound()
  }

  try {
    const configuration = await db.configuration.findUnique({
      where: { id: configId }
    })

    if (!configuration) {
      console.log('Configuration not found:', configId)
      return notFound()
    }

    return <DesignPreview configuration={configuration} />
  } catch (error) {
    console.error('Error fetching configuration:', error)
    return notFound()
  }
}