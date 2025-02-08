'use client'

import { Progress } from '@/components/ui/progress'
import { useToast } from '@/components/ui/use-toast'
import { useUploadThing } from '@/lib/uploadingthing'
import { cn } from '@/lib/utils'
import { Image, Loader2, MousePointerSquareDashed } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'

const Page = () => {
  const { toast } = useToast()
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`)
      })
    },
    onUploadProgress(p) {
      setUploadProgress(p)
    },
  })

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles
    setIsDragOver(false)
    toast({
      title: `${file.file.type} type is not supported.`,
      description: "Please choose a PNG, JPG, or JPEG image instead.",
      variant: "destructive"
    })
  }

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined })
    setIsDragOver(false)
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full p-4">
      <div
        className={cn(
          'aspect-square w-full max-w-2xl rounded-xl bg-gray-900/5 p-8 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl',
          {
            'ring-blue-900/25 bg-blue-900/10': isDragOver,
          }
        )}>
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg'],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}>
          {({ getRootProps, getInputProps }) => (
            <div
              className='h-full w-full flex flex-col items-center justify-center'
              {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className='h-12 w-12 text-zinc-500 mb-4' />
              ) : isUploading || isPending ? (
                <Loader2 className='animate-spin h-12 w-12 text-zinc-500 mb-4' />
              ) : (
                <Image className='h-12 w-12 text-zinc-500 mb-4' />
              )}
              <div className='flex flex-col justify-center mb-4 text-base text-zinc-700'>
                {isUploading ? (
                  <div className='flex flex-col items-center'>
                    <p>Uploading...</p>
                    <Progress
                      value={uploadProgress}
                      className='mt-4 w-60 h-2 bg-gray-300'
                    />
                  </div>
                ) : isPending ? (
                  <div className='flex flex-col items-center'>
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className='font-semibold'>Drop file</span> to upload
                  </p>
                ) : (
                  <p>
                    <span className='font-semibold'>Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>

              {isPending ? null : (
                <p className='text-sm text-zinc-500'>PNG, JPG, JPEG</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  )
}

export default Page