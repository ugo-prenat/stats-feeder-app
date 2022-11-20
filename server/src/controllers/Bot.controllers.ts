import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Bot from "../models/Bot.models";

const createBot = (req: Request, res: Response, next: NextFunction) => {
  const { name, username } = req.query;
  const files = req.files as Express.Multer.File[];
  
  const bot = new Bot({
    _id: new mongoose.Types.ObjectId(),
    name,
    username,
    profileImageUrl: `/uploads/${files[0]?.filename}`,
    status: "pending",
  })
  return bot.save()
  .then(bot => res.status(201).json({ bot }))
  .catch(error => res.status(500).json({ error }))
}
const getBot = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return Bot.findById(id)
  .populate("streamer")
  .then(bot => bot ? res.status(200).json({ bot }) : res.status(404).json({ message: "Bot not found" }))
  .catch(error => res.status(500).json({ error }))
}
const getAllBot = (req: Request, res: Response, next: NextFunction) => {
  return Bot.find()
  .populate("streamer")
  .then(bots => res.status(200).json({ bots }))
  .catch(error => res.status(500).json({ error }))
}
const updateBot = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return Bot.findByIdAndUpdate(id, req.body, { new: true })
  .then(bot => bot ? res.status(200).json({ bot }) : res.status(404).json({ message: "Bot not found" }))
  .catch(error => res.status(500).json({ error }))
}
const deleteBot = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return Bot.findByIdAndDelete(id)
  .then(bot => bot ? res.status(200).json({ bot }) : res.status(404).json({ message: "Bot not found" }))
  .catch(error => res.status(500).json({ error }))
}

export default {
  createBot,
  getBot,
  getAllBot,
  updateBot,
  deleteBot
}