import UserAvatar from "@features/user/components/UserAvatar";
import { Button } from "@shared/components";
import { useUser } from "@shared/hooks";
import React, { useState } from "react";
import { addComment } from "../services/comment.services";

const CreateComment: React.FC<{ videoId: string }> = ({ videoId }) => {
  const { user } = useUser();

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState("");

  const handleCancelOption = () => {
    setCommentContent("");
    setShowOptions(false);
  };

  const handleCreateComment = async () => {
    if (commentContent.trim().length > 0) {
      try {
        await addComment({
          content: commentContent,
          videoId: videoId,
        });
        console.log("Comment added successfully!");
      } finally {
        setCommentContent("");
      }
    }
  };

  if (!user) {
    return;
  }

  return (
    <div className="w-full grid grid-cols-12 gap-2 items-center justify-items-between">
      <div className="user-avatar-container flex flex-col justify-start h-full w-full col-span-2 lg:col-span-1 rounded-full">
        <UserAvatar
          src={user.avatar}
          username={user.username}
          className="w-full h-full"
        />
      </div>
      <div className="create-commment-container w-full col-span-10">
        <div className="comment-input-content-container">
          <textarea
            id="comment-input"
            value={commentContent}
            name="comment-content"
            placeholder="Add a comment..."
            onChange={(e) => setCommentContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setCommentContent(commentContent + "\n");
              }
            }}
            // onFocus={() => setShowOptions(true)}
            className="bg-transparent/25 text-sm sm:text-base outline-none border border-transparent hover:bg-slate-500/50 focus:bg-slate-500/50 focus:border-gray-100 resize-none px-2 py-2 w-full no-scrollbar rounded"
            rows={commentContent.split("\n").length}
            maxLength={400}
          />
        </div>
        <div className="comment-options flex items-center gap-2 justify-end">
          <div className="cancel-option">
            <Button
              className={`w-full text-gray-100 active:translate-y-1 hover:bg-red-600 ${
                showOptions ? "bg-red-600" : "bg-gray-600 "
              }`}
              onClick={handleCancelOption}
            >
              Cancel
            </Button>
          </div>
          <div className="create-comment-opition flex flex-col justify-start">
            <Button
              className={`w-full text-gray-100 active:translate-y-1 hover:bg-blue-600 ${
                showOptions ? "bg-blue-600" : "bg-gray-600 "
              }`}
              onClick={handleCreateComment}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
