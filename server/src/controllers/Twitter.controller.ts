import { Request, Response } from "express";
import { Tclient, TclientV1 } from '../utils/getTClient'

const checkUsername = (req: Request, res: Response) => {
  const { username } = req.body
  
  Tclient.userByUsername(username)
  .then(user => user.data ? res.status(200).json({ message: user }) : res.status(200).json({ message: user}))
  .catch(error => res.status(500).json({ error }))
}

export default {
  checkUsername
}