import { useState } from "react";

export const useInputTag = (init) => {
  const [inputTag, setInputTag] = useState("");
  const [tags, setTags] = useState(init);
  const [tagError, setTagError] = useState("");
  const [ruleWarn, setRuleWarn] = useState("");

  const input_tag_handler = (evt) => {
    evt.preventDefault();
    // --> clear error message
    if (tagError) setTagError("");
    if (ruleWarn) setRuleWarn("");
    setInputTag((input) => (input = evt.target.value));
  };

  const submit_tag = (evt) => {
    evt.preventDefault();
    const input_tag = inputTag
      .trim()
      .toLowerCase()
      .replace(/[^A-Z0-9]/gi, "");
    // --> clear prev error
    if (tagError) setTagError("");
    if (ruleWarn) setRuleWarn("");
    // --> check
    if (tags.includes(input_tag)) return setRuleWarn("Same tag!");
    if (!input_tag) return setInputTag((input) => (input = ""));
    // --> OK
    setInputTag((input) => (input = ""));
    return setTags((tags) => (tags = [...tags, input_tag]));
  };

  const remove_tag = (tag_name) => {
    if (tags.includes(tag_name)) {
      const tag_filtered = tags.filter((tag) => tag !== tag_name);
      return setTags((tags) => (tags = tag_filtered));
    }
  };

  const check_tags_error = () => {
    if (tags.length === 0) {
      setTagError("Required");
      return true;
    }
    return false;
  };

  return {
    inputTag,
    tags,
    setInputTag,
    input_tag_handler,
    check_tags_error,
    submit_tag,
    remove_tag,
    tagError,
    ruleWarn,
  };
};
