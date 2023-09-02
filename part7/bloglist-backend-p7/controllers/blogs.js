const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  blog
    ? response.json(blog)
    : response.status(404).json({ error: "Blog does not exist" });
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const { id } = request.params;
  const { comment } = request.body;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).json({ error: "Blog post not found" });
    }
    blog.comments.push(comment);
    const updatedBlog = await blog.save();
    response.status(201).json(updatedBlog);
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

blogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET_KEY);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const retrievedUser = request.user;

  if (!title || !url) {
    return response.status(400).json({
      status: 400,
      message: "title and url are required",
    });
  }
  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user: retrievedUser._id,
  });
  const savedBlog = await blog.save();
  retrievedUser.blogs = retrievedUser.blogs.concat(savedBlog._id);
  await retrievedUser.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET_KEY);
  if (!decodedToken.id || decodedToken.id !== blog.user.toString()) {
    return response.status(401).json({ error: "token invalid" });
  }

  const retrievedUser = request.user;
  retrievedUser.blogs = retrievedUser.blogs.filter(
    (b) => b._id.toString() !== blog.id
  );
  retrievedUser.save();

  const result = await Blog.findByIdAndRemove(request.params.id);
  result
    ? response.status(204).end()
    : response.status(404).json({ error: "Blog does not exist" });
});

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );
  updatedBlog
    ? response.json(updatedBlog)
    : response.status(404).json({ error: "Blog does not exist" });
});

module.exports = blogsRouter;
