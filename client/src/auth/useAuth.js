import axios from "axios";
import { useCallback } from "react";

export const useAuth = () => {
  const auth = useCallback(async ({ type, filter, req_obj, password }) => {
    let res = { status: null };
    try {
      switch (type) {
        case "LOG_IN":
          return (res = await axios.post(`/auth/login`, req_obj));
        case "GET_LOGGED":
          return (res = await axios.get("/auth/user/info"));
        case "LOG_OUT":
          return (res = await axios.get("/auth/logout"));
        case "SIGN_UP":
          return (res = await axios.post("/auth/register", req_obj));
        case "UPLOAD_PIC":
          /* req_obj = { image: base64string } */
          return (res = await axios.post("/auth/user/upload", req_obj));
        /* res = "image_link" */
        case "UPDATE_USER":
          /* 
          filter = "public" || "account" || "password"
          req_obj =>
            ( public ) = { pic : string, bio : string }
            ( account ) = { email : string, user_name : string }
            *( password ) = { old_passwor : string, new_password : string }
            * = all field required
        */
          return (res = await axios.patch(`/auth/user/${filter}`, req_obj));
        case "DELETE_ACCOUNT":
          return (res = await axios.delete(`/auth/user/delete/${password}`));
        default:
          return res;
      }
    } catch (err) {
      return (res = err.response);
    }
  }, []);

  const action = useCallback(async ({ type, filter, req_obj, target_id }) => {
    let res;
    try {
      switch (type) {
        case "NEW_POST":
          return (res = await axios.post("/auth/post/new", req_obj));
        case "UPDATE_POST":
          /*
          target_id = post_id 
          req_obj = { title: string, content : string, tags: [ "tag", ... ] }
          */
          return (res = await axios.patch(
            `/auth/post/update/${target_id}`,
            req_obj
          ));
        /* 
          res = { ... }
          */
        case "DELETE_POST":
          return (res = await axios.delete(`/auth/post/remove/${target_id}`));
        case "NEW_COMMENT":
          return (res = await axios.post("/auth/comment", req_obj));
        case "UPDATE_COMMENT":
          /*
          target_id = comment_id 
          req_obj = { content : string }
          */
          return (res = await axios.patch(
            `/auth/comment/update/${target_id}`,
            req_obj
          ));
        /* 
          res = { comment: { ... }, author_info : { ... } }
          */
        case "DELETE_COMMENT":
          /* 
          target_id = comment_id
          */
          return (res = await axios.delete(
            `/auth/comment/remove/${target_id}`
          ));
        case "SET_LIKE":
          /* 
          filter = "post" || "comment"
          req_obj =>
          ( post ) = { target_id : post_id, type : "up" || "down" }
          ( comment ) = { target_id : comment_id, type : "up" }
          */
          return (res = await axios.patch(`/auth/${filter}/like`, req_obj));
        /* 
          res =>
          ( post ) = { like : [ "user_id", ... ], dislike : [ "user_id", ... ] }
          ( comment ) = { like : [ "user_id", ... ] }
          */
        default:
          return res;
      }
    } catch (err) {
      console.error(err);
      return (res = err.response);
    }
  }, []);

  return { auth, action };
};
