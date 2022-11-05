import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Tweet from "../models/Tweet.models";

const createTweet = (req: Request, res: Response, next: NextFunction) => {
  const { bot, content } = req.body;
  const tweet = new Tweet({
    _id: new mongoose.Types.ObjectId(),
    bot,
    content,
    twitterUrl: '',
  })
  return tweet.save()
  .then(tweet => res.status(201).json({ tweet }))
  .catch(error => res.status(500).json({ error }))
}
const getTweet = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return Tweet.findById(id)
  .populate("bot")
  .then(tweet => tweet ? res.status(200).json({ tweet }) : res.status(404).json({ message: "Tweet not found" }))
  .catch(error => res.status(500).json({ error }))
}
const getAllTweet = (req: Request, res: Response, next: NextFunction) => {
  return Tweet.find()
  .populate("bot")
  .then(tweets => res.status(200).json({ tweets }))
  .catch(error => res.status(500).json({ error }))
}
const updateTweet = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return Tweet.findByIdAndUpdate(id, req.body, { new: true })
  .then(tweet => tweet ? res.status(200).json({ tweet }) : res.status(404).json({ message: "Tweet not found" }))
  .catch(error => res.status(500).json({ error }))
}
const deleteTweet = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return Tweet.findByIdAndDelete(id)
  .then(tweet => tweet ? res.status(200).json({ tweet }) : res.status(404).json({ message: "Tweet not found" }))
  .catch(error => res.status(500).json({ error }))
}

export default {
  createTweet,
  getTweet,
  getAllTweet,
  updateTweet,
  deleteTweet
}