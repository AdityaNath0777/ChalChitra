import { LogoutButton } from "@features/auth/components/";
import { useUser } from "@shared/hooks";
import UpdateUserProfile from "./UpdateUserProfile";

const UserProfile = () => {
  const { user } = useUser();

  console.log("user profile: ", user);

  return user ? (
    <div className="flex">
      <div className="grow text-center">
        <div className=" w-4/5 max-h-40 mx-auto">
          <img
            src={user.coverImage}
            className="max-h-40 w-full"
            style={{
              objectFit: "cover",
              objectPosition: "0 -2rem",
              borderRadius: "0.7rem",
            }}
            alt="user cover image"
          />
        </div>
        <div className="grid w-4/5 mx-auto grid-cols-6 gap-4 justify-items-start py-4">
          <div className="col-span-1 mx-auto my-4 ">
            <img
              src={user.avatar}
              style={{ borderRadius: "50%" }}
              alt="user avatar"
              className="aspect-square "
            />
          </div>
          <div className="my-4 col-span-5 text-left">
            <h3 className="text-3xl main-font">{user.fullName}</h3>
            {user.username && (
              <h2 className="text-base channel-name">@{user.username}</h2>
            )}
            <h3>{user.email}</h3>
            {!user.username && <p> Something went wrong</p>}
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
