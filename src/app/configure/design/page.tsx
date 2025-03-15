import { db } from "@/db"
import { notFound } from "next/navigation"
import DesignConfigurator from "./DesignConfigurator"

// Use the correct typing for App Router pages
interface PageProps {
  params: { [key: string]: string | string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: PageProps) {
  const { id } = searchParams
  
  if (!id || typeof id !== 'string') {
    return notFound()
  }
  
  const configuration = await db.configuration.findUnique({
    where: { id },
  })
  
  if (!configuration) {
    return notFound()
  }
  
  const { imageUrl, height, width } = configuration
  
  return (
    <DesignConfigurator
      configId={configuration.id}
      imageDimensions={{ width, height }}
      imageUrl={imageUrl}
    />
  )
}