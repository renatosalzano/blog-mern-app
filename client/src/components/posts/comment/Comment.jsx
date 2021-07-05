import { memo } from "react";
import { useMatchUser } from "../../../hooks/useMatchUser";
import UserPicture from "../../user/UserPicture";
import OptionButton from "../../buttons/OptionButton";
import EditComment from "./EditComment";
import LikeContainer from "./LikeContainer";
import Content from "../detail/Content";

const Comment = ({
  comment,
  author,
  user,
  update_comment,
  option_delete,
  option_edit,
  edit_mode,
}) => {
  const [matched] = useMatchUser({
    id: user ? user.id : "",
    target_id: comment.user_id,
  });

  const convert_date = (date) => {
    let _date = new Date(date);
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return _date.toLocaleDateString("it-IT", options);
  };

  return (
    <div className="comment_container">
      <UserPicture
        src={author.thumbnail}
        user_name={author.user_name}
        is_link={true}
      />
      <div className="comment_content">
        <div className="comment_head">
          <strong>{author.user_name}</strong>
          <span className="date">{convert_date(comment.date)}</span>
          {matched && (
            <OptionButton
              target_name="commento"
              target_id={comment._id}
              option_delete={option_delete}
              option_edit={option_edit}
            />
          )}
        </div>
        {comment._id === edit_mode ? (
          <EditComment
            comment_id={comment._id}
            content={comment.content}
            update_comment={update_comment}
            option_edit={option_edit}
          />
        ) : (
          <Content text={comment.content} maxRow={5} maxLength={250} />
        )}

        {comment._id === edit_mode || <LikeContainer comment={comment} />}
      </div>
    </div>
  );
};

export default memo(Comment);
