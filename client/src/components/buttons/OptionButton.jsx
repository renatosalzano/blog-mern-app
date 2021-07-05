import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const OptionButton = ({
  target_name,
  target_id,
  option_delete,
  option_edit,
}) => {
  const [active, setActive] = useState("");
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <div className={`option_button ${active}`}>
        <HiOutlineDotsHorizontal
          onClick={() => setActive(active ? "" : "open")}
        />
        {active && (
          <div className="option_list">
            {confirm ? (
              <ConfirmDel
                cancel_event={() => setConfirm(false)}
                delete_event={() => option_delete(target_id)}
              />
            ) : (
              <OptionList
                edit_event={() => {
                  option_edit(target_id);
                  setActive("");
                }}
                delete_event={() => setConfirm(true)}
                target_name={target_name}
              />
            )}
          </div>
        )}
        {active && (
          <div
            className="trigger"
            onClick={() => {
              setActive("");
              setConfirm(false);
            }}
          ></div>
        )}
      </div>
    </>
  );
};

export default OptionButton;

const ConfirmDel = ({ cancel_event, delete_event }) => {
  return (
    <>
      <span className="list_head">Conferma elimina</span>
      <span className="option cancel" onClick={cancel_event}>
        Annulla
      </span>
      <span className="option confirm" onClick={delete_event}>
        OK
      </span>
    </>
  );
};

const OptionList = ({ edit_event, delete_event, target_name }) => {
  return (
    <>
      <span
        className="option"
        onClick={edit_event}
      >{`Modifica ${target_name}`}</span>
      <span className="option" onClick={delete_event}>
        {`Elimina ${target_name}`}
      </span>
    </>
  );
};
