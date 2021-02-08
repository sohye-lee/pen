import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { blogGetList, deleteBlog } from '../actions/blogActions';
import { getFollows } from '../actions/followActions';
import { deletePosting, postingGetList } from '../actions/postingActions';
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function MyBlogs(props) {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const blogList = useSelector(state => state.blogList);
    const { loading: loadingBlogs, error: errorBlogs, blogs } = blogList;
    const postingList = useSelector(state => state.postingList);
    const { loading:loadingPostings, postings, error:errorPostings } = postingList;
    const blogDelete = useSelector(state => state.blogDelete);
    const { loading: loadingBlogDelete, success: successBlogDelete, error: errorBlogDelete } = blogDelete;
    const postingDelete = useSelector(state => state.postingDelete);
    const { loading: loadingPostingDelete, success: successPostingDelete, error: errorPostingDelete } = postingDelete;
    const followList = useSelector(state => state.followList);
    const { follows } = followList;
    const myBlogs = blogs && blogs.filter(blog => blog.author._id === userInfo._id);
    const myPostings = postings ? postings.filter(posting => posting.author._id === userInfo._id) : null;
  
  
    const deleteBlogHandler = (blog) => {
        if (window.confirm(`Are you sure you wish to delete "${blog.title.toUpperCase()}"?`)) {
            dispatch(deleteBlog(blog._id));
            if (postings) {
                const blogPostings = postings.filter(posting => posting.blog._id === blog._id);
                if (blogPostings) {
                    blogPostings.forEach(posting => {
                    dispatch(deletePosting(posting._id))
                    }
                )}
            } 
        }
    };

    const deletePostingHandler = (posting) => {
        if (window.confirm(`Are you sure you wish to delete "${posting.title.toUpperCase()}"?`)) {
            dispatch(deletePosting(posting._id));
        }
    };

    useEffect(() => {
        if (!userInfo) {
            alert('You need to log in!');
            props.history.push('/login');
        }

        dispatch(blogGetList());
        dispatch(postingGetList());
        dispatch(getFollows());
        
    }, [userInfo, dispatch, successBlogDelete, successPostingDelete, props.history])
     
    const renderBlog = (blog) => {
        const myFollows = follows ? follows.filter(follow => follow.blogs.includes(blog._id)) : [];
        const myFollowNum = myFollows.length;
        return (
            <div className="content__container" key={blog._id}>
                <img className="content__img" src="/noimage.jpg" alt="sectionimage"/> 
                <div className="content__subtitle">
                    <p className="content__category">TOPIC/ {blog.category}</p>
                </div>
                <h3 className="content__title">{blog.title}</h3>
                <div className="row right content__subtitle">
                    <p>{myFollowNum > 1 ? myFollowNum + ' followers' : myFollowNum + ' follower'}</p>
                </div>
                <div className="content__subtitle">
                    <h4 className="content__text">{blog.description}</h4>
                </div>
                <Link to={`/blogs/${blog._id}`}>
                    <button className="btn small margin__right__small">see more</button>
                </Link>
                <button className="btn small btn__red" onClick={() => deleteBlogHandler(blog)}>
                    delete
                </button>
                {loadingBlogDelete && <Loading />}
                {errorBlogDelete && <Message message="error">{errorBlogDelete}</Message>}
            </div>
        )
    };

    const renderPosting = (posting) => {
        const postingTextShort = posting.text.length > 200 ? posting.text.substring(0,200)+'...' : posting.text;
        return (
            <div className="content__container" key={posting._id}>
                <img className="content__img" src="/noimage.jpg" alt="sectionimage"/> 
                <div className="content__subtitle">
                    <h4 className="content__category">{posting.category}</h4>
                </div>   
                <h3 className="content__title">{posting.title}</h3>
                <h5>in <span className="italic">{posting.blog.title}</span></h5>
                <div className="row right content__subtitle">
                    <p>{posting.like} liked</p>
                </div>
                <div className="content__subtitle">
                    <h4 className="content__text row left">
                        <span 
                            dangerouslySetInnerHTML={{
                                __html:postingTextShort
                            }}
                        />
            
                    </h4>
                </div>
                <div className="content__subitle">
                    <p>{posting.hashtags && posting.hashtags.map(hashtag => (
                        hashtag !== '' && <span key={hashtag}>#{hashtag} </span>
                    ))}</p>
                </div>
                <div className="content__buttons">
                    <Link to={`/postings/${posting._id}`}>
                        <button className="btn small margin__right__small">see more</button>
                    </Link>
                    <button className="btn small delete" onClick={() => deletePostingHandler(posting)}>
                        delete
                    </button>
                </div>
                
                {loadingPostingDelete && <Loading />}
                {errorPostingDelete && <Message message="error">{errorPostingDelete}</Message>}
            </div>
        )
    }

    
    return (
        <div className="container__full">
            <div className="section section__big">
                <div className="section__title">my blogs <span className="title__tab">ii</span></div>
                <div className="section__content">
                    <div className="row right">
                        <Link to="/createblog">
                            <button className="btn small main">+ add</button>
                        </Link>
                    </div>
                    {loadingBlogs 
                    ? <Loading />
                    : errorBlogs  
                    ? <Message message="error">{errorBlogs}</Message>
                    : myBlogs && myBlogs.length>0 ? myBlogs.map(blog => renderBlog(blog)) : <h3 className="content__text">0 blog found</h3>}
                </div>
            </div>

            <div className="section section__big">
                <div className="section__title">my postings <span className="title__tab">ii</span></div>
                <div className="section__content">
                    <div className="row right">
                        <Link to="/write">
                            <button className="btn small main">+ add</button>
                        </Link>
                    </div>
                    <div className="content__container">
                        {loadingPostings ? <Loading /> :
                        errorPostings ? <Message message="error">{errorPostings}</Message> :
                        myPostings && myPostings.length > 0
                        ? myPostings.map(posting => renderPosting(posting))
                        :<h3 className="content__text">0 posting found</h3>}
                    </div>
                </div>
            </div>
        </div>
    )
}
