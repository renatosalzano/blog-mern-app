import { useCallback, useState } from "react";
import { useAuth } from "../auth/useAuth";

export const useLikeHandler = (target) => {
  const { action } = useAuth();
  const [like, setLike] = useState(target.likes);
  const [dislike, setDislike] = useState(target.dislikes);

  const set_like = useCallback(
    async ({ target_id, target_type, type }) => {
      console.log("set like fired");
      const req_obj = {
        target_id: target_id,
        type: type,
      };
      const res = await action({
        type: "SET_LIKE",
        filter: target_type,
        req_obj: req_obj,
      });
      // --> non autorizzato
      if (res.status !== 200) return console.log("unauthorized");
      if (target_type === "post") {
        setDislike(res.data.dislike);
        return setLike(res.data.like);
      }
      return setLike(res.data.like);
    },
    [action]
  );

  return { like, dislike, set_like };
};
