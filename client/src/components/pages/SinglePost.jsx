import { useEffect } from "react";
import { usePostState } from "../../hooks/usePostState";
import Post404 from "../posts/detail/Post404";
import PostLoading from "../posts/detail/PostLoading";
import PostList from "../posts/PostList";

const SinglePost = ({ user, match }) => {
  const {
    posts,
    postInfo,
    edit,
    src_posts,
    update_post,
    toggle_edit_post,
    delete_post,
    error,
    loadingPost,
  } = usePostState();

  useEffect(() => {
    src_posts("_id", match.params.post_id);
  }, [src_posts, match]);
  return (
    <div className="page">
      {loadingPost ? (
        <PostLoading />
      ) : posts.length > 0 ? (
        <PostList
          post_list={posts}
          post_info={postInfo}
          update_post={update_post}
          delete_post={delete_post}
          user={user}
          matched={true}
          toggle_edit_post={toggle_edit_post}
          edit={edit}
          server_error={error}
          no_content_slice={true}
          new_post_button={false}
        />
      ) : (
        !loadingPost && <Post404 />
      )}
    </div>
  );
};

export default SinglePost;
