import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { useInputText } from "../../../hooks/useInputText";
import InputText from "../../inputs/InputText";

const required_field = { required_field: ["password", "new_password"] };

const PasswordSection = () => {
  const history = useHistory();
  const { update_account, log_out } = useContext(AuthContext);
  const { input, input_handler, clear_error, check_error, error } =
    useInputText({
      password: "",
      new_password: "",
    });

  const update_event = async (evt) => {
    evt.preventDefault();
    if (check_error(required_field)) return; // error
    const req_obj = {
      password: input.password,
      new_password: input.new_password,
    };
    if (update_account({ req_obj: req_obj, filter: "password" })) {
      history.push("/login");
      return log_out();
    }
  };

  return (
    <div className="section">
      <span className="message">Dovrai rieffettuare l'accesso</span>
      <form onSubmit={update_event} className="form_ctrl">
        <InputText
          value={input.password}
          type="password"
          name="password"
          label="Password Corrente:"
          onChange={input_handler}
          onFocus={clear_error}
          error={error.password}
          error_message="obbligatoria"
        />
        <InputText
          value={input.new_password}
          type="password"
          name="new_password"
          label="Nuova Password:"
          onChange={input_handler}
          onFocus={clear_error}
          error={error.new_password}
          error_message="obbligatoria"
        />
        {input.password || input.new_password ? (
          <button type="submit" className="submit_button button">
            Aggiorna la tua password
          </button>
        ) : (
          <span className="idle_button button">Aggiorna la tua password</span>
        )}
      </form>
    </div>
  );
};

export default PasswordSection;
