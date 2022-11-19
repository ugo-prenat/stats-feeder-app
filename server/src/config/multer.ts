import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import path from 'path';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void
type MulterFile = Express.Multer.File

const storage = multer.diskStorage({
  destination: (req: Request, file: MulterFile, callback: DestinationCallback) => {
    callback(null, path.join(__dirname, '../uploads'))
  },

  filename: (req: Request, file: MulterFile, callback: FileNameCallback) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-')
    callback(null, `${Date.now()}-${encodeURI(fileName)}`)
  }
})

const fileFilter = (req: Request, file: MulterFile, callback: FileFilterCallback): void => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
    callback(null, true)
  else
    callback(null, false)
}

export const upload = multer({
  storage,
  fileFilter,
  limits : { fileSize : 1000000 }
})