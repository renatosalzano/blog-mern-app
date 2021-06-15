import { useMatchUser } from "../../hooks/useMatchUser";
import UserPicture from "../user/UserPicture";
import CommentList from "./comment/CommentList";
import LikeContainer from "./detail/LikeContainer";
import OptionButton from "../buttons/OptionButton";
import Tags from "./detail/Tags";
import { memo, useEffect } from "react";
import Content from "./detail/Content";

const Post = ({
  user,
  post,
  author,
  comment_list,
  comment_remain,
  option_edit,
  option_delete,
  no_content_slice,
  content_link,
}) => {
  const [matched] = useMatchUser({
    id: user ? user.id : "",
    target_id: post.user_id,
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
    <div className="post_container">
      <div className="post">
        <div className="post_head">
          <UserPicture
            src={author.thumbnail}
            user_name={author.user_name}
            is_link={true}
          />
          <div>
            <strong>{author.user_name}</strong>
            <span className="date">{convert_date(post.date)}</span>
          </div>
          {matched && (
            <OptionButton
              target_name="post"
              target_id={post._id}
              option_delete={option_delete}
              option_edit={option_edit}
            />
          )}
        </div>
        <article className="post_content">
          <h2>{post.title}</h2>
          <Content
            text={post.content}
            post_id={post._id}
            no_content_slice={no_content_slice}
            is_link={content_link}
          />
        </article>
        <Tags tag_arr={post.tags} />
        <LikeContainer post={post} />
      </div>
      <CommentList
        key={post._id}
        post_id={post._id}
        comment_list={comment_list}
        comment_remain={comment_remain}
        user={user}
      />
    </div>
  );
};

export default memo(Post);
