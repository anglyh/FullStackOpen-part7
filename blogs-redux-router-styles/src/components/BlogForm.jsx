import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogReducer';
import { setMessage } from '../reducers/notificationReducer';

const BlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch();

  const titleRef = useRef();
  const authorRef = useRef();
  const urlRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      url: urlRef.current.value,
    };

    dispatch(addBlog(newBlog));
    titleRef.current.value = '';
    authorRef.current.value = '';
    urlRef.current.value = '';

    toggleVisibility();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="formInput">
        title:
        <input
          type='text'
          name='blog-title'
          data-testid='blog-title'
          ref={titleRef}
        />
      </div>

      <div className="formInput">
        author:
        <input
          type='text'
          name='blog-author'
          data-testid='blog-author'
          ref={authorRef}
        />
      </div>

      <div className="formInput">
        url:
        <input
          type='text'
          name='blog-url'
          data-testid='blog-url'
          ref={urlRef}
        />
      </div>

      <button className="button" type='submit'>create</button>
    </form>
  );
};

export default BlogForm;
