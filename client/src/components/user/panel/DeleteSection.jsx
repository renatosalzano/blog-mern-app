import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { useInputText } from "../../../hooks/useInputText";
import InputText from "../../inputs/InputText";

const DeleteSection = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="section">
      {!showForm ? (
        <DeleteButton cancel_event={() => setShowForm(true)} />
      ) : (
        <DeleteForm cancel_event={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default DeleteSection;

const DeleteForm = ({ cancel_event }) => {
  const history = useHistory();
  const { delete_account, log_out } = useContext(AuthContext);
  const { input, input_handler, check_error, clear_error, error } =
    useInputText({
      password: "",
    });

  const delete_event = async (evt) => {
    evt.preventDefault();
    if (check_error({ required_field: ["password"] })) return;
    if (await delete_account(input.password)) {
      history.push("/login");
      return log_out();
    }
  };

  return (
    <>
      <form onSubmit={delete_event} className="form_ctrl">
        <span className="message">
          {"Inserisci password per confermare:"}
          {error.password && (
            <span className="error_message">Password obbligatoria</span>
          )}
        </span>
        <InputText
          value={input.password}
          type="password"
          name="password"
          onChange={input_handler}
          onFocus={clear_error}
        />
        <div className="button_container">
          <span className="cancel_button button" onClick={cancel_event}>
            ANNULLA
          </span>
          <button className="delete_button button" type="submit">
            CONFERMA
          </button>
        </div>
      </form>
    </>
  );
};

const DeleteButton = ({ cancel_event }) => {
  return (
    <>
      <span className="message">
        Una volta cancellato, non potrai tornare indietro
      </span>
      <span className="submit_button button" onClick={cancel_event}>
        Elimina il tuo account
      </span>
    </>
  );
};
