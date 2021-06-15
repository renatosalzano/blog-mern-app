import { memo } from "react";
import { useInputText } from "../../../hooks/useInputText";
import TextArea from "../../inputs/TextArea";

const EditComment = ({ comment_id, update_comment, content, option_edit }) => {
  const { input, input_handler } = useInputText({
    content: content,
  });

  const edit_comment = async (evt) => {
    evt.preventDefault();
    if (await update_comment({ req_obj: input, comment_id: comment_id })) {
      return option_edit();
    }
  };

  return (
    <form className="form_ctrl" onSubmit={edit_comment}>
      <TextArea
        name="content"
        placeholder="Scrivi un commento..."
        value={input.content}
        onChange={input_handler}
      />
      {input.content && (
        <div className="button_container">
          <button className={`cancel_button`} onClick={option_edit}>
            ANNULLA
          </button>
          <button className={`update_button`} type="submit">
            INVIA
          </button>
        </div>
      )}
    </form>
  );
};

export default memo(EditComment);
