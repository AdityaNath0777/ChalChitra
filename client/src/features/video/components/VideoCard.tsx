import { useNavigate } from "react-router-dom";
import { useVideo } from "../hooks/VideoContext";

const VideoCard = ({ videoInfo }) => {
  const {
    _id: videoId,
    videoFile,
    title,
    views,
    timeUploaded = "1 hour",
    thumbnail,
    owner,
  } = videoInfo;

  const navigate = useNavigate();

  const { video, fetchVideoInfo } = useVideo();

  /**
   * @todo validate the `videoFile URL` before opening it to `prevent users` from being redirected to `malicious websites`.
   *     - add view  API request on click
   */
  // const handleThumbnailClick = () => {
  //   const confirmation = confirm(
  //     "redirecting to another page, please confirm..."
  //   );

  //   if (confirmation) {
  //     // for opening in the same tab
  //     // window.location.href = videoFile;

  //     // for opening in new tab
  //     window.open(videoFile, "_blank");
  //     // view + 1  API req
  //   } else {
  //     alert("Redirecting canceled");
  //   }
  // };

  const handleThumbnailClick = () => {
    fetchVideoInfo(videoId);
    console.log("fetching video Info, current video has this data: ", video);
    console.log("Video DB ID: ", videoId);
    console.log("Video cloudingary public ID: ", videoPublicId);

    navigate(`/watch?v=${videoPublicId}`);
  };

  const videoPublicId = String(videoFile).split("/")?.pop()?.split(".")?.[0];

  return (
    <div
      className="text-center cursor-pointer max-w-[20rem] mx-auto sm:max-w-full border border-gray-400 rounded-2xl overflow-clip"
      style={{ aspectRatio: "7/4" }}
    >
      <div
        className="thumbnail-container bg-gray-400/25"
        onClick={handleThumbnailClick}
      >
        <img
          src={`${thumbnail}`}
          className="w-full object-cover"
          alt="hehe"
          style={{ aspectRatio: "16/9" }}
        />
      </div>
      <div className="bottom-container grid grid-cols-12 gap-1 items-center p-1 ">
        <div className="channel-logo max-w-10 xxl:max-w-20 col-span-2">
          <img
            src={`${owner.avatar}`}
            className="w-full bg-black rounded-full object-contain aspect-square"
            alt="hehe"
          />
        </div>
        <div className="grow video-card-details flex flex-col col-span-10">
          <h3 className="text-left font-bold text-sm xxl:text-base video-card-title">
            {title}
          </h3>
          <div className="text-left text-xs hover:underline channel-name xxl:text-sm">
            {owner.username}
          </div>
          <div className="views-time-container flex gap-1 items-center justify-start text-xs xxl:text-sm">
            <div className="views">{views} views</div>
            <div className="dot text-sm xxl:text-base">•</div>
            <div className="view-uploaded-duration">{timeUploaded} ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
