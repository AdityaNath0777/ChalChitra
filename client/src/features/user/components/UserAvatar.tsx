import React from "react";
import { Link } from "react-router-dom";

const UserAvatar: React.FC<{
  src: string;
  username: string;
  className?: string;
  props?: React.ImgHTMLAttributes<HTMLImageElement>;
}> = ({ src, username, className, ...props }) => {
  return (
    <div className="profile-icon shrink-0 cursor-pointer">
      <Link to={`/channel/@${username}`}>
        {src ? (
          <img
            src={src}
            alt={`${username}'s avatar`}
            width={"40px"}
            height={"40px"}
            className={`rounded-full aspect-square object-cover ${className || ""}`}
            {...props}
          />
        ) : (
          <i className="text-lg fa-solid fa-user mx-2"></i>
        )}
      </Link>
    </div>
  );
};

export default UserAvatar;
