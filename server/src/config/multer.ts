import { Request } from 'express'
import { config } from './config'
import multer, { FileFilterCallback } from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'

const storage = new GridFsStorage({
  url: config.mongo.url,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: () => {
    return { bucketName: 'uploads' }
  }
})

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  )
    callback(null, true)
  else callback(null, false)
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000 }
})
