import { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LogInPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import SinglePost from "./pages/SinglePost";
import UserPage from "./pages/UserPage";

const Router = () => {
  const {
    user,
    userinfo,
    setUserinfo,
    log_out,
    update_account,
    toggle_edit_mode,
    editMode,
  } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Navbar
        user={user}
        log_out={log_out}
        userinfo={userinfo}
        setUserinfo={setUserinfo}
        toggle_edit_mode={toggle_edit_mode}
      />
      <div className="page_container">
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/login" component={LogInPage} />
          <Route
            path="/home"
            render={(props) => <Home {...props} user={user} />}
          />
          <Route
            path="/post/search/:type/:src"
            render={(props) => <PostPage {...props} user={user} />}
          />
          <Route
            path="/post/:post_id?"
            render={(props) => <SinglePost {...props} user={user} />}
          />
          <Route
            path="/user/:user_name?"
            render={(props) => (
              <UserPage
                {...props}
                user={user}
                setUserinfo={setUserinfo}
                update_account={update_account}
                user_panel={editMode}
                toggle_user_panel={toggle_edit_mode}
              />
            )}
          />
        </Switch>
      </div>
      <footer>@2021 Renato Salzano</footer>
    </BrowserRouter>
  );
};

export default Router;
