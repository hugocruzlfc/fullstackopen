import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";

export default function CreateNew(props) {
  //const [content, setContent] = useState("");
  // const [author, setAuthor] = useState("");
  // const [info, setInfo] = useState("");

  const [content, resetContent] = useField("text");
  const [author, resetAuthor] = useField("text");
  const [info, , resetInfo] = useField("text");
  // const temp = useField("text");
  // console.log(temp);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/anecdotes");
  };

  const handleReset = (e) => {
    e.preventDefault();
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
          {/* <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          /> */}
        </div>
        <div>
          author
          <input {...author} />
          {/* <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          /> */}
        </div>
        <div>
          url for more info
          <input {...info} />
          {/* <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          /> */}
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
}
