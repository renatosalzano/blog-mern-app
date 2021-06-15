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
              <div className="confirm_delete">
                <span>Conferma elimina</span>
                <div>
                  <span className="cancel" onClick={() => setConfirm(false)}>
                    Annulla
                  </span>
                  <span
                    className="confirm"
                    onClick={() => option_delete(target_id)}
                  >
                    OK
                  </span>
                </div>
              </div>
            ) : (
              <>
                <span
                  className="option"
                  onClick={() => {
                    option_edit(target_id);
                    setActive("");
                  }}
                >{`Modifica ${target_name}`}</span>
                <span className="option" onClick={() => setConfirm(true)}>
                  {`Elimina ${target_name}`}
                </span>
              </>
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
