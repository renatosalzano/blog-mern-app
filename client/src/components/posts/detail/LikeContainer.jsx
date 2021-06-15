import { useLikeHandler } from "../../../hooks/useLikeHandler";
import DislikeButton from "./DislikeButton";
import LikeButton from "./LikeButton";

const LikeContainer = ({ post }) => {
  const { like, dislike, set_like } = useLikeHandler({
    likes: post.like,
    dislikes: post.dislike,
  });
  return (
    <div className="like_container">
      <LikeButton
        like_arr={like}
        onClick={() =>
          set_like({
            target_id: post._id,
            type: "like",
            target_type: "post",
          })
        }
      />
      <DislikeButton
        dislike_arr={dislike}
        onClick={() =>
          set_like({
            target_id: post._id,
            type: "dislike",
            target_type: "post",
          })
        }
      />
    </div>
  );
};

export default LikeContainer;
