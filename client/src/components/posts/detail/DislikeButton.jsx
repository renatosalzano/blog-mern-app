import { useContext, useEffect, useState } from "react";
import { VscThumbsdown } from "react-icons/vsc";
import { AuthContext } from "../../../auth/AuthContext";

const DislikeButton = ({ dislike_arr, onClick }) => {
  const { user } = useContext(AuthContext);
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!user) return;
    if (dislike_arr.includes(user.id)) {
      setActive("disliked");
    } else {
      setActive("");
    }
  }, [dislike_arr, user]);
  return (
    // need switch
    <div className={`dislike_button ${active}`} onClick={onClick}>
      <span className="like_count">
        <VscThumbsdown />
        {dislike_arr.length}
      </span>
    </div>
  );
};

export default DislikeButton;
