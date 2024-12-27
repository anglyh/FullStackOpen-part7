import { useDispatch } from 'react-redux';
import { addComment, deleteBlog, updateBlog } from '../reducers/blogReducer';

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('event in handleSubmit', event.target.comment.value);
    const comment = event.target.comment.value.trim();

    dispatch(addComment(blogId, { comment }));
    event.target.comment.value = '';
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="formInput">
        <input type="text" name="comment"/>
        <button className="button" >add comment</button>
      </div>
    </form>
  );
};

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

  if (!blog) {
    return null;
  }

  const handleLike = (blog) => {
    const blogLiked = { ...blog, likes: blog.likes + 1 };
    dispatch(updateBlog(blogLiked));
  };

  // const handleDelete = (blog) => {
  //   if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //     dispatch(deleteBlog(blog.id));
  //   }
  // };

  return (
    <>
      <h2>{blog.title} {blog.author}</h2>

      <a href="">{blog.url}</a>
      <p>{blog.likes} likes <button className="button like" onClick={() => handleLike(blog)}>like</button></p>

      added by {blog.user.name}

      <h3>comments</h3>
      <CommentForm blogId={blog.id}/>

      <ul>
        {blog.comments.map(comment =>
          <li key={comment}>{comment}</li>
        )}
      </ul>

      {/* {user.username === blog.user.username && (
        <button onClick={() => handleDelete(blog)}>remove</button>
      )} */}
    </>
  );
};

export default Blog;
