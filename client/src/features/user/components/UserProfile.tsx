import { LogoutButton } from "@features/auth/components/";
import { useUser } from "@shared/hooks";
import UpdateUserProfile from "./UpdateUserProfile";
import ChannelCoverImage from "./ChannelCoverImage";
import UserAvatar from "./UserAvatar";

const UserProfile = () => {
  const { user, loading } = useUser();

  console.log("user profile: ", user);

  if (loading) {
    return <div className="loading-componenet">Loading user...</div>;
  }

  return user ? (
    <div className="flex">
      <div className="grow text-center">
        <div className=" w-4/5 max-h-40 mx-auto">
          <ChannelCoverImage src={user.coverImage} />
        </div>
        <div className="grid w-4/5 mx-auto grid-cols-12 gap-4 justify-items-start py-4">
          <div className="col-span-3 sm:col-span-2 mx-auto my-4 ">
            <UserAvatar
              src={user.avatar}
              username={user.username}
              className={"w-full"}
            />
          </div>
          <div className="col-span-9 my-4 sm:col-span-10 text-left">
            <h3 className="text-sm sm:text-base md:text-lg xl:text-3xl main-font">
              {user.fullName}
            </h3>
            <h2 className="text-xs sm:text-sm xl:text-base channel-name">
              @{user.username}
            </h2>
            <h3 className="text-xs sm:text-sm xl:text-base channel-email">
              {user.email}
            </h3>
          </div>
        </div>
        <LogoutButton />
        <UpdateUserProfile />
      </div>
    </div>
  ) : (
    <>User not found</>
  );
};

export default UserProfile;
