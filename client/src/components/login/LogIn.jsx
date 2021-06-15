import { useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { useInputText } from "../../hooks/useInputText";
import InputText from "../inputs/InputText";

const initInput = {
  email: "",
  password: "",
};

const LogIn = ({ setSignUp }) => {
  const history = useHistory();
  const effectRef = useRef(false);
  const { user, log_in, errorMessage } = useContext(AuthContext);
  const {
    input,
    setInput,
    input_handler,
    check_error,
    clear_error,
    check_empty_field,
    error,
  } = useInputText(initInput);

  const log_in_submit = async (evt) => {
    evt.preventDefault();
    if (check_error({ required_field: ["email", "password"] })) return;
    if (await log_in(input)) {
      effectRef.current = true;
      return setInput(initInput);
    }
  };

  useEffect(() => {
    if (user && effectRef.current) {
      history.push(`/user/${user.user_name}`);
    }
  }, [user, history]);

  return (
    <div className="form_container">
      <div className="head">
        <strong className="title">Accedi</strong>
      </div>
      <form className="form_ctrl" onSubmit={log_in_submit}>
        <InputText
          type="email"
          name="email"
          label="Email:"
          value={input.email}
          onChange={input_handler}
          onFocus={clear_error}
          onBlur={check_empty_field}
          error={error.email}
        />
        <InputText
          type="password"
          name="password"
          label="Password:"
          value={input.password}
          onChange={input_handler}
          onFocus={clear_error}
          onBlur={check_empty_field}
          error={error.password}
        />
        <button type="submit" className="submit_button">
          Log in
        </button>
      </form>
      {errorMessage && <span className="err_message">{errorMessage}</span>}
      <div className="foot">
        <span className="question">
          Non hai un account?
          <span className="link" onClick={() => setSignUp((state) => !state)}>
            Registrati
          </span>
        </span>
      </div>
    </div>
  );
};

export default LogIn;
