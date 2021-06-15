import { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import LoginPage from "./components/pages/LoginPage";
import PostPage from "./components/pages/PostPage";
import SinglePost from "./components/pages/SinglePost";
import UserPage from "./components/pages/UserPage";

const Router = () => {
  const { user, log_out, update_account } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Navbar user={user} log_out={log_out} />
      <div className="page_container">
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/login" component={LoginPage} />
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
                update_account={update_account}
              />
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Router;
