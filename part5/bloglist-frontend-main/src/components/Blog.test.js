import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("first render should show title and author not url and likes", () => {
  const testBlog = {
    title: "test blog",
    author: "test author",
    url: "http://",
    likes: 11,
  };

  const { container } = render(<Blog blog={testBlog} />);
  const div = container.querySelector(".blog-style");
  screen.debug(div);
  expect(div).toHaveTextContent("test blog");
  expect(div).toHaveTextContent("test author");
  expect(div).not.toHaveTextContent("http://");
  expect(div).not.toHaveTextContent("11");
});

test("click view button should render url and likes", async () => {
  const testBlog = {
    title: "test blog",
    author: "test author",
    url: "http://",
    likes: 11,
    user: { username: "test user" },
  };

  const user = userEvent.setup();

  const { container } = render(<Blog blog={testBlog} username="test user" />);
  const div = container.querySelector(".blog-style");
  const button = screen.getByText("view");
  await user.click(button);
  screen.debug(div);
  expect(div).toHaveTextContent("http://");
  expect(div).toHaveTextContent("11");
});

test("click like twice should call handleLike twice", async () => {
  const testBlog = {
    title: "test blog",
    author: "test author",
    url: "http://",
    likes: 11,
    user: { username: "test user" },
  };

  const mockHandleLike = jest.fn();

  const user = userEvent.setup();

  const { container } = render(
    <Blog blog={testBlog} username="test user" handleLike={mockHandleLike} />
  );
  const div = container.querySelector(".blog-style");
  const button = screen.getByText("view");
  await user.click(button);
  const likeButton = screen.getByText("like");
  screen.debug(likeButton);
  await user.click(likeButton);
  expect(mockHandleLike.mock.calls).toHaveLength(1);
  await user.click(likeButton);
  expect(mockHandleLike.mock.calls).toHaveLength(2);
});
