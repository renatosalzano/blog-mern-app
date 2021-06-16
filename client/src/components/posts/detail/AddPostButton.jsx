import UserPicture from "../../user/UserPicture";

const AddPostButton = ({ user, setNewPost }) => {
  return (
    <div className="add_post_button">
      <UserPicture src={user.pic} />
      <span onClick={() => setNewPost((state) => !state)}>
        Scrivi un post...
      </span>
    </div>
  );
};

export default AddPostButton;
