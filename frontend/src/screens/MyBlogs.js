import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { blogGetList } from '../actions/blogActions';
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function MyBlogs() {
    const dispatch = useDispatch();
    const blogList = useSelector(state => state.blogList);
    const { loading:loadingBlogs, error:errorBlogs, blogs } = blogList
    useEffect(() => {
        dispatch(blogGetList());
    }, [dispatch])
    

    const renderBlog = (blog) => (
        <div className="content__container">
            <img className="content__img" src="/noimage.jpg" alt="sectionimage"/>    
            <h3 className="content__title">{blog.title}</h3>
            <div className="row between content__subtitle">
                <p className="">- {blog.category}</p>
                <p>follow 0</p>
            </div>
            <div className="content__subtitle">
                <h4 className="content__text">{blog.description}</h4>
            </div>
            <Link to={`/blogs/${blog._id}`}></Link><button className="btn small">see more</button>
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
            <button className="btn small">see more</button>
        </div>
    )

    
    return (
        <div className="container__full">
            <div className="section section__big">
                <div className="section__title">my blogs <span className="title__tab">ii</span></div>
                <div className="section__content">
                    <div className="row right">
                        <Link to="/addblog">
                            <button className="btn small main">new</button>
                        </Link>
                    </div>
                    {loadingBlogs && <Loading />}
                    {errorBlogs && <Message message="error">{errorBlogs}</Message>}
                    {blogs && blogs.map(blog => renderBlog(blog))}
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
                        <img className="content__img" src="/noimage.jpg" alt="sectionimage"/>
                        <h3 className="content__title">blog title</h3>
                        <h4 className="content__subtitle">category</h4>
                        <h3 className="content__text">
                            description is here <br />
                            description is here <br />
                            description is here <br />
                        </h3>
                        <div className="content__additional">
                            <p>follow 0</p>
                            <p>#hashtag #hashtag #hashtag #hashtag #hashtag</p>
                        </div>
                        <button className="btn small">see more</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
