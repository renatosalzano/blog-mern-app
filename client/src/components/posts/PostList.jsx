import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import AddPostButton from "./detail/AddPostButton";
import NewPost from "./NewPost";
import Post from "./Post";
import UpdatePost from "./UpdatePost";

const PostList = ({
  post_list,
  post_info,
  sumbit_post,
  update_post,
  toggle_edit_post,
  delete_post,
  matched,
  edit,
  server_error,
  no_content_slice,
  new_post_button,
  content_link,
}) => {
  const { user, newPost, setNewPost } = useContext(AuthContext);

  return (
    <>
      {newPost && (
        <NewPost
          user={user}
          sumbit_post={sumbit_post}
          open={setNewPost}
          server_error={server_error}
        />
      )}
      {edit && (
        <UpdatePost
          user={user}
          post={post_info}
          update_post={update_post}
          server_error={server_error}
          toggle_edit_post={toggle_edit_post}
        />
      )}
      <main className="post_list">
        {user && matched && new_post_button && (
          <AddPostButton user={user} setNewPost={setNewPost} />
        )}
        {post_list.length > 0 ? (
          post_list.map((post) => (
            <Post
              key={post.post._id}
              post={post.post}
              author={post.user_info}
              comment_list={post.comment_list}
              comment_remain={post.comment_remain}
              option_delete={delete_post}
              option_edit={toggle_edit_post}
              user={user}
              no_content_slice={no_content_slice}
              content_link={content_link}
            />
          ))
        ) : (
          <span className="no_post">Ancora nessun post...</span>
        )}
      </main>
    </>
  );
};

export default PostList;
