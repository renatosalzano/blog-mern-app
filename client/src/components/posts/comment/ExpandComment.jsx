import Spinner from "../../Spinner";

const ExpandComment = ({ expand_event, comment_count, post_id, loading }) => {
  return (
    <div onClick={() => expand_event(post_id)} className="expand_comment">
      {loading && <Spinner />}
      {comment_count < 2 ? (
        <span>Visualizza altri commenti </span>
      ) : (
        <span>{`Visualizza altri ${comment_count} commenti`}</span>
      )}
    </div>
  );
};

export default ExpandComment;
