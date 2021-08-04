import { Link, useLocation } from "react-router-dom";
import { VscHome, VscArrowLeft } from "react-icons/vsc";
import UserButton from "./user/UserButton";
import SettingsButton from "./buttons/SettingsButton";
import SearchBar from "./inputs/SearchBar";
import { useEffect } from "react";

const Navbar = ({ user, userinfo, setUserinfo, toggle_edit_mode }) => {
  let location = useLocation();
  useEffect(() => {
    if (userinfo) {
      let user_name = userinfo.user_name;
      if (location.pathname !== `/user/${user_name}`) {
        setUserinfo(undefined);
      }
    }
  }, [location, userinfo, setUserinfo]);
  return (
    <header className="navbar">
      {userinfo ? (
        <Userbar userinfo={userinfo} toggle_edit_mode={toggle_edit_mode} />
      ) : (
        <Homebar user={user} />
      )}
    </header>
  );
};

export default Navbar;

const Homebar = ({ user }) => {
  return (
    <div className="homebar navbar_cell">
      <Link to="/home" className="home_link">
        <VscHome />
      </Link>
      <SearchBar />
      {user ? (
        <UserButton user={user} />
      ) : (
        <Link to="/login" className="login_link">
          {"Log in"}
        </Link>
      )}
    </div>
  );
};

const Userbar = ({ userinfo, toggle_edit_mode }) => {
  return (
    <div className="userbar navbar_cell">
      <Link to="/home" className="home_link">
        <VscArrowLeft />
      </Link>
      <strong className="user_name">{userinfo.user_name}</strong>
      {userinfo.matched && <SettingsButton onClick={toggle_edit_mode} />}
    </div>
  );
};
