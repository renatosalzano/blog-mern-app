import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useHistory, useLocation } from "react-router-dom";
import UserPicture from "./UserPicture";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GoLightBulb } from "react-icons/go";

const UserButton = ({ user }) => {
  const { log_out, switch_theme, theme } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const toggle_menu = () => {
    setMenu((state) => !state);
  };

  const go_to_user_page = () => {
    if (location.pathname === `/user/${user.user_name}`) return setMenu(false);
    history.push(`/user/${user.user_name}`);
    return setMenu(false);
  };

  const switch_theme_fun = () => {
    switch_theme();
    return setMenu(false);
  };
  const log_out_fun = () => {
    history.push("/home");
    log_out();
  };
  return (
    <>
      <div className="user_button" onClick={toggle_menu}>
        <UserPicture src={user.pic} is_link={false} />
      </div>
      {menu && (
        <UserMenu
          user={user}
          user_page_event={go_to_user_page}
          theme_switch_event={switch_theme_fun}
          log_out_event={log_out_fun}
          trigger_onclick={toggle_menu}
          theme={theme}
        />
      )}
    </>
  );
};

export default UserButton;

const UserMenu = ({
  user,
  user_page_event,
  log_out_event,
  theme_switch_event,
  trigger_onclick,
  theme,
}) => {
  return (
    <>
      <ul className="user_menu">
        <li onClick={user_page_event}>
          <UserPicture src={user.pic} is_link={false} />
          <span>{user.user_name}</span>
        </li>
        <li onClick={theme_switch_event}>
          <div className="theme_icon">
            <GoLightBulb />
          </div>
          <span>{theme} Mode</span>
        </li>
        <li onClick={log_out_event}>
          <div className="logout_icon">
            <RiLogoutBoxRLine />
          </div>
          <span>Logout</span>
        </li>
      </ul>
      <div className="trigger" onClick={trigger_onclick}></div>
    </>
  );
};
