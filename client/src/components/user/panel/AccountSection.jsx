import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { useInputText } from "../../../hooks/useInputText";
import InputText from "../../inputs/InputText";

const AccountSection = ({ user_name, email }) => {
  const history = useHistory();
  const { update_account, log_out, errorMessage } = useContext(AuthContext);
  const { input, input_handler, clear_error } = useInputText({
    user_name: "",
    email: "",
  });

  const update_event = async (evt) => {
    evt.preventDefault();

    if (!input.user_name && !input.email) return; // nothing
    let req_obj = { user_name: input.user_name, email: input.email };
    if (!input.email) {
      req_obj = { user_name: input.user_name };
    }
    if (!input.user_name) {
      req_obj = { email: input.email };
    }
    if (await update_account({ req_obj: req_obj, filter: "account" })) {
      history.push("/home");
      return log_out();
    } else {
      return;
    }
  };

  return (
    <div className="section">
      <span className="message">Dovrai rieffettuare l'accesso</span>
      {errorMessage && <span className="message">{errorMessage}</span>}
      <form className="form_ctrl" onSubmit={update_event}>
        <InputText
          value={input.user_name}
          type="text"
          name="user_name"
          label="Nome Utente:"
          onFocus={clear_error}
          onBlur={clear_error}
          onChange={input_handler}
          placeholder={user_name}
        />

        <InputText
          value={input.email}
          type="email"
          name="email"
          label="Email:"
          onFocus={clear_error}
          onBlur={clear_error}
          onChange={input_handler}
          placeholder={email}
        />
        {input.user_name || input.email ? (
          <button className="submit_button button" type="submit">
            Aggiorna Account
          </button>
        ) : (
          <span className="idle_button button">Aggiorna Account</span>
        )}
      </form>
    </div>
  );
};

export default AccountSection;
