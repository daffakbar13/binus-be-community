import { s3Storage } from 'configs/aws'
import multer from 'multer'
import path from 'path'

export namespace UploadMiddleware {
  export function sanitizeFile(
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
    fileExts: string[],
  ) {
    const isAllowedExt = fileExts.includes(path.extname(file.originalname.toLowerCase()))

    if (isAllowedExt) {
      return cb(null, true)
    }

    return cb(new Error('Error: File type not allowed!'))
  }

  export function uploadFile(...extensions: string[]) {
    return multer({
      storage: s3Storage,
      fileFilter: (_, file, callback) => {
        sanitizeFile(file, callback, extensions)
      },
      limits: {
        fileSize: 1024 * 1024 * 10, // 2mb
      },
    })
  }
}
