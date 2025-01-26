import VideoPlayer from "@features/video/components/VideoPlayer";
import { useSearchParams } from "react-router-dom";
import "cloudinary-video-player/cld-video-player.min.css";
import { useVideo } from "@features/video/hooks/VideoContext";
import CommentSection from "@features/comment/components/CommentSection";
// import { useEffect } from "react";
// import { getVideoById } from "@features/video/services/video.services";

const WatchVideoPage = () => {
  const [queryParameters] = useSearchParams();
  const videoPublicId = queryParameters.get("v");

  const { video, loading } = useVideo();

  if (!videoPublicId) {
    return;
  }

  if (!video) return;

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="top-container watch-video-container col-span-12 md:col-start-2 md:col-span-10 xl:col-start-2 xl:col-span-10 w-full">
        <VideoPlayer
          id={"player"}
          publicId={videoPublicId}
          // data-cld-source={`{"info": {"title": ${
          //   videoPublicId === "1" ? "jojo" : ""
          // } }}`}
          data-cld-transformation='{"effect": "blur"}'
          data-cld-poster-options='{"transformation": {"effect": "blur"}}'
        />
      </div>
      <div className="bottom-container p-2 w-full col-span-12 md:col-start-2 md:col-span-10 xl:col-start-2 xl:col-span-10 grid grid-cols-12">
        <div className="col-span-12 sm:col-span-8 w-full"></div>
        <CommentSection videoId={video._id} />
      </div>
    </div>
  );
};

export default WatchVideoPage;
