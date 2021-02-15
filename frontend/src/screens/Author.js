import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { blogGetList } from '../actions/blogActions';
import { postingGetList } from '../actions/postingActions';
import { profile } from '../actions/userActions';
import Loading from '../components/Loading';
import Message from '../components/Message';

function RenderBlog ({blog, postings, follows}) {
    const myFollows = follows ? follows.filter(follow => follow.blogs.includes(blog._id)) : [];
    const myFollowNum = myFollows.length;
    const postingNum = postings && postings.filter(posting => posting.blog === blog._id).length;
    return (
        <Link to={`/blogs/${blog._id}`} >
            <div className="content__container author__item">
                <div className="content__subtitle">
                    <p className="content__category">CATEGORY / {blog.category}</p>
                </div>
                <div className="row between">
                    <div className="author__item__titlebox">
                        <h1 className="content__title">{blog.title}</h1>
                        <h4 className="content__text"> - {blog.description}</h4>
                    </div>
                    <div className="author__item__details">
                        <p className="content__text">{postingNum} stories</p>
                        <p>{myFollowNum > 1 ? myFollowNum + ' followers' : myFollowNum + ' follower'}</p>
                    </div>
                </div>
                <div className="content__subtitle">
                </div>
            </div>
        </Link>
    )
};

function RenderPosting ({posting}) {
    const postingTextShort = posting.text.length > 1000 ? posting.text.substring(0,200)+'...' : posting.text;
    return (
        <div className="content__container" key={posting._id}>
            <p className="content__text">published in <span style={{fontWeight: '600', fontStyle: 'italic'}}>{posting.blog.title}</span></p>
            <h1 className="content__title">{posting.title}</h1>
            {/* <div className="content__subtitle">
                <h4 className="content__category">{posting.category}</h4>
            </div>    */}
            {/* <h5>in <span className="italic">{posting.blog.title}</span></h5> */}
            <img className="content__img" src={posting.image} alt={posting.title}/>
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
            <div className="row right content__subtitle">
                <p>{posting.liked.length} liked</p>
            </div>
            <div className="content__buttons">
                <Link to={`/postings/${posting._id}`}>
                    <h4 className="grid__item__readmore content__text">read more</h4>
                </Link>
            </div>
        </div>
    )
}
export default function Author(props) {
    const dispatch = useDispatch();
    const userId = props.match.params.userId;
    const userProfile = useSelector(state => state.userProfile);
    const { loading, user, error } = userProfile;
    const blogList = useSelector(state => state.blogList);
    const { loading: loadingBlogs, blogs, error: errorBlogs } = blogList; 
    const postingList = useSelector(state => state.postingList);
    const { loading: loadingPostings, postings, error: errorPostings } = postingList;
    const myBlogs = blogs && blogs.filter(blog => blog.author._id === userId);
                  
    const myPostings = postings && postings.filter(posting => posting.author._id === userId);
    const followList = useSelector(state => state.followList);
    const { follows } = followList;


    useEffect(() => {
        dispatch(profile(userId));
        dispatch(blogGetList());
        dispatch(postingGetList());
    }, [dispatch, userId])

    return (
        <div className="container__long">
            {loading ? <Loading />
            : error ? <Message message="error">{error}</Message>
            : user ? 
            (<div className="author__container">
                <div className="author__left">
                    <div className="author__profile">
                        <img src={user.image} alt="author" className="author__thumbnail" />
                        <p style={{color: "var(--LightGray)", fontSize: ".7rem"}}>ABOUT</p>
                        <h4 className="author__username">{user.username}</h4>
                    </div>
                </div>
                <div className="author__right">
                    {/* <div className="author__blogs">
                        {loadingBlogs && <Loading />}
                        {errorBlogs && <Message message="error">{errorBlogs}</Message>}
                        {myBlogs && myBlogs.length > 0 
                        ? myBlogs.map(blog => <RenderBlog blog={blog} postings={myPostings} follows={follows} key={blog._id} />)
                        : <h3 className="content__text">0 blogs found</h3>}
                    </div> */}
                    <div className="author__postings">
                        {loadingPostings && <Loading />}
                        {errorPostings && <Message message="error">{errorPostings}</Message>}
                        {myPostings && myPostings.length > 0
                        ? myPostings.map(posting => <RenderPosting posting={posting} />)
                        : <h3 className="content__text">0 posting found</h3>}
                    </div>
                </div>
            </div>)
            : <div className="author__container">
                <h3>Can't find the author. Please try later.</h3>
            </div>}
        </div>
    )
};
