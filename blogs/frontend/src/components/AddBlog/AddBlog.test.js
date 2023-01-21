import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddBlog from "./AddBlog";

const blogs = [
  {
    title: "Blog 1",
    author: "Hugo Cruz",
    url: "http://store.com/1",
    userId: "63b97815bc8d6419eff97b0b",
    likes: 5,
  },
  {
    title: "Blog 2",
    author: "Hugo Cruz",
    url: "http://store.com/2",
    userId: "63b97815bc8d6419eff97b0b",
    likes: 2,
  },
];

const setBlogs = jest.fn();
const setMessageNotification = jest.fn();
const toggleVisibility = jest.fn();

test("<AddBlog /> updates parent state and calls onSubmit", () => {
  const component = render(
    <AddBlog
      blogs={blogs}
      setMessageNotification={setMessageNotification}
      setBlogs={setBlogs}
      toggleVisibility={toggleVisibility}
    />
  );

  const inputTitle = component.container.querySelector("#title");
  const inputAuthor = component.container.querySelector("#author");
  const inputUrl = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  fireEvent.change(inputTitle, {
    target: { value: "Blog 1" },
  });
  fireEvent.change(inputAuthor, {
    target: { value: "Hugo Cruz" },
  });
  fireEvent.change(inputUrl, {
    target: { value: "http://store.com/2" },
  });
  fireEvent.submit(form);

  expect(setBlogs.mock.calls).toHaveLength(1);
  //   expect(createNote.mock.calls[0][0].content).toBe(
  //     "testing of forms could be easier"
  //   );
});
