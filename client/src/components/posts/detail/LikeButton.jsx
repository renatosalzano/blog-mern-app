import { memo, useContext, useEffect, useState } from "react";
import { VscThumbsup } from "react-icons/vsc";
import { AuthContext } from "../../../auth/AuthContext";

const LikeButton = ({ like_arr, onClick }) => {
  const { user } = useContext(AuthContext);
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!user) return;
    if (like_arr.includes(user.id)) {
      setActive("liked");
    } else {
      setActive("");
    }
  }, [like_arr, user]);
  return (
    // need switch
    <div className={`like_button ${active}`} onClick={onClick}>
      <span className="like_count">
        <VscThumbsup />
        <span>{like_arr.length}</span>
      </span>
    </div>
  );
};

export default memo(LikeButton);
