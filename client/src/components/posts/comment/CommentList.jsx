import { memo } from "react";
import { useCommentState } from "../../../hooks/useCommentState";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";
import Comment from "./Comment";
import ExpandComment from "./ExpandComment";

const CommentList = ({ user, comment_list, comment_remain, post_id }) => {
  const {
    comments,
    edit,
    expand,
    submit_comment,
    update_comment,
    delete_comment,
    toggle_edit_mode,
    fetch_all_comment,
    loadingComment,
  } = useCommentState(comment_list);

  return (
    <div className="comment_list">
      {comments.map((item) => (
        <Comment
          key={item.comment._id}
          comment={item.comment}
          user={user}
          author={item.author_info}
          update_comment={update_comment}
          option_delete={delete_comment}
          option_edit={toggle_edit_mode}
          edit_mode={edit}
        />
      ))}
      {comment_remain > 0 && !expand && (
        <ExpandComment
          expand_event={fetch_all_comment}
          comment_count={comment_remain}
          post_id={post_id}
          loading={loadingComment}
        />
      )}

      {user ? (
        <AddComment
          user={user}
          post_id={post_id}
          submit_comment={submit_comment}
        />
      ) : (
        <Link to="/login" className="text_right">
          Effettua il login per commentare
        </Link>
      )}
    </div>
  );
};

export default memo(CommentList);
