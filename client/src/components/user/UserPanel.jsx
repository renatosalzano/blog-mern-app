import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { VscClose } from "react-icons/vsc";
// panel section component
import PublicSection from "./panel/PublicSection";
import AccountSection from "./panel/AccountSection";
import PasswordSection from "./panel/PasswordSection";
import DeleteSection from "./panel/DeleteSection";

const UserPanel = ({ close_event, update_account }) => {
  const { user, clear_error_message } = useContext(AuthContext);
  const { user_name, email, bio, pic } = user;
  return (
    <div className="user_panel_container">
      <div className="user_panel">
        <div className="head">
          <strong>Impostazioni</strong>
          <span className="close_panel_button" onClick={close_event}>
            <VscClose />
          </span>
        </div>
        <div className="scroll_container">
          <Section
            section_class="public_section"
            section_name="Profilo Pubblico"
            is_open={true}
            clear_error_message={clear_error_message}
            component={
              <PublicSection
                update_account={update_account}
                user_bio={bio ? bio : ""}
                user_pic={pic}
              />
            }
          />
          <Section
            section_class="account_section"
            section_name="Account"
            clear_error_message={clear_error_message}
            component={<AccountSection user_name={user_name} email={email} />}
          />
          <Section
            section_class="password_section"
            section_name="Aggiorna Password"
            clear_error_message={clear_error_message}
            component={<PasswordSection />}
          />
          <Section
            section_class="delete_section"
            section_name="Elimina Account"
            clear_error_message={clear_error_message}
            component={<DeleteSection />}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPanel;

const Section = ({
  section_name,
  section_class,
  component,
  is_open,
  clear_error_message,
}) => {
  const [open, setOpen] = useState(is_open ? "open" : "");
  const toggle_open = () => {
    if (open) return setOpen("");
    clear_error_message();
    return setOpen("open");
  };
  return (
    <div className={`section_container ${section_class}`}>
      <div className={`section_head ${open}`} onClick={toggle_open}>
        <strong className="section_name">{section_name}</strong>
      </div>
      {open && component}
    </div>
  );
};
