import { useHistory } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useInputText } from "../../hooks/useInputText";
import { useState } from "react";

const SearchBar = () => {
  const history = useHistory();
  const [isFocus, setIsFocus] = useState(false);

  const { input_handler, input } = useInputText({ search: "" });

  const search_event = (evt) => {
    evt.preventDefault();
    if (input.search) {
      history.push(`/post/search/title/${input.search}`);
    }
  };

  const focus_handler = () => {
    if (isFocus) return setIsFocus("");
    return setIsFocus("sb_focus");
  };

  return (
    <form className={`search_bar_container ${isFocus}`} onSubmit={search_event}>
      <input
        type="text"
        name="search"
        className="search_bar"
        placeholder="Cerca un post"
        onChange={input_handler}
        value={input.search}
        onFocus={focus_handler}
        onBlur={focus_handler}
      />
      <button type="submit" className="submit_search_button">
        <FiSearch />
      </button>
    </form>
  );
};

export default SearchBar;
