import UserAvatar from "@features/user/components/UserAvatar";
import { Owner } from "@features/user/types/user.types";
import { Button } from "@shared/components";
import { useUser } from "@shared/hooks";
import { useState } from "react";
import { updateComment } from "../services/comment.services";

interface Comment {
  _id: string;
  content: string;
  video: string; // videoId
  owner: Owner; // owner {_id, fullName, username, avatar}
  __v: number;
}

interface CommentCardProps {
  comment: Comment;
  onDelete: (commentId: string) => void;
  // onEdit: (commentId: string, content: string) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onDelete,
  // onEdit
}) => {
  const { user } = useUser();

  const [newContent, setNewContent] = useState<string>(comment.content);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleOnDelete = () => {
    setShowMore(false);

    const confirmation = confirm(
      "Are you sure you want to delete this comment?"
    );

    if (confirmation) {
      onDelete(comment._id);
    }
  };

  const handleOnCancelEdit = () => {
    setShowMore(false);
    setNewContent(comment.content);
  };

  const handleOnEditComment = async () => {
    setShowMore(false);

    const finalContent = newContent.trim();

    if (finalContent.length > 0) {
      try {
        const updateRes = await updateComment(comment._id, newContent);

        if (updateRes.success) {
          console.log("Comment updated successfully!!!");
        }
        comment.content = newContent;
      } catch (err) {
        throw new Error(
          `ERR :: Unable to update the comment ${
            err instanceof Error ? `${err.message}` : "Unknown error"
          }`
        );
      } finally {
        setIsEditing(false);
        setShowMore(false);
      }
    }
  };

  return (
    <div className="comment-card flex gap-2 lg:gap-4 w-full justify-start">
      <div className="left-container w-fit">
        <UserAvatar
          src={comment.owner.avatar}
          username={comment.owner.username}
        />
      </div>
      <div className="right-container w-full">
        <div className="top-right-container flex gap-2 items-baseline">
          <div className="left-container flex w-full gap-2 items-baseline">
            <div className="username hover:underline text-sm sm:text-base cursor-pointer">
              @{comment.owner.username}
            </div>
            <div className="timeStamp text-xs text-slate-300">1 day ago</div>
          </div>
          <div className="right-container flex justify-end">
            <div className="more-options cursor-pointer relative">
              <div className="more-options-icon">
                <i
                  className={`fa-solid p-1 hover:text-gray-400 rounded-md hover:bg-gray-500/40 transition duration-200 ${
                    showMore ? "fa-minus" : "fa-plus"
                  }`}
                  onClick={() => setShowMore((prev) => !prev)}
                  title="more options"
                ></i>
              </div>
              <div
                className={`hidden-container absolute bottom-10 bg-slate-800 px-4 py-2 w-40 rounded-md right-0 ${
                  showMore ? "" : "hidden"
                }`}
              >
                {showMore ? (
                  <div className="more-options-list text-sm sm:text-base">
                    {user?._id === comment.owner._id ? (
                      <>
                        <div
                          className="delete-comment-option cursor-pointer text-red-500 hover:text-red-600 font-semibold active:translate-y-1"
                          onClick={handleOnDelete}
                        >
                          Delete
                        </div>
                        <div
                          className="edit-comment cursor-pointer active:translate-y-1"
                          onClick={() => {
                            setIsEditing((prev) => !prev);
                            setShowMore(false);
                          }}
                        >
                          Edit
                        </div>
                      </>
                    ) : null}
                    <div className="report-comment cursor-pointer">Report</div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="comment-content-container text-sm lg:text-base">
          {isEditing ? (
            <>
              <textarea
                id="comment-input"
                value={newContent}
                name="comment-content"
                defaultValue={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setNewContent(newContent + "\n");
                  }
                }}
                // onFocus={() => setShowOptions(true)}
                className="bg-transparent/25 text-sm sm:text-base outline-none border border-transparent hover:bg-slate-500/50 focus:bg-slate-500/50 focus:border-gray-100 resize-none px-2 py-2 w-full no-scrollbar rounded"
                rows={newContent.split("\n").length}
                maxLength={400}
              />
              <div className="comment-options flex items-center gap-2 justify-end">
                <div className="cancel-option">
                  <Button
                    className={`w-full text-gray-100 active:translate-y-1 bg-red-600 disabled:text-gray-400 disabled:bg-gray-600 disabled:translate-y-0 `}
                    onClick={handleOnCancelEdit}
                    disabled={newContent === comment.content}
                    >
                    Cancel
                  </Button>
                </div>
                <div className="create-comment-opition flex flex-col justify-start">
                  <Button
                    className={`w-full text-gray-100 active:translate-y-1 bg-blue-600 hover:bg-blue-700`}
                    onClick={handleOnEditComment}
                    disabled={newContent.length <= 0 ? true : false}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="comment-content break-words  ">
              {comment.content.split("\n").map((line) => (
                <p>{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
