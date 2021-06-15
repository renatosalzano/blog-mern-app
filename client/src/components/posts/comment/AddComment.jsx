import { memo } from "react";
import { useInputText } from "../../../hooks/useInputText";
import TextArea from "../../inputs/TextArea";
import UserPicture from "../../user/UserPicture";

const AddComment = ({ user, post_id, submit_comment }) => {
  const { input, setInput, input_handler } = useInputText({
    content: "",
    post_id: post_id,
  });

  const publish_comment = (evt) => {
    evt.preventDefault();
    submit_comment(input);
    setInput({
      content: "",
      post_id: post_id,
    });
  };

  return (
    <div className="add_comment">
      <UserPicture src={user.pic} />
      <form className="form_ctrl" onSubmit={publish_comment}>
        <TextArea
          name="content"
          placeholder="Scrivi un commento..."
          value={input.content}
          onChange={input_handler}
          min_rows={1}
          max_rows={50}
        />
        {input.content && (
          <button className={`submit_comment_button`} type="submit">
            INVIA
          </button>
        )}
      </form>
    </div>
  );
};

export default memo(AddComment);
