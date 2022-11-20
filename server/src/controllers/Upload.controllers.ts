import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { config } from "../config/config";
import { Request, Response } from "express";
import { ACCEPTED_FILE_TYPES } from "../constant";

// Init gridFSBucket
const connect = mongoose.createConnection(config.mongo.url)
let gfs: GridFSBucket;
connect.once('open', () => {
  gfs = new GridFSBucket(connect.db, { bucketName: 'uploads' })
})

const getImage = (req: Request, res: Response) => {
  const { filename } = req.params
  
  gfs.find({ filename }).toArray((err: any, files: any) => {

    if (err) return res.status(400).send(err)
    if (!files[0] || files.length === 0) return res.status(404).send('this file does not exist' )
    
    const isAcceptedFileType = ACCEPTED_FILE_TYPES.some(type => files[0].contentType.includes(type))
    if (isAcceptedFileType) gfs.openDownloadStreamByName(filename).pipe(res)
    else res.status(400).send({ msg: 'Requested file isn\'t an image' })
  })
}

export default {
  getImage
}