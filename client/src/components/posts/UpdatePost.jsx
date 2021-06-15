import React, { memo } from "react";
import { VscClose } from "react-icons/vsc";
import { useInputText } from "../../hooks/useInputText";
import { useInputTag } from "../../hooks/useInputTag";
import InputTag from "../inputs/InputTag";
import TextArea from "../inputs/TextArea";
import UserPicture from "../user/UserPicture";
import InputText from "../inputs/InputText";

const UpdatePost = ({
  user,
  update_post,
  post,
  toggle_edit_post,
  server_error,
}) => {
  const {
    inputTag,
    tags,
    input_tag_handler,
    check_tags_error,
    submit_tag,
    remove_tag,
    tagError,
    ruleWarn,
  } = useInputTag(post.tags ? post.tags : []);
  const { input, input_handler, check_error, clear_error, error } =
    useInputText({
      title: post.title,
      content: post.content,
    });

  const update = async () => {
    const text_err = check_error({ required_field: ["title", "content"] });
    const tags_err = check_tags_error();
    if (!text_err && !tags_err) {
      //--> ALL FIELD CORRECT
      const req_obj = {
        title: input.title.trim(),
        content: input.content.trim(),
        tags: tags,
      };
      if (await update_post({ req_obj: req_obj, post_id: post._id }))
        return toggle_edit_post();
      // => ERROR
      return console.warn(server_error);
    }
  };

  return (
    <div className="new_post_container">
      <div className="new_post">
        <div className="head">
          <UserPicture src={user.pic} />
          <strong>Modifica post</strong>
          <div className="close_button" onClick={toggle_edit_post}>
            <VscClose />
          </div>
        </div>
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
            <TextArea
              name="content"
              placeholder="Scrivi post..."
              font_size={16}
              value={input.content}
              onChange={input_handler}
              onFocus={clear_error}
              error={error.content}
              error_message="Il post è vuoto..."
              min_rows={10}
              max_rows={50}
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
          </div>
          {server_error && (
            <span className="err_message">
              {"Si è verificato un errore imprevisto"}
            </span>
          )}
        </div>
        <button className="submit_post_button" onClick={update}>
          Aggiorna Modifiche
        </button>
      </div>
    </div>
  );
};

export default memo(UpdatePost);
