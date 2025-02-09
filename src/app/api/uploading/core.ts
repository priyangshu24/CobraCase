// app/api/uploading/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      return { configId: crypto.randomUUID() };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.configId);
      console.log("file url", file.url);
      
      return { serverData: { configId: metadata.configId } };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;