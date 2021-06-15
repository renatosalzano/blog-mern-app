import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Content = ({ text, post_id, no_content_slice, is_link }) => {
  const contentRef = useRef();
  const [expandText, setExpandTest] = useState(false);
  const [link, setLink] = useState(false);
  let line_text = text.split(/\n/);

  const expand_text = () => {
    setExpandTest(true);
    setLink(false);
  };

  useEffect(() => {
    let current_text = text;
    if (no_content_slice) {
      return (contentRef.current.textContent = current_text);
    }

    if (line_text.length > 5 && !expandText) {
      current_text = line_text.slice(0, 5).join("\n");
      if (current_text.length > 500) {
        current_text = current_text.slice(0, 500);
      }
      setLink((state) => (state = true));
      return (contentRef.current.textContent = current_text + "...");
    }
    if (current_text.length > 500 && !expandText) {
      current_text = current_text.slice(0, 500);
      setLink((state) => (state = true));
      return (contentRef.current.textContent = current_text + "...");
    }

    return (contentRef.current.textContent = current_text);
  }, [text, line_text, no_content_slice, expandText]);

  return (
    <span>
      <p className="text_content" ref={contentRef}></p>
      {is_link
        ? link && (
            <Link className="content_link" to={`/post/${post_id}`}>
              {"Continua"}
            </Link>
          )
        : link && (
            <span className="content_link" onClick={expand_text}>
              {"Continua"}
            </span>
          )}
    </span>
  );
};

export default Content;
