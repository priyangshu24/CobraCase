import { db } from "@/db"
import { notFound } from "next/navigation"
import DesignConfigurator from "./DesignConfigurator"

interface SearchParams {
  [key: string]: string | string[] | undefined
}

// For App Router pages, use the correct type import
export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
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