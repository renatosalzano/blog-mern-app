import { memo } from "react";
import TextareaAutosize from "react-textarea-autosize";

const TextArea = ({
  onChange,
  onFocus,
  onBlur,
  value,
  name,
  label,
  placeholder,
  max_length,
  min_rows,
  max_rows,
  error,
  error_message,
}) => {
  return (
    <div className="textarea_container">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="textarea_padding">
        <TextareaAutosize
          className="textarea"
          minRows={min_rows}
          maxRows={max_rows}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {error && (
          <span className="error_message">
            {error_message ? error_message : error}
          </span>
        )}

        {max_length && (
          <div className="counter">
            <span>{max_length - value.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TextArea);
