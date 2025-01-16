import ProfileIcon from "@shared/components/header/ProfileIcon";
import { useUser } from "@shared/hooks";
import { useState } from "react";
import { updateTweet } from "../services/tweet.services";
import { Button } from "@shared/components";

const dummyUser = {
  _id: "123456",
  fullName: "Hiro Heeralal",
  username: "hiro",
  avatar: "",
};

const dummyTweet = {
  content: "Yeh hai mera tweet veere\nAur me bahut kamal dhamaal hu",
  owner: dummyUser,
};

interface TweetResponse {
  _id: string;
  content: string;
  owner: string;
  replies: string[];
  createdAt: string;
  updatedAt: string;
  _v: boolean;
}

const TweetBox = ({
  tweetData,
  onDelete,
}: {
  tweetData: TweetResponse;
  onDelete: (tweetId: string) => void;
}) => {
  const { user } = useUser();
  const [showMore, setShowMore] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetData.content);

  // console.log("tweet data: ", tweetData);

  const resetAllOptions = () => {
    setIsEditing(false);
    setShowMore(false);
  };

  const handleDeleteTweet = async () => {
    resetAllOptions();
    const deleteConfirm = confirm(
      "Are you sure you want to delete this Tweet?"
    );

    if (deleteConfirm) {
      onDelete(tweetData._id);
    }
  };

  const handleEditTweet = async () => {
    resetAllOptions();
    if (tweetData.content === newTweet.trim()) {
      tweetData.content = newTweet.trim();
      console.log("No update needed");
      return;
    }
    const res = await updateTweet({
      content: newTweet.trim(),
      tweetId: tweetData._id,
    });
    if (res?.success) {
      alert("Tweet updated successfully");
    }
  };

  return (
    <div className="w-full col-span-12 sm:col-start-2 sm:col-span-10 lg:col-start-3 lg:col-span-6 mx-auto rounded p-2 sm:p-3 lg:p-4 border border-gray-200 hover:border-blue-400">
      <div className="top-container flex gap-2 sm:gap-3">
        {/* <UserAvatarIcon /> */}
        <div className="left-container">
          <ProfileIcon />
        </div>
        <div className="right-container flex flex-col gap-2 w-full sm:gap-3 lg:gap-4">
          <div className="user-info-container flex justify-between gap-1 sm:gap-2">
            <div className="user-info flex gap-1 sm:gap-2">
              <div className="user-fullName text-xs sm:text-sm lg:text-base xl:text-lg cursor-pointer hover:underline">
                {dummyUser.fullName}
              </div>
              <div className="user-username text-xs sm:text-sm lg:text-base xl:text-lg cursor-pointer hover:underline text-slate-400">
                @{dummyUser.username}
              </div>
            </div>
            <div className="more-options cursor-pointer relative">
              <div
                className={`hidden-container absolute bottom-10 px-4 py-2 bg-slate-800 w-40 rounded-md right-0 ${
                  showMore ? "" : "hidden"
                }`}
              >
                <div className="more-options ">
                  <div
                    className="delete-option text-red-500 active:translate-y-1"
                    onClick={handleDeleteTweet}
                  >
                    {tweetData?.owner === user?._id ? "Delete Tweet" : ""}
                  </div>
                </div>
                <div className="more-option active:translate-y-1">
                  Report Tweet
                </div>
                <div
                  className="more-option edit-tweet-option active:translate-y-1"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Tweet
                </div>
              </div>
              <div className="more-options-icon">
                <i
                  className={`fa-solid p-1 hover:text-blue-400 rounded-md hover:bg-blue-500/20 transition duration-200 ${
                    showMore ? "fa-minus" : "fa-plus"
                  }`}
                  onClick={() => setShowMore((prev) => !prev)}
                  title="more options"
                ></i>
              </div>
            </div>
          </div>

          {isEditing ? (
            <div className="w-full rounded-md">
              <label
                htmlFor="tweet-textarea"
                // onClick={() => setEditing(true)}
                className="cursor-text relative"
              >
                {/* an attempt to make a custom input area just like real twitter  */}
                {/* easy to hai but kaafi kuch implement karna hoga
                
                  like validation, sanitization, shortner (if i ever want to replicate the original completelyt)
                  next line, text-select, cursor movement, etc
                  stop editing when mouse is `clicked` somewhere outside the input area
                */}
                {/* <div className="w-full bg-gray-500/30">
                  {content.split("\n").map((line) => (
                    <p>{line}</p>
                  ))}
                </div> */}
                <textarea
                  id="tweet-textarea"
                  value={newTweet}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // to prevent submission or any other default behaviour
                      setNewTweet(newTweet + "\n"); // Add a new line character
                    }
                  }}
                  onChange={(e) => {
                    setNewTweet(e.target.value);
                  }}
                  className="w-full text-sm lg:text-base resize-none no-scrollbar rounded-md outline-none px-2 sm:px-4 py-1 sm:py-2 bg-slate-400/15"
                  maxLength={400}
                  rows={
                    newTweet.split("\n").length < 20
                      ? newTweet.split("\n").length
                      : 20
                  }
                  // style={{
                  //   opacity: editing ? 0 : 1,
                  //   position: "absolute",
                  //   zIndex: editing ? 10 : -1,
                  //   pointerEvents: editing ? "auto" : "none",
                  // }}
                />
              </label>

              <Button
                type="button"
                onClick={handleEditTweet}
                className={`bg-green-600 text-sm lg:text-base active:translate-y-1`}
              >
                Edit
              </Button>
            </div>
          ) : (
            <div className="tweet-content text-sm lg:text-base w-full">
              {tweetData
                ? tweetData.content.split("\n").map((line) => <p>{line}</p>)
                : dummyTweet.content.split("\n").map((line) => <p>{line}</p>)}
            </div>
          )}
        </div>
      </div>
      {/* for media: images/videos/gifs */}
      <div className="center-container">
        {/* images */}
        {/* videos */}
        {/* gifs */}
      </div>
      <div className="bottom-container tweet-options">
        {/* replies, like, share */}
      </div>
    </div>
  );
};

export default TweetBox;
