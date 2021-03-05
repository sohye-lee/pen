import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { blogGetList, deleteBlog, updateBlog } from '../actions/blogActions';
import { deletePosting, postingGetList, updatePosting } from '../actions/postingActions';
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function AdminContents(props) {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const blogList = useSelector(state => state.blogList);
    const { loading: loadingBlogs, blogs, error: errorBlogs } = blogList;
    const postingList = useSelector(state => state.postingList);
    const { loading: loadingPostings, postings, error: errorPostings } = postingList;

    const [isBlogFeatured, setBlogFeatured] = useState(null);
    const [isPostingFeatured, setPostingFeatured] = useState(null);

    const updateBlogHandler = (blog) => {
        dispatch(updateBlog({...blog, featured: isBlogFeatured}));
    }

    const updatePostingHandler = (posting) => {
        dispatch(updatePosting({...posting, featured: isPostingFeatured}));
    }

    const deleteBlogHandler = (blog) => {
        if (window.confirm(`Are you sure you wish to delete blog ${blog.title}?`)) {
            dispatch(deleteBlog(blog._id))
        }
    }

    const deletePostingHander = (posting) => {
        if (window.confirm(`Are you sure you wish to delete blog ${posting.title}?`)) {
            dispatch(deletePosting(posting._id))
        }
    }

    const renderBlog = (blog) => {
        return(
            <tr key={blog._id} className="admin__row">
                {/* <td>{blog._id}</td> */}
                <td>
                    <Link to={`/blogs/${blog._id}`}><h5 className="content__text">{blog.title}</h5></Link>
                </td>
                <td>
                    <Link to={`/users/${blog.author._id}`} className="content__text" style={{color: 'var(--Black)'}}>{blog.author.username}</Link>
                </td>
                <td style={{textAlign: 'center'}}>
                    <form className="row between" onSubmit={() => updateBlogHandler(blog)}>
                        <input 
                            type="radio" name="featured" id={blog._id+"yes"} 
                            value={true}  defaultChecked={blog.featured && 'defaultChecked'} className="margin__right__xsmall"
                            onClick={(e) => setBlogFeatured(e.target.value)}
                        />
                        <label htmlFor={blog._id+"yes"} className="margin__right__xsmall">Yes</label>
                        <input 
                            type="radio" name="featured" id={blog._id+"no"} 
                            value={false}  defaultChecked={!blog.featured && 'defaultChecked'} className="margin__right__xsmall"
                            onClick={(e) => setBlogFeatured(e.target.value)}
                        />
                        <label htmlFor={blog._id+"no"} className="margin__right__xsmall">No</label>
                        <button className="btn xsmall btn__cancel" type="submit" style={{width: "5rem"}}>Update</button>
                    </form>
                </td>
                <td>
                    <button className="btn xsmall btn__cancel" onClick={() => deleteBlogHandler(blog)}>Delete</button>
                </td>
            </tr>
        )
    }

    const renderPosting = (posting) => {
        return(
            <tr key={posting._id} className="admin__row">
                {/* <td>{posting._id}</td> */}
                <td>
                    <Link to={`/postings/${posting._id}`}>{posting.title}</Link>
                </td>
                <td>
                    <Link to={`/users/${posting.author._id}`} className="content__text" style={{color: 'var(--Black)'}}>{posting.author.username}</Link>
                </td>
                <td style={{textAlign: 'center'}}>
                    <form className="row between" onSubmit={() => updatePostingHandler(posting)}>
                        <input 
                            type="radio" name="featured" id={posting._id+"yes"} 
                            value={true}  defaultChecked={posting.featured && 'defaultChecked'} className="margin__right__xsmall"
                            onClick={(e) => setPostingFeatured(e.target.value)}
                        />
                        <label htmlFor={posting._id+"yes"} className="margin__right__xsmall">Yes</label>
                        <input 
                            type="radio" name="featured" id={posting._id+"no"} 
                            value={false}  defaultChecked={!posting.featured && 'defaultChecked'} className="margin__right__xsmall"
                            onClick={(e) => setPostingFeatured(e.target.value)}
                        />
                        <label htmlFor={posting._id+"no"} className="margin__right__xsmall">No</label>
                        <button className="btn xsmall btn__cancel" type="submit">Update</button>
                    </form>
                </td>
                <td>
                    <button className="btn xsmall btn__cancel" onClick={() => deletePostingHander(posting)}>Delete</button>
                </td>
            </tr>
        )
    }
    
    useEffect(() => {
        if (!userInfo) {
            props.history.push('/login');
            alert("You need to login first!")
        }

        if (userInfo && !userInfo.isAdmin) {
            props.history.push('/');
            alert('You must be an admin user to access this page!');
        }

        dispatch(blogGetList());
        dispatch(postingGetList());

    }, [dispatch, userInfo, props.history])
    
    return (
        <div className="container__full">

            <div className="row top between">
                <div className="admin__blogs margin__horizontal__big margin__vertical__big container__long">
                    <h2 class="admin__title">blogs</h2>
                    <table>
                        <thead>
                            <tr className="admin__row">
                                {/* <th>id</th> */}
                                <th>title</th>
                                <th>author</th>
                                <th>featured</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingBlogs && <Loading />}
                            {errorBlogs && <Message message="error">{errorBlogs.message}</Message>}
                            {blogs ? blogs.map(blog => renderBlog(blog)) : "No Blog Found"}
                        </tbody>
                    </table>
                </div>

                <div className="admin__postings margin__horizontal__big margin__vertical__big">
                    <h2 class="admin__title">postings</h2>
                    
                    <table>
                        <thead>
                            <tr className="admin__row">
                                {/* <th>id</th> */}
                                <th>title</th>
                                <th>author</th>
                                <th>featured</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingPostings && <Loading />}
                            {errorPostings && <Message message="error">{errorPostings.message}</Message>}
                            {postings ? postings.map(posting => renderPosting(posting)) : "No Posting Found"}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};
