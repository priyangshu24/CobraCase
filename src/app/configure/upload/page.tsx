"use client"

import { cn } from "@/lib/utils"
import { Loader2, MousePointerSquareDashed } from "lucide-react"
import { useState } from "react"
import Dropzone from "react-dropzone"


const Page = () => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isUploading] = useState<boolean>(false);
  
  const onDropRejected = () => {}
  const onDropAccepted = () => {
    console.log('accepted')
  }

  return (
    <div className={cn(
      'relative h-[calc(100vh-8rem)] w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center',
      {
        'ring-blue-900/25 bg-blue-900/10': isDragOver,
      }
    )}>
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            'image/png': [],
            'image/jpeg': [],
            'image/jpg': [],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({getRootProps, getInputProps}) => (
  <div 
    className="h-full w-full flex flex-col items-center justify-center cursor-pointer" 
    {...getRootProps()}
  >
    <input {...getInputProps()} />
    {isDragOver ? (
      <MousePointerSquareDashed className="h-12 w-12 text-zinc-500 mb-2" />
    ) : isUploading ? (
      <Loader2 className="h-12 w-12 text-zinc-500 mb-2 animate-spin" />
    ) : (
      <MousePointerSquareDashed className="h-12 w-12 text-zinc-500 mb-2" />
    )}
    <p className="text-gray-500">
      Drag & drop files here, or click to select files
    </p>
  </div>
)}
        </Dropzone>
      </div>
    </div>
  )
}

export default Page