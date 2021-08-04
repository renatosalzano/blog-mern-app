import UserPicture from "./UserPicture";

const UserHeader = ({ user }) => {
  return (
    <div className="user_header">
      <UserPicture src={user.pic} user_name={user.user_name} />

      <div className="head"></div>

      <div className="user_info">
        <span>{user.bio}</span>
      </div>
      <div className="head_color"></div>
    </div>
  );
};

export default UserHeader;
