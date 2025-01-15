import { useParams } from "react-router-dom";
import UserChannel from "./UserChannel";
import { User } from "@shared/types/user.types";

interface Channel extends User {
  subscribersCount?: number;
  videosCount?: number;
}

const userChannel: Channel = {
  username: "hehe",
  fullName: "He HE",
  _id: "123456",
  email: "mymail.com",
  videosCount: 12,
  subscribersCount: 19,
  avatar:
    "https://res.cloudinary.com/dupwv0jas/image/upload/v1734549352/pye7jxcjxj4yekyzdqrv.png",
  coverImage:
    "https://res.cloudinary.com/dupwv0jas/image/upload/v1734549352/pye7jxcjxj4yekyzdqrv.png",
};

const ChannelProfile = () => {
  const { username } = useParams();
  userChannel.username = username || "hehe";
  return (
    <div className="channel-profile">
      <UserChannel channel={userChannel} />
    </div>
  );
};

export default ChannelProfile;
