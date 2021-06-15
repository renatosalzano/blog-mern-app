import { useEffect } from "react";
import { usePostState } from "../../hooks/usePostState";
import PostLoading from "../posts/detail/PostLoading";
import PostList from "../posts/PostList";

const Home = ({ user }) => {
  const {
    posts,
    postInfo,
    edit,
    get_posts,
    sumbit_post,
    delete_post,
    update_post,
    toggle_edit_post,
    error,
    loadingPost,
  } = usePostState();

  useEffect(() => {
    console.log("getting post...");
    get_posts();
  }, [get_posts]);

  return (
    <div className="page">
      {loadingPost ? (
        <PostLoading />
      ) : (
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
          server_error={error}
          new_post_button={true}
          content_link={true}
        />
      )}
    </div>
  );
};

export default Home;
