import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { useSetNotification } from '../context/NotificationContext';

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);
  const queryClient = useQueryClient();
  const setNotification = useSetNotification();

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog))
      );
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (blogId) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((b) => b.id !== blogId)
      );
    },
  });

  const handleLike = (blog) => {
    likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
    setNotification(`${blog.title} voted`, true, 5);
  };

  const handleDelete = (blog) => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  return (
    <li className='blog'>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      {visible && (
        <div className='blogDetails'>
          <p>{blog.url}</p>
          likes {blog.likes}{' '}
          <button onClick={() => handleLike(blog)}>like</button>
          <p>{blog.user.name}</p>
          {user.username === blog.user.username && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
        </div>
      )}
    </li>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
