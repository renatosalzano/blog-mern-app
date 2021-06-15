import SettingsButton from "../buttons/SettingsButton";
import UserPicture from "./UserPicture";

const UserHeader = ({ user, matched, settings_event }) => {
  return (
    <div className="user_header">
      <UserPicture src={user.pic} user_name={user.user_name} />

      <div className="head">
        <strong>{user.user_name}</strong>

        {matched && <SettingsButton onClick={settings_event} />}
      </div>

      <div className="user_info">
        <span>{user.bio}</span>
      </div>
      <div className="head_color"></div>
    </div>
  );
};

export default UserHeader;
