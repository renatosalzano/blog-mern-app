import { Link } from "react-router-dom";

const Tags = ({ tag_arr }) => {
  return (
    <div className="tag_container">
      {tag_arr.map((tag) => (
        <Link to={`/post/search/tags/${tag}`} key={tag} className="tag">
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default Tags;
