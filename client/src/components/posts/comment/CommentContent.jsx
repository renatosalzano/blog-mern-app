import { useEffect, useRef, useState } from "react";

const CommentContent = ({ text }) => {
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

    if (line_text.length > 5 && !expandText) {
      current_text = line_text.slice(0, 5).join("\n");
      if (current_text.length > 250) {
        current_text = current_text.slice(0, 250);
      }
      setLink((state) => (state = true));
      return (contentRef.current.textContent = current_text + "...");
    }
    if (current_text.length > 250) {
      current_text = current_text.slice(0, 250);
      setLink((state) => (state = true));
      return (contentRef.current.textContent = current_text + "...");
    }

    return (contentRef.current.textContent = current_text);
  }, [text, line_text, expandText]);

  return (
    <span>
      <p className="text_content" ref={contentRef}></p>
      {link && (
        <span className="content_link" onClick={expand_text}>
          {"Continua"}
        </span>
      )}
    </span>
  );
};

export default CommentContent;
