import React from "react";

const ChannelCoverImage: React.FC<{
  src: string;
  props?: React.ImgHTMLAttributes<HTMLImageElement>;
}> = ({ src, ...props }) => {
  return (
    <img
      src={src}
      alt={"channel's cover image"}
      className="max-h-40 w-full aspect-video"
      style={{
        objectFit: "cover",
        objectPosition: "0 -2rem",
        borderRadius: "0.7rem",
      }}
      {...props}
    />
  );
};

export default ChannelCoverImage;
