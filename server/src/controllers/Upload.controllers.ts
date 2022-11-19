import { Request, Response } from "express";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import { config } from "../config/config";

const connect = mongoose.createConnection(config.mongo.url)
let gfs: GridFSBucket;
connect.once('open', () => {
  gfs = new GridFSBucket(connect.db, { bucketName: 'uploads' })
})

const getImage = (req: Request, res: Response) => {
  const { filename } = req.params
  
  gfs.find({ filename }).toArray((err, files) => {
    if (!files) return res.status(404).json({ message: 'File not found' })
    if (err) return res.status(500).json({ message: err.message })
    gfs.openDownloadStreamByName(filename).pipe(res)
  })
}

export default {
  getImage
}