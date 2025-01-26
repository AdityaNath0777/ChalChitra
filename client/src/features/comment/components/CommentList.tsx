import React, { useCallback, useEffect, useState } from "react";
import { deleteComment, getVideoComments } from "../services/comment.services";
import CommentCard from "./CommentCard";
import { Owner } from "@features/user/types/user.types";

interface Comment {
  _id: string;
  content: string;
  video: string; // videoId
  owner: Owner; // owner {_id, fullName, username, avatar}
  __v: number;
}

const CommentList: React.FC<{ videoId: string }> = ({ videoId }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  const fetchComments = useCallback(async (videoId: string) => {
    try {
      const videoComments = await getVideoComments(videoId);
      console.log("Fecthed video comments: ", videoComments);
      setComments(videoComments.data.docs);
    } catch (error) {
      throw new Error(
        `Err while fetching video comments ${
          error instanceof Error ? `:: ${error.message}` : "Unknown Error"
        }`
      );
    } finally {
      setLoadMore(false);
    }
  }, []);

  useEffect(() => {
    if (!comments || loadMore) fetchComments(videoId);
  }, [comments, loadMore, videoId, fetchComments]);

  const handleDeleteComment = async (commentId: string) => {
    try {
      const onDelRes = await deleteComment(commentId);

      console.log("on del res: ", onDelRes);

      if (onDelRes.success) {
        if (comments) {
          setComments((prev) =>
            prev.filter((comment) => {
              console.log(comment);
              return comment._id !== commentId;
            })
          );
        }
      } else {
        alert("Unable to delete comment");
      }
    } catch (error) {
      console.error(
        `error in comment list : ${
          error instanceof Error ? error.message : "Unkown error"
        }`
      );
    }
  };

  if (!comments) return;

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
      {comments.map((comment) => (
        <div
          className="w-full border-b pb-2 rounded border-b-gray-200"
          key={`comment-${comment._id}`}
        >
          <CommentCard onDelete={handleDeleteComment} comment={comment} />
        </div>
      ))}
      {
        <button
          type="button"
          className="px-3 py-2 font-semibold text-base"
          onClick={() => setLoadMore(true)}
        >
          {loadMore ? "Loading..." : "Load More"}
        </button>
      }
    </div>
  );
};

export default CommentList;
