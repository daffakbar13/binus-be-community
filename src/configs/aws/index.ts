import { S3Client } from '@aws-sdk/client-s3'
import { getEnv } from 'configs/env'
import multerS3 from 'multer-s3'

export const s3 = new S3Client({
  credentials: {
    accessKeyId: 'AKIA2SD5M6DM7AI62JYD',
    secretAccessKey: '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',
  },
  region: 'ap-southeast-1',
})

export const s3Storage = multerS3({
  s3,
  bucket: getEnv('BUCKET_NAME'),
  acl: 'public-read',
  metadata: (_, file, cb) => {
    const { fieldname } = file
    cb(null, { fieldname })
  },
  key: (_, file, cb) => {
    const { originalname } = file
    const fileName = ['Binus Image', Date.now(), originalname].join('_')
    cb(null, fileName)
  },
})
