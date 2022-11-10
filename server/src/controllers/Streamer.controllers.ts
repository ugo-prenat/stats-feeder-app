import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Streamer from "../models/Streamer.models";

const createStreamer = (req: Request, res: Response, next: NextFunction) => {
  const { bot, token, twitchId, name, username, profileImageUrl, email } = req.body;
  const streamer = new Streamer({
    _id: new mongoose.Types.ObjectId(),
    bot,
    token,
    twitchId,
    name,
    username,
    profileImageUrl,
    email
  })
  return streamer.save()
  .then(streamer => res.status(201).json({ data: streamer }))
  .catch(error => res.status(500).json({ error }))
}
const getStreamer = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return Streamer.findById(id)
  .populate("bot")
  .then(streamer => streamer ? res.status(200).json({ data: streamer }) : res.status(404).json({ message: "Streamer not found" }))
  .catch(error => res.status(500).json({ error }))
}
const getAllStreamer = (req: Request, res: Response, next: NextFunction) => {
  return Streamer.find()
  .populate("bot")
  .then(streamers => res.status(200).json({ data: streamers }))
  .catch(error => res.status(500).json({ error }))
}
const updateStreamer = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return Streamer.findByIdAndUpdate(id, req.body, { new: true })
  .then(streamer => streamer ? res.status(200).json({ data: streamer }) : res.status(404).json({ message: "Streamer not found" }))
  .catch(error => res.status(500).json({ error }))
}
const deleteStreamer = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return Streamer.findByIdAndDelete(id)
  .then(streamer => streamer ? res.status(200).json({ data: streamer }) : res.status(404).json({ message: "Streamer not found" }))
  .catch(error => res.status(500).json({ error }))
}

export default {
  createStreamer,
  getStreamer,
  getAllStreamer,
  updateStreamer,
  deleteStreamer
}