import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useInputText } from "../../hooks/useInputText";
import { VscArrowLeft } from "react-icons/vsc";
import InputText from "../inputs/InputText";

const initInput = {
  user_name: "",
  email: "",
  password: "",
};

const SignUp = ({ setSignUp }) => {
  const { sign_up, errorMessage } = useContext(AuthContext);
  const {
    input,
    setInput,
    input_handler,
    check_error,
    clear_error,
    check_empty_field,
    error,
  } = useInputText(initInput);

  const sign_up_submit = async (evt) => {
    evt.preventDefault();
    if (check_error({ required_field: ["email", "password"] })) return;
    if (await sign_up(input)) {
      setInput(initInput);
      return setSignUp((state) => !state);
    }
  };

  return (
    <div className="form_container">
      <div className="head">
        <strong className="title">Registrati</strong>
        <span
          className="back_button link"
          onClick={() => setSignUp((state) => !state)}
        >
          <VscArrowLeft />
        </span>
      </div>
      <form className="form_ctrl" onSubmit={sign_up_submit}>
        <InputText
          type="text"
          name="user_name"
          label="Nome Utente:"
          onChange={input_handler}
          onFocus={clear_error}
          onBlur={check_empty_field}
          error={error.user_name}
        />
        <InputText
          type="email"
          name="email"
          label="Email:"
          onChange={input_handler}
          onFocus={clear_error}
          onBlur={check_empty_field}
          error={error.email}
        />
        <InputText
          type="password"
          name="password"
          label="Password:"
          onChange={input_handler}
          onFocus={clear_error}
          onBlur={check_empty_field}
          value={input.password}
          error={error.password}
        />
        <button className="submit_button" type="submit">
          Registrati
        </button>
      </form>
      {errorMessage && <span className="err_message">{errorMessage}</span>}
    </div>
  );
};

export default SignUp;
