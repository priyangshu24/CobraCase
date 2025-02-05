/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { cn } from "@/lib/utils"
import { div } from "framer-motion/client";
import { useState } from "react";
import Dropzone, {FileRejection} from "react-dropzone";

const Page = () => {

    const [isDragOver, setIsDragOver] = useState<boolean>(false)

    const onDropRejected = () => {}
    const onDropAccepted = () => {}

    return <div className={cn('relative h-full flex-1 my-16 w-full roinded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center',
        {
          'ring-blue-900/25 bg-blue-900/10': isDragOver,
        }
    )}>
        <div className="relative flex flex-l flex-col items-center justify-center w-full">
            <Dropzone 
                onDropRejected={onDropRejected}
                onDropAccepted={onDropAccepted}
                accept={{'image/png': [], 
                         'image/jpeg': [], 
                         'image/jpg': [], 
                }}
                onDragEnter={() => setIsDragOver(true)}
                onDragLeave={() => setIsDragOver(false)}
                >   
                {({getRootProps , getInputProps}) => (
                    <div className="h-full w-full flex flex-col items-center justify-center" {...getRootProps()}>
                        <input {...getInputProps()} />
                    </div>

                )}
                
            </Dropzone>
        </div>
    </div>
};

export default Page