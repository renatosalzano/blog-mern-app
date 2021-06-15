import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { Link, useHistory } from "react-router-dom";
import UserPicture from "./UserPicture";
import { RiLogoutBoxRLine } from "react-icons/ri";

const UserButton = ({ user }) => {
  const { log_out } = useContext(AuthContext);
  const history = useHistory();
  const exit = () => {
    history.push("/home");
    log_out();
  };
  return (
    <div className="user_button">
      <UserPicture src={user.pic} is_link={true} user_name={user.user_name} />
      <Link to={`/user/${user.user_name}`}>{user.user_name}</Link>
      <div className="exit_button" onClick={exit}>
        <RiLogoutBoxRLine />
      </div>
    </div>
  );
};

export default UserButton;
