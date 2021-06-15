import { memo } from "react";
import { Link } from "react-router-dom";
import default_user from "../../asset/default_user.png";

const UserPicture = ({ src, user_name, is_link }) => {
  return (
    <>
      {is_link ? (
        <UserPicWithLink src={src} user_name={user_name} />
      ) : (
        <UserPic src={src} />
      )}
    </>
  );
};

export default memo(UserPicture);

const UserPicWithLink = ({ src, user_name }) => {
  return (
    <Link to={`/user/${user_name}`} className="user_picture">
      <img src={src ? src : default_user} alt="user" />
    </Link>
  );
};

const UserPic = ({ src }) => {
  return (
    <div className="user_picture">
      <img src={src ? src : default_user} alt="user" />
    </div>
  );
};
