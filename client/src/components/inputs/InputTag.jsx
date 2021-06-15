import { VscClose } from "react-icons/vsc";

const InputTag = ({
  onChange,
  onSubmit,
  onFocus,
  onBlur,
  tag_arr,
  onTagClick,
  value,
  error,
  error_message,
  rule_warn,
  rule_warn_message,
}) => {
  return (
    <form
      className={`input_tag_form ${error || rule_warn ? "error" : ""}`}
      onSubmit={onSubmit}
    >
      <div className="input_tag_container">
        <TagList tag_arr={tag_arr} onTagClick={onTagClick} />

        <input
          className="input_tag"
          type="text"
          name="tag"
          placeholder="Aggiungi tag..."
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
        />
      </div>
      {error && (
        <span className="error_message">
          {error_message ? error_message : error}
        </span>
      )}
      {rule_warn && (
        <span className="rule_message">
          {rule_warn_message ? rule_warn_message : rule_warn}
        </span>
      )}
    </form>
  );
};

export default InputTag;

const TagList = ({ tag_arr, onTagClick }) => {
  return tag_arr.map((tag) => (
    <div key={tag} className="tag" onClick={() => onTagClick(tag)}>
      {tag}
      <VscClose className="remove_tag" />
    </div>
  ));
};
