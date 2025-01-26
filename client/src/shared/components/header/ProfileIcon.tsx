import { useUser } from "@shared/hooks";
import { Link } from "react-router-dom";

const ProfileIcon = ({userAvatar} : {userAvatar?: string}) => {
  const { user } = useUser();

  return (
    <div className="profile-icon shrink-0 cursor-pointer">
      <Link to={"/profile"}>
        {user?.avatar ? (
          <img
            src={userAvatar ? userAvatar : user.avatar}
            alt={`${user.fullName}'s profile icon`}
            width={"40px"}
            height={"40px"}
            className="rounded-full object-contain aspect-square"
          />
        ) : (
          <i className="text-lg fa-solid fa-user mx-2"></i>
        )}
      </Link>
    </div>
  );
};

export default ProfileIcon;
