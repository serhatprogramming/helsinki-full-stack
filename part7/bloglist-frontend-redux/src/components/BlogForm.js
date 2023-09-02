import { useState } from "react";

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = (event) => {
    event.preventDefault();
    handleCreateBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <form onSubmit={createBlog} className="create-blog-form">
        <h2>Create New Blog</h2>
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="title-input" className="form-label">
              Title:
            </label>
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              id="title-input"
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="author-input" className="form-label">
              Author:
            </label>
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              id="author-input"
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="url-input" className="form-label">
              Url:
            </label>
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
              id="url-input"
              className="form-input"
            />
          </div>
        </div>
        <button type="submit" id="create-button">
          Create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
