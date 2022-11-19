import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Upload from "../models/Upload.models";

export const saveImages = async (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as Express.Multer.File[];
  const file = files[0]
  /* if (files) {
    files.map(async(file) => {
      const image = new Upload({
        _id: new mongoose.Types.ObjectId(),
        data: file.buffer,
        url: `/uploads/${file.filename}`,
        filename: file.filename,
        contentType: file.mimetype
      })
      image.save()
      .then(image => res.status(201).json({ image }))
      .catch(error => res.status(500).json({ error }))
    })
  } */
  
  const image = new Upload({
    _id: new mongoose.Types.ObjectId(),
    //data: file,
    url: `/uploads/${file.filename}`,
    filename: file.filename,
    contentType: file.mimetype
  })
  console.log(image);
  
  image.save()
  .then(image => next())
  .catch(error => res.status(500).json({ error }))

}