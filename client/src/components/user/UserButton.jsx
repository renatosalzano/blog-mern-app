import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useHistory } from "react-router-dom";
import UserPicture from "./UserPicture";
import { RiLogoutBoxRLine } from "react-icons/ri";

const UserButton = ({ user }) => {
  const { log_out } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);
  const history = useHistory();

  const toggle_menu = () => {
    setMenu((state) => !state);
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
          history={history}
          log_out_event={log_out_fun}
          trigger_onclick={toggle_menu}
        />
      )}
    </>
  );
};

export default UserButton;

const UserMenu = ({ user, history, log_out_event, trigger_onclick }) => {
  return (
    <>
      <ul className="user_menu">
        <li onClick={() => history.push(`/user/${user.user_name}`)}>
          <UserPicture src={user.pic} is_link={false} />
          <span>{user.user_name}</span>
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
