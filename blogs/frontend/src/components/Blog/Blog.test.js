import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

import Blog from "./Blog";

const blog = {
  title: "Blog 1",
  author: "Hugo Cruz",
  url: "http://store.com/1",
  userId: "63b97815bc8d6419eff97b0b",
  likes: 5,
};

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

test("renders content", () => {
  const component = render(
    <Blog
      blog={blog}
      blogs={blogs}
      setBlogs={setBlogs}
      setMessageNotification={setMessageNotification}
    />
  );

  expect(component.container).toHaveTextContent("Blog 1 Hugo Cruz");
});

test("clicking the button for show/hide the details", () => {
  const component = render(
    <Blog
      blog={blog}
      blogs={blogs}
      setBlogs={setBlogs}
      setMessageNotification={setMessageNotification}
    />
  );

  const button = component.getByText("View");
  fireEvent.click(button);

  const p1 = component.container.querySelector(".likes");
  expect(p1).toHaveTextContent(5);

  const p2 = component.container.querySelector(".url");
  expect(p2).toHaveTextContent("http://store.com/1");
});
