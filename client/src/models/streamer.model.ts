export interface IStreamer {
  _id: string;
  bot: string;
  token: string;
  twitchId: Number;
  name: string;
  username: string;
  profileImageUrl: string;
  email: string;
  isAuth: boolean;
}
export interface IAPIStreamer extends IStreamer {
  createdAt: string;
  updatedAt: string;
}