import { useLikeHandler } from "../../../hooks/useLikeHandler";
import LikeButton from "../detail/LikeButton";

const LikeContainer = ({ comment }) => {
  const { like, set_like } = useLikeHandler({
    likes: comment.like,
  });

  return (
    <div className="like_container">
      <LikeButton
        like_arr={like}
        onClick={() =>
          set_like({
            target_id: comment._id,
            type: "like",
            target_type: "comment",
          })
        }
      />
    </div>
  );
};

export default LikeContainer;
