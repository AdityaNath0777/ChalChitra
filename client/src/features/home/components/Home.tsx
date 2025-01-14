import { VideoCardList } from "@features/video/components";
// import VideoPlayer from "@features/video/components/VideoPlayer";
import { useLayout } from "@shared/hooks";

const Home = () => {
  const { showSideBar } = useLayout();

  return (
    <div>
      {/* TODO */}
      {/* <TagList /> such as All, Web development, AI, Music, Mixes, Podcasts, Gamin, Live, Politics*/}
      <div className="grid grid-cols-12 gap-4 justify-items-center items-center">
        <VideoCardList showSideBar={showSideBar} />
        {/* <div className="col-span-12 w-full ">
          <VideoPlayer />
        </div> */}
        {/* <VideoCardList showSideBar={showSideBar} />
        <VideoCardList showSideBar={showSideBar} />
        <VideoCardList showSideBar={showSideBar} /> */}
      </div>
    </div>
  );
};

export default Home;
