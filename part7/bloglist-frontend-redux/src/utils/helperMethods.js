export const getNumberOfBlogs = (username, blogs) => {
  return blogs.filter((blog) => blog.user.username === username).length;
};
