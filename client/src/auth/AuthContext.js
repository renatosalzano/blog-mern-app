import { createContext, useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [signUp, setSignUp] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { auth } = useAuth();

  const check_error = (res) => {
    switch (res.status) {
      case 200:
        return false;
      case 400:
        console.warn("400 " + res.statusText);
        console.log(res);
        setErrorMessage(res.data.error_message);
        return true;
      case 401:
        console.warn("401 " + res.statusText);
        setUser(undefined);
        return true;
      case 403:
        console.warn("409 " + res.statusText);
        setErrorMessage(res.data.error_message);
        setUser(undefined);
        return true;
      case 409:
        console.warn("404 " + res.statusText);
        setErrorMessage(res.data.error_message);
        setUser(undefined);
        return true;
      case 500:
        console.warn("500 " + res.statusText);
        setErrorMessage(res.statusText);
        return true;
      default:
        console.warn("An unexpected error has occurred");
        setErrorMessage("An unexpected error has occurred");
        return true;
    }
  };

  const clear_error_message = useCallback(() => {
    return setErrorMessage("");
  }, []);

  const log_in = async (req_obj) => {
    /* 
      req_obj = { user_name : string , password : string }
    */
    const res = await auth({ type: "LOG_IN", req_obj: req_obj });
    if (check_error(res)) return false; // => log in fail
    setUser((user) => (user = res.data.user_info));
    return true; // => log in success
  };

  const get_logged = useCallback(async () => {
    const res = await auth({ type: "GET_LOGGED" });

    if (check_error(res)) return; // token miss
    return setUser((user) => (user = res.data.user_info)); // => token OK
  }, [auth]);

  const update_account = async ({ filter, req_obj }) => {
    const res = await auth({
      type: "UPDATE_USER",
      filter: filter,
      req_obj: req_obj,
    });

    if (check_error(res)) return false; // => update fail
    if (filter !== "public") {
      return true; // => update success, login required
    }
    setUser((user) => (user = res.data.user_info)); // => OK
    return true; // => update success
  };

  const sign_up = async (req_obj) => {
    const res = await auth({ type: "SIGN_UP", req_obj: req_obj });
    if (check_error(res)) return false; // sign up fail
    return true; // sign up success
  };

  const log_out = async () => {
    await auth({ type: "LOG_OUT" });
    setUser(undefined);
  };

  const delete_account = async (string) => {
    const res = await auth({ type: "DELETE_ACCOUNT", password: string });
    if (check_error(res)) return false; // delete fail
    return true; // delete success
  };

  const toggle_edit_mode = () => {
    setEditMode((edit) => !edit);
  };

  useEffect(() => {
    let layout = document.querySelector(".layout");
    layout.style.overflowY = editMode ? "hidden" : "auto";
  }, [editMode]);

  useEffect(() => {
    get_logged();
  }, [get_logged]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        update_account,
        delete_account,
        sign_up,
        log_in,
        log_out,
        newPost,
        setNewPost,
        signUp,
        setSignUp,
        clear_error_message,
        errorMessage,
        toggle_edit_mode,
        editMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
