import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { useSetNotification } from '../context/NotificationContext';

const BlogForm = ({ toggleVisibility }) => {
  const queryClient = useQueryClient();
  const setNotification = useSetNotification();

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
    }
  });

  const addBlog = (event) => {
    event.preventDefault();
    newBlogMutation.mutate(newBlog);

    setNotification(`a new blog ${newBlog.title} by ${newBlog.author} created`, true, 5);

    toggleVisibility();

    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type='text'
          value={newBlog.title}
          name='blog-title'
          onChange={({ target }) =>
            setNewBlog((prev) => ({ ...prev, title: target.value }))
          }
          data-testid='blog-title'
        />
      </div>

      <div>
        author:
        <input
          type='text'
          value={newBlog.author}
          name='blog-author'
          onChange={({ target }) =>
            setNewBlog((prev) => ({ ...prev, author: target.value }))
          }
          data-testid='blog-author'
        />
      </div>

      <div>
        url:
        <input
          type='text'
          value={newBlog.url}
          name='blog-url'
          onChange={({ target }) =>
            setNewBlog((prev) => ({ ...prev, url: target.value }))
          }
          data-testid='blog-url'
        />
      </div>

      <button type='submit'>create</button>
    </form>
  );
};

export default BlogForm;