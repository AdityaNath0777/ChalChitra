import { createContext, ReactNode, useContext, useState } from "react";
import { Video } from "../types/video.types";
import { getVideoById } from "../services/video.services";

interface VideoContextProps {
  video: Video | null;
  loading: boolean | null;
  fetchVideoInfo: (videoId: string) => Promise<void>;
}

export const VideoContext = createContext<VideoContextProps | null>(null);

export const VideoProvider: RC.FC<{ children: ReactNode }> = ({ children }) => {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchVideoInfo = async (videoId: string) => {
    setLoading(true);
    getVideoById(videoId)
      .then((res) => setVideo(res.data))
      .finally(() => setLoading(false));
  };

  return (
    <VideoContext.Provider value={{ video, loading, fetchVideoInfo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);

  if (!context) {
    throw new Error("ERR :: useVideo must be used within the Video Provider");
  }

  return context;
};
