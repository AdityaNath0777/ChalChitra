import { User } from "@shared/types/user.types";
import ChannelCoverImage from "./ChannelCoverImage";
import ChannelAvatar from "./UserAvatar";

interface Channel extends User {
  subscribersCount?: number;
  videosCount?: number;
}

const UserChannel: React.FC<{ channel: Channel }> = ({ channel }) => {
  return (
    <div className="grid grid-cols-12 gap-2 justify-items-center items-center">
      {/* Display Coverimage if exists */}
      {channel.coverImage ? (
        <div className="cover-image-container col-span-12">
          <ChannelCoverImage src={channel.coverImage} />
        </div>
      ) : null}

      {/* Channel Name, Logo and other info */}
      <div className="channel-middle-container col-start-2 col-span-10 grid grid-cols-12">
        <div className="channel-profile-container col-span-2 rounded-full">
          {/* <div className="channel-logo w-full"> */}
            <ChannelAvatar src={channel.avatar} username={channel.username} className="w-[90%]" />
          {/* </div> */}
        </div>
        <div className="channel-middle-right-container col-span-10">
          <div className="ChannelName text-3xl font-bold">{channel.fullName}</div>
          <div className="miniInfo flex gap-2 justify-start">
            <div className="channel-username text-sm text-gray-300">{channel.username}</div>
            <div className="dot">•</div>
            <div className="channel-subscribers">{channel.subscribersCount ? channel.subscribersCount : 0} subscribers</div>
            <div className="dot">•</div>
            <div className="channel-videos">{channel.videosCount || 0} videos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChannel;
