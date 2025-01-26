import { useUser } from "@shared/hooks";
import TweetComposer from "./TweetComposer";
import TweetList from "./TweetList";
import { useFetchTweets } from "../hooks/useFetchTweets";
import { deleteTweet } from "../services/tweet.services";

const TweetPage = () => {
  const { user } = useUser();

  const userId = String(user?._id);
  const { tweets, removeTweet, updateTweetList } =
    useFetchTweets(userId);

  const handleDeleteTweet = async (tweetId: string) => {
    const res = await deleteTweet(tweetId);
    console.log("delete tweet handler Res: ", res);
    if (res?.success) {
      removeTweet(tweetId);
      alert("Tweet delete successfully");
    } else {
      alert("Unable to delete Tweet");
    }
  };

  if (!user) {
    return <>user not found</>;
  }

  return (
    <div className="">
      <div className="grid grid-cols-12 gap-4 justify-items-center items-center">
        <TweetComposer onAddTweet={updateTweetList} />
        {/* <TweetBox  /> */}
        <TweetList tweets={tweets} onDelete={handleDeleteTweet} />
      </div>
    </div>
  );
};

export default TweetPage;
