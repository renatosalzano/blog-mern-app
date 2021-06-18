import React, { memo } from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { useInputText } from "../../hooks/useInputText";
import { useInputTag } from "../../hooks/useInputTag";
import InputText from "../inputs/InputText";
import InputTag from "../inputs/InputTag";
import TextArea from "../inputs/TextArea";
import UserPicture from "../user/UserPicture";

const NewPost = ({ user, sumbit_post, open, server_error }) => {
  const {
    inputTag,
    tags,
    setInputTag,
    input_tag_handler,
    check_tags_error,
    submit_tag,
    remove_tag,
    tagError,
    ruleWarn,
  } = useInputTag([]);
  const { input, setInput, input_handler, check_error, clear_error, error } =
    useInputText({
      title: "",
      content: "",
    });

  const publish = async () => {
    const text_err = check_error({ required_field: ["title", "content"] });
    const tags_err = check_tags_error();
    if (!text_err && !tags_err) {
      //--> ALL FIELD CORRECT
      const req_obj = {
        title: input.title.trim(),
        content: input.content.trim(),
        tags: tags,
      };
      if (await sumbit_post(req_obj)) {
        // --> OK
        return open(false);
      }
      // --> SERVER ERROR
      console.warn(server_error);
    }
  };

  const close_window = () => {
    setInputTag([]);
    setInput({
      title: "",
      content: "",
    });
    open(false);
  };

  return (
    <div className="new_post_container">
      <div className="new_post">
        <div className="head">
          <div className="close_button" onClick={close_window}>
            <VscArrowLeft />
          </div>
          <UserPicture src={user.pic} />
          <strong>Crea post</strong>
          <button className="submit_post_button" onClick={publish}>
            Pubblica
          </button>
        </div>
        {server_error && (
          <span className="err_message">
            {"Si è verificato un errore imprevisto"}
          </span>
        )}
        <div className="scroll_container">
          <div className="form_ctrl">
            <InputText
              name="title"
              label="Titolo:"
              value={input.title}
              onChange={input_handler}
              onFocus={clear_error}
              onBlur={clear_error}
              error={error.title}
              error_message="Richiesto"
            />
            <InputTag
              name="tag"
              tag_arr={tags}
              onChange={input_tag_handler}
              onSubmit={submit_tag}
              onTagClick={remove_tag}
              value={inputTag}
              error={tagError}
              error_message="Mi serve almeno un Tag"
              rule_warn={ruleWarn}
              rule_warn_message="Tag già inserito"
            />
            <TextArea
              name="content"
              placeholder="Scrivi post..."
              value={input.content}
              onChange={input_handler}
              onFocus={clear_error}
              error={error.content}
              error_message="Il post è vuoto..."
              min_rows={10}
              max_rows={50}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(NewPost);
