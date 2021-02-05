import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getBlogDetails } from '../actions/blogActions';
import { addFollow, getFollows } from '../actions/followActions';
import { postingGetList } from '../actions/postingActions';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { RenderDate } from '../components/RenderDate';

export default function Blog(props) {
    const blogId = props.match.params.blogId;
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const blogDetails = useSelector(state => state.blogDetails);
    const { loading, blog, error } = blogDetails;
    const postingList = useSelector(state => state.postingList);
    const { postings, loading: loadingPostings, error: errorPostings } = postingList;
    const myPostings = postings ? postings.filter(posting => posting.blog._id === blogId): [];
    const followList = useSelector(state => state.followList);
    const { follows } = followList;
    const blogFollows = follows ? follows.filter(follow => follow.blogs.includes(blogId)) : [];
    const followAdd = useSelector(state => state.followAdd);
    const { success: successFollowAdd } = followAdd;

    const renderPosting = (posting) => {
        const date = new Date(posting.updatedAt ? posting.updatedAt : posting.createdAt);
        const dateInText = RenderDate(date);

        return (
            <Link to={`/postings/${posting._id}`}>
                <div className="grid__item">
                    <h2 className="grid__item__title">{posting.title}</h2>
                    <h4 className="grid__item__subtitle content__text">{posting.updatedAt ? 'updated on '+dateInText : 'written on '+dateInText}</h4>
                    <img src={posting.image} alt={posting.title} className="grid__item__img"/>
                </div>
            </Link>
        );
    };

    const followHandler = () => {
        dispatch(addFollow(blogId));
    };
    
    useEffect(() => {
        dispatch(getBlogDetails(blogId));
        dispatch(postingGetList());
        dispatch(getFollows());
    }, [dispatch, blogId, successFollowAdd])

    return (
        <div className="container__long">
            {loading ? <Loading />
            : error ? <div><Message message="error">{error}</Message></div>
            : !blog ? <h3>Blog not found. Please try again</h3>
            :
            <div className="container__long">
                <div className="page__header">
                    <img src={blog.image} className="page__image" alt={`${blog.title}`} />
                    <h5 className="page__corner__left">CATEGORY / {blog.category.toUpperCase()}</h5>
                    <Link to={`/users/${blog.author._id}`}>
                        <div className="row center page__thumbnail">
                            <img src={blog.author.image} alt={`author ${blog.author.username}`} className="thumbnail__small" /> 
                            <h2>{blog.author.username}</h2>
                        </div>
                    </Link>
                    <h1 className="page__title">{blog.title}</h1>
                    <div className="row center">
                        <h3 className="page__subtitle">followed by {blogFollows.length > 1 ? blogFollows.length+' readers' : blogFollows.length+' reader'}
                        {blogFollows.filter(blog => blog.user === userInfo._id).length > 0
                            && <span className="italic"> - now following</span>}
                        </h3>
                        {userInfo 
                        && (userInfo._d !== blog.author._id) 
                        && blogFollows.filter(blog => blog.user === userInfo._id).length === 0
                        && <button className="btn__follow" onClick={followHandler}> + follow</button>}
                        
                    </div>
                </div>
                <div className="page__content">
                    {loadingPostings && <Loading />}
                    {errorPostings && <Message message="error">{errorPostings}</Message>}
                    <div className="page__grid">
                        {myPostings && myPostings.map(posting => renderPosting(posting))}
                    </div>
                </div>
            </div>
            }
            
            
        </div>
    )
};
