import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { getAllVideos } from "../services/video.services";
import { Video } from "../types/video.types";

const VideoCardList = ({ showSideBar }: { showSideBar: boolean }) => {
  const showSideBarGridClass =
    "xl:col-span-4 lg:col-span-4 md:col-start-3 md:col-span-8 sm:col-start-2 sm:col-span-10";
  const hideSideBarGridClass =
    "xl:col-span-3 lg:col-span-3  md:col-span-6 sm:col-start-3 sm:col-span-8";

  const [videoList, setVideoList] = useState<Video[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        const res = await getAllVideos();
        setVideoList(res.data.docs);
        console.log("fetched videos: ", res.data.docs);
      } catch (error) {
        throw new Error(error.message);
      } finally {
        console.log("loading videos false");
        setLoading(false);
      }
    };

    if (!videoList) {
      console.log("fetching videos....");
      setLoading(true);
      fetchAllVideos();
    }
  }, []);

  if(loading) {
    return (
      <h1 className="col-span-12 text-left w-full">Loading videos...</h1>
    )
  }

  return videoList ? (
    <>
      {videoList?.map((data, index) => (
        <div
          className={`${
            showSideBar ? showSideBarGridClass : hideSideBarGridClass
          } col-span-12 w-full justify-self-center self-start hover:scale-105 transition duration-200`}
          key={`video-card-${index}`}
        >
          <VideoCard videoInfo={data} />
        </div>
      ))}
    </>
  ) : null;
};

export default VideoCardList;
