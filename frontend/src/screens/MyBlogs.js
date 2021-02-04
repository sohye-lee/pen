import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { blogGetList, deleteBlog } from '../actions/blogActions';
import { postingGetList } from '../actions/postingActions';
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function MyBlogs(props) {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const blogList = useSelector(state => state.blogList);
    const { loading:loadingBlogs, error:errorBlogs, blogs } = blogList;
    const postingList = useSelector(state => state.postingList);
    const { loading:loadingPostings, postings, error:errorPostings } = postingList;
    const blogDelete = useSelector(state => state.blogDelete);
    const { success: successDelete } = blogDelete;
 
    const myBlogs = blogs ? blogs.length === 1 ? [blogs] : blogs.filter(blog => blog.author._id === userInfo._id) : null;
    const myPostings = postings ? postings.filter(posting => posting.author._id === userInfo._id) : null;
    
    const deleteBlogHandler = (blog) => {
        if (window.confirm(`Are you sure you wish to delete '${blog.title}?'`)) {
            dispatch(deleteBlog(blog._id));
        }
    }

    if (!userInfo) {
        alert('You need to log in!');
        props.history.push('/login');
    }
     
    useEffect(() => {
        dispatch(blogGetList());
        dispatch(postingGetList());
    }, [dispatch, successDelete])
    

    const renderBlog = (blog) => (
        <div className="content__container" key={blog._id}>
            <img className="content__img" src="/noimage.jpg" alt="sectionimage"/>    
            <h3 className="content__title">{blog.title}</h3>
            <div className="row between content__subtitle">
                <p className="content__category">{blog.category}</p>
                <p>follow 0</p>
            </div>
            <div className="content__subtitle">
                <h4 className="content__text">{blog.description}</h4>
            </div>
            <Link to={`/blogs/${blog._id}`}><button className="btn small margin__right__small">see more</button></Link>
            <button className="btn small btn__red" onClick={() => deleteBlogHandler(blog._id)}>delete</button>
        </div>
    );

    const renderPosting = (posting) => (
        <div className="content__container">
            <img className="content__img" src="/noimage.jpg" alt="sectionimage"/>    
            <h3 className="content__title">{posting.title}</h3>
            <h4 className="content__subtitle">{posting.category}</h4>
            <h3 className="content__text">{posting.description}</h3>
            <div className="content__additional">
                <div className="row between">
                    <p>follow 0</p>
                    <p>{posting.like} liked</p>
                </div>
                <p>{posting.hashtags && posting.hashtags.map(hashtag => (
                    <span>#{hashtag} </span>
                ))}</p>
            </div>
            <Link to={`/blogs/${posting._id}`}><button className="btn small">see more</button></Link>
            <button className="btn small delete">delete</button>
        </div>
    )

    
    return (
        <div className="container__full">
            <div className="section section__big">
                <div className="section__title">my blogs <span className="title__tab">ii</span></div>
                <div className="section__content">
                    <div className="row right">
                        <Link to="/createblog">
                            <button className="btn small main">new</button>
                        </Link>
                    </div>
                    {loadingBlogs && <Loading />}
                    {errorBlogs && <Message message="error">{errorBlogs}</Message>}
                    {myBlogs ? myBlogs.map(blog => renderBlog(blog)) : <h3 className="content__text">0 blog found</h3>}
                </div>
            </div>

            <div className="section section__big">
                <div className="section__title">my postings <span className="title__tab">ii</span></div>
                <div className="section__content">
                    <div className="row right">
                        <Link to="/write">
                            <button className="btn small main">new</button>
                        </Link>
                    </div>
                    <div className="content__container">
                        {loadingPostings && <Loading />}
                        {errorPostings && <Message message="error">{errorPostings}</Message>}
                        {myPostings && myPostings.map(posting => renderPosting(posting))}
                    </div>
                </div>
            </div>
        </div>
    )
}
