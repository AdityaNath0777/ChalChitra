import { useEffect, useRef } from "react";
import cloudinary from "cloudinary-video-player";
import "cloudinary-video-player/cld-video-player.min.css";
import { cloudinaryConfig } from "@config/cloudinary.config";

const VideoPlayer: React.FC<{
  id: string;
  publicId: string;
  props?: React.HTMLAttributes<HTMLVideoElement>;
}> = ({ id, publicId, ...props }) => {

  const cloudinaryRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (cloudinaryRef.current) return;

    cloudinaryRef.current = cloudinary;

    const player = cloudinaryRef.current.videoPlayer(playerRef.current, {
      cloud_name: cloudinaryConfig.cloudName,
      secure: true,
      controls: true,
    });
    player.source(publicId);
  }, []);

  return (
    <video
      ref={playerRef}
      id={id}
      className="cld-video-player cld-fluid"
      {...props}
    />
  );
};

export default VideoPlayer;
