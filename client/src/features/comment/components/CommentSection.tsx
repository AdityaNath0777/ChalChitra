import CommentList from "./CommentList";
import CreateComment from "./CreateComment";

const CommentSection: React.FC<{ videoId: string }> = ({ videoId }) => {
  return (
    <div className="comment-section-container px-4 py-2 col-span-12 sm:col-span-8 rounded-md bg-slate-600">
      <CreateComment videoId={videoId} />
      <CommentList videoId={videoId} />
    </div>
  );
};

export default CommentSection;
