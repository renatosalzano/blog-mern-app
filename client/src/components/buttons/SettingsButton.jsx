import { VscSettings } from "react-icons/vsc";

const SettingsButton = ({ onClick }) => {
  return (
    <div className="settings_button" onClick={onClick}>
      <VscSettings />
    </div>
  );
};

export default SettingsButton;
