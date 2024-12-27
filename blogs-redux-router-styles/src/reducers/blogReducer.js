import { createSlice, current } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setMessage } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateLike(state, action) {
      const blog = action.payload;
      const blogToUpdate = state.find(b => b.id === blog.id);
      const blogUpdated = {
        ...blogToUpdate,
        likes: blog.likes
      };

      return state.map(b =>
        b.id !== blogUpdated.id ? b : blogUpdated
      );
    },
    removeBlog(state, action) {
      const blogId = action.payload;
      return state.filter(b => b.id !== blogId);
    },
    appendComment(state, action) {
      const blog = action.payload;
      const blogToUpdate = state.find(b => b.id === blog.id);
      blogToUpdate.comments.push(blog.comment);
    }
  },
});

export const { setBlogs, appendBlog, updateLike, removeBlog, appendComment } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    const blog = await blogService.create(blogObject);
    dispatch(appendBlog(blog));
    dispatch(setMessage(`A new blog ${blogObject.title} by ${blogObject.author} created`, true, 5));
  };
};

export const updateBlog = (blogObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogObject);
    dispatch(updateLike(updatedBlog));
    dispatch(setMessage(`${blogObject.title} voted`, true, 5));
  };
};

export const deleteBlog = (blogId) => {
  return async dispatch => {
    await blogService.remove(blogId);
    dispatch(removeBlog(blogId));
  };
};

export const addComment = (blogId, comment) => {
  return async dispatch => {
    const responseComment = await blogService.addComment(blogId, comment);
    dispatch(appendComment({ id: blogId, comment: responseComment.comment }));
  };
};

export default blogSlice.reducer;
