import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { useFinder } from "./useFinder";

export const usePostState = () => {
  const { action } = useAuth();
  const { find } = useFinder();
  const [posts, setPosts] = useState([]);
  const [postInfo, setPostInfo] = useState(null);
  const [edit, setEdit] = useState("");
  const [error, setError] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);

  const check_error = (res) => {
    switch (res.status) {
      case 200:
        return false;
      case 401:
        console.warn("401 " + res.statusText);
        setError(res.statusText);
        setPosts([]);
        return true;
      case 404:
        console.warn("404 " + res.statusText);
        setError(res.statusText);
        setPosts([]);
        return true;
      case 500:
        console.warn("500 " + res.statusText);
        setError(res.statusText);
        return true;
      default:
        console.warn("An unexpected error has occurred");
        setError("An unexpected error has occurred");
        return true;
    }
  };

  const get_posts = useCallback(async () => {
    setLoadingPost(true);
    setError("");
    const res = await find({ type: "GET_POST" });
    if (check_error(res)) return setLoadingPost(false);
    setLoadingPost(false);
    return setPosts(res.data);
  }, [find]);

  const src_posts = useCallback(
    async (filter, value) => {
      setLoadingPost(true);
      setError("");
      const res = await find({
        type: "SRC_POST",
        filter: filter,
        value: value,
      });
      if (check_error(res)) return setLoadingPost(false);
      setLoadingPost(false);
      return setPosts(res.data);
    },
    [find]
  );

  const sumbit_post = async (req_obj) => {
    const res = await action({ type: "NEW_POST", req_obj: req_obj });

    if (check_error(res)) return false; // server error
    const updated_posts = [...posts, res.data];
    setPosts((post) => (post = updated_posts));
    return true;
  };

  const delete_post = async (post_id) => {
    const res = await action({ type: "DELETE_POST", target_id: post_id });
    if (check_error(res)) return; // server error
    // --> OK
    const updated_posts = posts.filter((obj) => obj.post._id !== post_id);
    return setPosts((post) => (post = updated_posts));
  };

  const update_post = async ({ post_id, req_obj }) => {
    const res = await action({
      type: "UPDATE_POST",
      target_id: post_id,
      req_obj: req_obj,
    });
    if (check_error(res)) return false; // server error
    const _post = posts.filter((obj) => obj.post._id === post_id);
    const updated_post = {
      post: res.data,
      comment_list: _post[0].comment_list,
      user_info: _post[0].user_info,
    };
    setPosts(
      posts.map((obj) =>
        obj.post._id === post_id ? (obj = updated_post) : obj
      )
    );

    return true; // => OK
  };

  const sort_posts = useCallback((arr_to_sort) => {
    arr_to_sort.sort((a, b) => {
      return new Date(a.post.date) - new Date(b.post.date);
    });
    return setPosts(arr_to_sort);
  }, []);

  const toggle_edit_post = (post_id) => {
    if (edit) {
      setEdit("");
      return setPostInfo(null);
    }
    const _post = posts.filter((obj) => obj.post._id === post_id);
    setPostInfo((post) => (post = _post[0].post));

    return setEdit((edit) => (edit = post_id));
  };

  useEffect(() => {
    console.log("post sorted...");
    sort_posts(posts);
  }, [posts, sort_posts]);

  return {
    posts,
    postInfo,
    edit,
    get_posts,
    src_posts,
    sumbit_post,
    update_post,
    sort_posts,
    delete_post,
    toggle_edit_post,
    error,
    loadingPost,
  };
};
