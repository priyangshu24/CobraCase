import { db } from "@/db"
import { notFound } from "next/navigation"
import DesignConfigurator from "./DesignConfigurator"

export default async function Page({ searchParams }: never) {
  const resolvedParams = await searchParams
  const { id } = resolvedParams
  
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