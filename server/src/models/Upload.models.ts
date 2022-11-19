import mongoose, { Document, Schema } from "mongoose";

export interface IUpload {
  data: Express.Multer.File;
  url: string;
  filename: string;
  contentType: string;
}

export interface IUploadModel extends IUpload, Document {}

const UploadSchema = new Schema(
  {
    data: { type: Buffer, required: true },
    url: { type: String, required: true },
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default mongoose.model<IUploadModel>("Upload", UploadSchema);