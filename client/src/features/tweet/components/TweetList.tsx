import TweetBox from "./TweetBox";

interface TweetResponse {
  _id: string;
  content: string;
  owner: string;
  replies: string[];
  createdAt: string;
  updatedAt: string;
  _v: boolean;
}

const TweetList = ({
  tweets,
  onDelete,
}: {
  tweets: TweetResponse[] | null;
  onDelete: (tweetId: string) => void;
}) => {

  return (
    <div className="col-span-12 w-full">
      <div className="grid grid-cols-12 gap-4">
        {tweets?.map((tweet) => (
          <TweetBox tweetData={tweet} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default TweetList;
