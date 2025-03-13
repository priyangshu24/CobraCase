import { db } from "@/db"
import { notFound } from "next/navigation"
import DesignConfigurator from "./DesignConfigurator"

// Remove your custom PageProps interface completely
// Instead, use the default Next.js App Router typing pattern

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
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