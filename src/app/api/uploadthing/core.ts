import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { z } from 'zod'
import sharp from 'sharp'
import { db } from '@/db'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input

      // Fetch image data
      const res = await fetch(file.url)
      if (!res.ok) {
        throw new Error('Failed to fetch uploaded image')
      }
      
      const buffer = await res.arrayBuffer()

      // Process image metadata
      const imgMetadata = await sharp(buffer).metadata()
      const { width, height } = imgMetadata

      try {
        if (!configId) {
          // Create new configuration
          const configuration = await db.configuration.create({
            data: {
              imageUrl: file.url,
              height: height || 500,
              width: width || 500,
            },
          })

          console.log('Created new config:', configuration.id)
          return { configId: configuration.id }
        } else {
          // Update existing configuration
          const updatedConfiguration = await db.configuration.update({
            where: {
              id: configId,
            },
            data: {
              croppedImageUrl: file.url,
            },
          })

          console.log('Updated config:', updatedConfiguration.id)
          return { configId: updatedConfiguration.id }
        }
      } catch (error) {
        console.error('Database error:', error)
        throw new Error('Failed to save configuration')
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter