import { useState } from "react";

export const useInputText = (init) => {
  // init = {[target_name] : target_value, ...}
  const [input, setInput] = useState(init);
  const [error, setError] = useState({});

  const input_handler = (evt) => {
    evt.preventDefault();
    const name = evt.target.name;
    setInput((input) => (input = { ...input, [name]: evt.target.value }));
  };

  const check_error = ({ required_field }) => {
    /* function( { required_field : ['target_name', ...] } ) => boolean */
    let output = false; // error => false
    for (let required_field in input) {
      if (input[required_field].trim() === "") {
        setError(
          (error) => (error = { ...error, [required_field]: "required" })
        );
        output = true; // error => true
      }
    }
    return output;
  };

  const check_empty_field = (evt) => {
    evt.preventDefault();
    const name = evt.target.name;
    if (input[name] === "") {
      return setError((error) => (error = { ...error, [name]: "required" }));
    }
  };

  const clear_error = (evt) => {
    const name = evt.target.name;
    setError({ ...error, [name]: "" });
  };

  return {
    input,
    setInput,
    input_handler,
    check_error,
    clear_error,
    check_empty_field,
    error,
  };
};
