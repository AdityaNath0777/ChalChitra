import { Button } from "@shared/components";
import ProfileIcon from "@shared/components/header/ProfileIcon";
import React from "react";
import { createTweet } from "../services/tweet.services";

const TweetComposer = ({onAddTweet}: {onAddTweet: () => void}) => {
  const [content, setContent] = React.useState("");
  // const [editing, setEditing] = React.useState(false);

  const handlePostTweet = async () => {
    if (content.trim().length > 0 && content.trim().length <= 400) {
      // setTweetContent(content);
      const res = await createTweet({ content });

      if (res?.success) {
        onAddTweet(); // update tweet list
      }
    } else {
      alert("Please write something within the limits (1-400 characters)");
    }
    setContent("");
  };

  return (
    <div className="tweet-composer col-span-12 sm:col-span-10 sm:col-start-2 lg:col-start-3 lg:col-span-6 mx-auto w-full border flex flex-col gap-2 sm:gap-4 transition-all duration-300 hover:border-blue-400 rounded-md p-4">
      <header className="flex px-2 sm:px-4 py-1 sm:py-2 gap-2">
        <div className="grow-0">
          <ProfileIcon />
        </div>
        <h2 className="grow font-semibold text-lg">Create Tweet</h2>
      </header>

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
            value={content}
            placeholder="Yo, bro! Are you cooking something 🥸?"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // to prevent submission or any other default behaviour
                setContent(content + "\n"); // Add a new line character
              }
            }}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="w-full text-sm lg:text-base resize-none no-scrollbar rounded-md outline-none px-2 sm:px-4 py-1 sm:py-2 bg-slate-400/15"
            maxLength={400}
            rows={
              content.split("\n").length < 20 ? content.split("\n").length : 20
            }
            // style={{
            //   opacity: editing ? 0 : 1,
            //   position: "absolute",
            //   zIndex: editing ? 10 : -1,
            //   pointerEvents: editing ? "auto" : "none",
            // }}
          />
        </label>
      </div>

      <footer className="flex w-full justify-end">
        {/* Post Tweet Button */}
        <div className="flex justify-end gap-3 ">
          <div
            className={`tweet-length-indicator text-sm sm:text-base ${
              content.length >= 380 ? "text-red-500" : ""
            }`}
          >
            {content.length <= 400 ? content.length : 400 - content.length}
            /400
          </div>
          <span className="text-sm sm:text-base pr-1">|</span>
          <Button
            onClick={handlePostTweet}
            className="rounded text-sm lg:text-base hover:bg-blue-700 active:translate-y-1 transition duration-200  bg-blue-600 font-semibold"
          >
            Post
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default React.memo(TweetComposer);
