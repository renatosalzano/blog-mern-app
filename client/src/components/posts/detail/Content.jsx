import { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Content = ({
  text,
  maxRow,
  maxLength,
  no_content_slice,
  is_link,
  post_id,
}) => {
  const [content, setContent] = useState(text);
  const [expandButton, setExpandButton] = useState(false);

  const expand_text = useCallback(() => {
    setExpandButton(false);
    return setContent(text);
  }, [text]);

  useEffect(() => {
    let current_text = text;
    let text_row = text.split(/\n/);

    if (no_content_slice) {
      return;
    }

    if (text_row.length > maxRow || current_text.length > maxLength) {
      current_text = text_row.slice(0, maxRow).join("\n");
      if (current_text.length > maxLength) {
        current_text = current_text.slice(0, maxLength) + "...";
        setContent(current_text);
      }
      return setExpandButton((state) => (state = true));
    }
    if (current_text.length > maxLength) {
      current_text = current_text.slice(0, maxLength) + "...";
      setContent(current_text);
      return setExpandButton((state) => (state = true));
    }
  }, [text, maxRow, maxLength, no_content_slice]);

  return (
    <span>
      <p className="text_content">
        {content}

        {expandButton &&
          (is_link ? (
            <Link className="content_link" to={`/post/${post_id}`}>
              {"Continua"}
            </Link>
          ) : (
            <span className="content_link" onClick={expand_text}>
              {"Continua"}
            </span>
          ))}
      </p>
    </span>
  );
};

export default memo(Content);
