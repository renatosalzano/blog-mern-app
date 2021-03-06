import { useCallback, useEffect } from "react";
import { usePostState } from "../hooks/usePostState";
import { useUserPageState } from "../hooks/useUserPageState";

import PostLoading from "../components/posts/detail/PostLoading";
import PostList from "../components/posts/PostList";
import UserHeader from "../components/user/UserHeader";
import UserPanel from "../components/user/UserPanel";

const UserPage = ({
  match,
  user,
  update_account,
  user_panel,
  toggle_user_panel,
  setUserinfo,
}) => {
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
  const { userInfo, matched } = useUserPageState({
    params: match.params.user_name,
    user_name: user && user.user_name,
  });

  useEffect(() => {
    src_posts("user_name", user_name);
  }, [src_posts, user_name, user]);

  //user info for navbar

  const set_userinfo = useCallback(
    (userinfo, match) => {
      setUserinfo({
        user_name: userinfo.user_name,
        pic: userinfo.pic,
        matched: match,
      });
    },
    [setUserinfo]
  );

  useEffect(() => {
    set_userinfo(userInfo, matched);
  }, [set_userinfo, userInfo, matched]);

  return (
    <div className="page">
      {user_panel && (
        <UserPanel
          update_account={update_account}
          close_event={toggle_user_panel}
        />
      )}
      {userInfo && (
        <UserHeader
          user={matched ? user : userInfo}
          matched={matched}
          settings_event={toggle_user_panel}
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
