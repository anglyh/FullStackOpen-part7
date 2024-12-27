import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Togglable from './Togglable';
import { useRef } from 'react';
import BlogForm from './BlogForm';

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  const blogsSortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes);

  const blogFormRef = useRef();
  const toggleVisibility = () => blogFormRef.current.toggleVisibility();

  return (
    <>
      <Togglable buttonLabel='add blog' ref={blogFormRef}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>
      <ul className='blogList'>
        {blogsSortedByLikes.map((blog) => (
          <li className="blog" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogList;
