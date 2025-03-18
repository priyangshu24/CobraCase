import { notFound } from 'next/navigation'
import { db } from '@/db'
import DesignPreview from './DesignPreview'

interface PageProps {
  params: { [key: string]: string | string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

const Page = async ({ searchParams }: PageProps) => {
  // Safely access id with default value
  const id = searchParams.id as string || 'http://localhost:3000/configure/preview?id=your_configuration_id'

  if (!id) {
    console.log('No ID provided in URL')
    return notFound()
  }

  try {
    const configuration = await db.configuration.findUnique({
      where: { id }
    })

    if (!configuration) {
      console.log('Configuration not found for ID:', id)
      return notFound()
    }

    return <DesignPreview configuration={configuration} />
  } catch (error) {
    console.error('Error fetching configuration:', error)
    return notFound()
  }
}

export default Page