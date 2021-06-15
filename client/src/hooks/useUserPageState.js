import { useCallback, useEffect, useState } from "react";
import { useFinder } from "./useFinder";
import { useMatchUser } from "./useMatchUser";

export const useUserPageState = (init) => {
  //
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");
  const { find } = useFinder();
  const [matched] = useMatchUser({
    id: init.user_name && init.user_name,
    target_id: init.params,
  });
  const [editMode, setEditMode] = useState(false);

  const check_error = (res) => {
    switch (res.status) {
      case 200:
        return false;
      case 401:
        console.warn("401 " + res.statusText);
        setError(res.statusText);
        return true;
      case 404:
        console.warn("404 " + res.statusText);
        setError(res.statusText);
        return true;
      case 409:
        console.warn("409 " + res.statusText);
        setError(res.statusText);
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

  const get_user = useCallback(
    async (user_name) => {
      const res = await find({ type: "GET_USER", target: user_name });
      if (check_error(res)) return;
      // --> OK
      setUserInfo(res.data.user);
    },
    [find]
  );

  const toggle_edit_mode = () => {
    setEditMode((edit) => !edit);
  };

  useEffect(() => {
    get_user(init.params);
  }, [get_user, init.params]);

  return {
    userInfo,
    matched,
    editMode,
    toggle_edit_mode,
    error,
  };
};
