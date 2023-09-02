export const getNumberOfBlogs = (username, blogs) => {
  return blogs.filter((blog) => blog.user.username === username).length;
};

export const getBlogsForAUser = (username, blogs) => {
  return blogs.filter((blog) => blog.user.username === username);
};
