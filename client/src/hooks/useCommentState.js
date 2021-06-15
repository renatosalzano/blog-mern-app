import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { useFinder } from "./useFinder";

export const useCommentState = (init) => {
  const { action } = useAuth();
  const { find } = useFinder();
  const [comments, setComments] = useState(init);
  const [loadingComment, setLoadingComment] = useState(false);

  const [edit, setEdit] = useState("");
  const [error, setError] = useState(false);
  // if comment_list > 1
  const [expand, setExpand] = useState(false);

  const check_error = (res) => {
    switch (res.status) {
      case 200:
        return false;
      case 401:
        console.warn("401 " + res.statusText);
        setError(res.statusText);
        setComments([]);
        return true;
      case 404:
        console.warn("404 " + res.statusText);
        setError(res.statusText);
        setComments([]);
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

  /* 
    NEW COMMENT
  */

  const submit_comment = async (req_obj) => {
    const res = await action({ type: "NEW_COMMENT", req_obj });
    if (check_error(res)) return; // fail
    const _comment_list = [...comments, res.data];
    return sort_comments(_comment_list);
  };

  /* 
    UPDATE COMMENT
  */

  const update_comment = async ({ req_obj, comment_id }) => {
    const res = await action({
      type: "UPDATE_COMMENT",
      req_obj: req_obj,
      target_id: comment_id,
    });
    if (check_error(res)) return false; // => fail
    const _comment_list = comments.map((obj) =>
      obj.comment._id === comment_id ? (obj = res.data) : obj
    );
    sort_comments(_comment_list);
    return true; // => OK
  };

  /* 
    DELETE COMMENT
  */

  const delete_comment = async (comment_id) => {
    const res = await action({ type: "DELETE_COMMENT", target_id: comment_id });

    if (check_error(res)) return; // fail

    const _comment_list = comments.filter(
      (obj) => obj.comment._id !== comment_id
    );
    return sort_comments(_comment_list);
  };

  /* 
   SORT COMMENT
  */

  const sort_comments = useCallback((arr_to_sort) => {
    arr_to_sort.sort((a, b) => {
      return new Date(a.comment.date) - new Date(b.comment.date);
    });
    return setComments(arr_to_sort);
  }, []);

  const toggle_edit_mode = (comment_id) => {
    if (edit) return setEdit((edit) => (edit = ""));
    return setEdit((edit) => (edit = comment_id));
  };

  /* 
    FETCH ALL COMMENT
  */

  const fetch_all_comment = async (post_id) => {
    setLoadingComment(true);
    const res = await find({ type: "FETCH_COMMENT", target: post_id });
    if (check_error(res)) return setLoadingComment(false); // fail
    setLoadingComment(false);
    sort_comments(res.data);
    return setExpand((expand) => !expand);
  };

  useEffect(() => {
    console.log("comment_sorted");
    sort_comments(init);
  }, [sort_comments, init]);

  return {
    comments,
    expand,
    edit,
    error,
    submit_comment,
    update_comment,
    delete_comment,
    toggle_edit_mode,
    fetch_all_comment,
    loadingComment,
  };
};
