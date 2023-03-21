import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import SET_BORN from "../queries/updateBirthYear";
import ALL_AUTHORS from "../queries/allAuthors";

export default function UpdateBirthYear() {
  const [authorUpdated, setAuthorUpdated] = useState({
    name: "",
    born: "",
  });

  const [inputBornVisible, setInputBornVisible] = useState(false);
  const { data } = useQuery(ALL_AUTHORS);

  const [setBorn] = useMutation(SET_BORN);

  const handleOnChange = (e) => {
    if (e.target.name === "name") {
      const authorSelectedName = e.target.value;
      const currentAuthor = data.allAuthors.find(
        (author) => author.name === authorSelectedName
      );
      !currentAuthor.born
        ? setInputBornVisible(true)
        : setInputBornVisible(false);
    }
    setAuthorUpdated({
      ...authorUpdated,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setBorn({
      variables: { name: authorUpdated.name, setBornTo: +authorUpdated.born },
    });
    setAuthorUpdated({
      name: "",
      born: "",
    });
    setInputBornVisible(false);
  };

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={handleSubmit}>
        {/* <div>
          name{" "}
          <input
            value={authorUpdated.name}
            onChange={handleOnChange}
            name="name"
          />
        </div>
        <div>
          born
          <input
            value={authorUpdated.born}
            onChange={handleOnChange}
            name="born"
          />
        </div> */}
        <div>
          <select
            name="name"
            value={authorUpdated.name}
            onChange={handleOnChange}
          >
            <option value="">Select author without born</option>
            {data.allAuthors.map((author) => (
              <option
                value={author.name}
                key={author.id}
              >
                {author.name}
              </option>
            ))}
          </select>
        </div>
        {inputBornVisible && (
          <div>
            born
            <input
              value={authorUpdated.born}
              onChange={handleOnChange}
              name="born"
            />
            <button type="submit">Update author</button>
          </div>
        )}
      </form>
    </div>
  );
}
