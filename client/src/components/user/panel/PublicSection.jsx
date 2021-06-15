import { memo, useEffect, useState } from "react";
import { useInputText } from "../../../hooks/useInputText";
import { useUpdatePic } from "../../../hooks/useUpdatePic";
import UploadButton from "../../buttons/UploadButton";
import TextArea from "../../inputs/TextArea";
import UserPicture from "../UserPicture";

const PublicSection = ({ user_pic, user_bio, update_account }) => {
  const [updateBtn, setUpdateBtn] = useState(false);
  const { upload_pic } = useUpdatePic();
  const { input, input_handler } = useInputText({
    bio: user_bio,
    max_length: 200,
  });

  const update_pic = async (evt) => {
    evt.preventDefault();
    const updated_pic = await upload_pic(evt);
    if (updated_pic) {
      const req_obj = { pic: updated_pic };
      if (update_account({ req_obj: req_obj, filter: "public" })) return; // => update success
    }
  };

  const update_bio = async (evt) => {
    evt.preventDefault();
    const req_obj = { bio: input.bio };
    if (update_account({ req_obj: req_obj, filter: "public" })) return; // => update success
  };

  useEffect(() => {
    if (user_bio !== input.bio) {
      return setUpdateBtn(true);
    } else {
      return setUpdateBtn(false);
    }
  }, [user_bio, input.bio]);
  return (
    <>
      <div className="section">
        <div className="upload_pic_container">
          <UserPicture src={user_pic} />
          <UploadButton onUpload={update_pic} />
        </div>
        <form className="form_ctrl" onSubmit={update_bio}>
          <TextArea
            value={input.bio}
            label="Bio: "
            name="bio"
            onChange={input_handler}
            font_size={18}
            padding={5}
            max_length={200}
            min_rows={3}
            max_rows={20}
          />
          {updateBtn ? (
            <button type="submit" className="submit_button button">
              Salva Modifiche
            </button>
          ) : (
            <span className="idle_button button">Salva Modifiche</span>
          )}
        </form>
      </div>
    </>
  );
};

export default memo(PublicSection);
