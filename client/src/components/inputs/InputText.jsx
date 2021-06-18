import { memo, useLayoutEffect, useRef, useState } from "react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
const InputText = ({
  class_name,
  placeholder,
  value,
  type,
  name,
  label,
  onChange,
  onFocus,
  onBlur,
  error,
  error_message,
}) => {
  // hooks
  const [viewPass, setViewPass] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  // refs
  let boxRef = useRef(null);
  let labelRef = useRef(null);
  let inputRef = useRef(null);

  const focus = () => {
    if (isFocus && !inputRef.current.value) return setIsFocus("");
    return setIsFocus("focus");
  };

  useLayoutEffect(() => {
    let on_fire = inputRef.current === document.activeElement;
    if (label) {
      boxRef.current.style.marginTop = labelRef.current.scrollHeight + "px";

      if (isFocus || on_fire || value || placeholder) {
        labelRef.current.style.setProperty("--x", "-100%");
      } else {
        labelRef.current.style.setProperty("--x", "0");
      }
    }
  }, [label, isFocus, value, labelRef, boxRef, inputRef, placeholder]);

  const style = { "--x": 0 };

  return (
    <div
      className={`${class_name ? class_name : "input"}_container ${
        error ? "error" : ""
      } ${isFocus}`}
      ref={boxRef}
    >
      {label && (
        <label htmlFor={name} ref={labelRef} style={style}>
          {label}
          {error && (
            <ErrorMessage error={error} error_message={error_message} />
          )}
        </label>
      )}
      <input
        className={`${class_name ? class_name : "input"}`}
        type={viewPass ? "text" : type}
        name={name}
        onChange={onChange}
        onFocus={(evt) => {
          onFocus(evt);
          focus();
        }}
        onBlur={(evt) => {
          onBlur(evt);
          focus();
        }}
        value={value}
        placeholder={placeholder}
        ref={inputRef}
      />

      {type === "password" && (
        <span className="view_password" onClick={() => setViewPass(!viewPass)}>
          {viewPass ? <RiEyeLine /> : <RiEyeCloseLine />}
        </span>
      )}
    </div>
  );
};

export default memo(InputText);

const ErrorMessage = ({ error, error_message }) => {
  return (
    <span className="error_message">
      {error_message ? error_message : error}
    </span>
  );
};
