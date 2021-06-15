import axios from "axios";
import { useCallback } from "react";

export const useFinder = () => {
  const find = useCallback(async ({ type, target, filter, value }) => {
    let res;
    try {
      switch (type) {
        // POST
        case "GET_POST":
          res = await axios.get(`/post/src/`);
          return res;
        case "SRC_POST":
          return (res = await axios.get(
            `/post/src/?by=${filter}&value=${value}`
          ));
        // COMMENT
        case "FETCH_COMMENT":
          // target = post_id
          return (res = await axios.get(`/comment/${target}`));
        // USER
        case "GET_USER":
          return (res = await axios.get(`/user/src/${target}`));
        default:
          return res;
      }
    } catch (err) {
      console.error(err);
      return (res = err.response);
    }
  }, []);

  return { find };
};
