import { db } from "@/db"
import { notFound } from "next/navigation"
import DesignConfigurator from "./DesignConfigurator"

interface SearchParams {
  [key: string]: string | string[] | undefined
}

interface PageProps {
  searchParams: SearchParams
}

const Page = async ({ searchParams }: PageProps) => {
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

export default Page