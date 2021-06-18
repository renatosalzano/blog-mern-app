import { memo, useEffect } from "react";
import { usePostState } from "../../hooks/usePostState";
import Post404 from "../posts/detail/Post404";
import PostLoading from "../posts/detail/PostLoading";
import PostList from "../posts/PostList";

const PostPage = ({ match, user }) => {
  const type = match.params.type;
  const src = match.params.src;
  const {
    posts,
    postInfo,
    edit,
    src_posts,
    sumbit_post,
    delete_post,
    update_post,
    toggle_edit_post,
    error,
    loadingPost,
  } = usePostState();

  useEffect(() => {
    src_posts(type, src);
  }, [src_posts, type, src]);

  return (
    <div className="page">
      {loadingPost ? (
        <PostLoading />
      ) : !error ? (
        <PostList
          post_list={posts}
          post_info={postInfo}
          sumbit_post={sumbit_post}
          update_post={update_post}
          delete_post={delete_post}
          user={user}
          matched={true}
          toggle_edit_post={toggle_edit_post}
          edit={edit}
        />
      ) : (
        <Post404 />
      )}
    </div>
  );
};

export default memo(PostPage);
