import { useEffect } from "react";
import { usePostState } from "../../hooks/usePostState";
import { useUserPageState } from "../../hooks/useUserPageState";
import PostLoading from "../posts/detail/PostLoading";

import PostList from "../posts/PostList";
import UserHeader from "../user/UserHeader";
import UserPanel from "../user/UserPanel";

const UserPage = ({ match, user, update_account }) => {
  const user_name = match.params.user_name;
  // POST USER
  const {
    posts,
    postInfo,
    edit,
    src_posts,
    sumbit_post,
    update_post,
    toggle_edit_post,
    delete_post,
    loadingPost,
  } = usePostState();
  // USER INFO
  const { userInfo, editMode, matched, toggle_edit_mode } = useUserPageState({
    params: match.params.user_name,
    user_name: user && user.user_name,
  });

  useEffect(() => {
    src_posts("user_name", user_name);
  }, [src_posts, user_name, user]);

  return (
    <div className="page">
      {editMode && (
        <UserPanel
          update_account={update_account}
          close_event={toggle_edit_mode}
        />
      )}
      {userInfo && (
        <UserHeader
          user={matched ? user : userInfo}
          matched={matched}
          settings_event={toggle_edit_mode}
        />
      )}

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
          matched={matched}
          toggle_edit_post={toggle_edit_post}
          edit={edit}
          new_post_button={true}
        />
      )}
    </div>
  );
};

export default UserPage;
