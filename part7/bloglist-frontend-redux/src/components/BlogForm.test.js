import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm />should call handleCreateBlog with right arguments", async () => {
  const mockHandleCreateBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(
    <BlogForm handleCreateBlog={mockHandleCreateBlog} />
  );

  const titleInput = container.querySelector("#title-input");
  const authorInput = container.querySelector("#author-input");
  const urlInput = container.querySelector("#url-input");
  const createButton = container.querySelector("#create-button");

  await user.type(titleInput, "test title");
  await user.type(authorInput, "test author");
  await user.type(urlInput, "test url");
  await user.click(createButton);
  expect(mockHandleCreateBlog).toHaveBeenCalled();
  expect(mockHandleCreateBlog).toHaveBeenCalledWith({
    title: "test title",
    author: "test author",
    url: "test url",
  });
});
