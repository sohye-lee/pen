import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getBlogDetails } from '../actions/blogActions';
import { addFollow, getFollows } from '../actions/followActions';
import { deletePosting, postingGetList } from '../actions/postingActions';
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
    const postingDelete = useSelector(state => state.postingDelete);
    const { success: postingDeleteSuccess } = postingDelete;
    const myPostings = postings && postings.filter(posting => posting.blog._id === blogId);
    const followList = useSelector(state => state.followList);
    const { follows } = followList;
    const followAdd = useSelector(state => state.followAdd);
    const { success: successFollowAdd } = followAdd;
    
    const followsForThisBlog = follows && follows.filter(follow => follow.blogs.includes(blogId));

    const followHandler = () => {
        dispatch(addFollow(blogId));
    };

    const editHandler = () => {
        props.history.push(`/blogs/${blogId}/edit`)
    };

    const deletePostingHandler = (posting) => {
        if (window.confirm(`Are you sure you wish to delete "${posting.title}"?`)) {
            dispatch(deletePosting(posting._id))
            props.history.push(`/blogs/${blogId}`);
        } 
        props.history.push(`/blogs/${blogId}`)
    };

    const renderPosting = (posting) => {
        const date = new Date(posting.updatedAt !== posting.createdAt ? posting.updatedAt : posting.createdAt);
        const dateInText = RenderDate(date);
        const postingText = posting.text.length > 200 ? posting.text.substring(0,100)+'...' : posting.text;

        return (
            <div className="grid__item"  key={posting._id}>
                <Link to={`/postings/${posting._id}`}>
                    <h2 className="grid__item__title content__title">{posting.title}</h2>
                    <h4 className="grid__item__subtitle content__text">{posting.updatedAt !== posting.createdAt ? 'updated on '+dateInText : 'written on '+dateInText}</h4>
                    <img src={posting.image} alt={posting.title} className="grid__item__img"/>
                    <h4 className="content__text">
                        <span 
                            dangerouslySetInnerHTML={{
                                __html: postingText
                            }}
                        />
                    </h4>
                </Link>
                <Link className="content__text" to={`/postings/${posting._id}`}><h6 className="content__text grid__item__readmore">read more</h6></Link>
                <div className="row left margin__vertical__small">
                    <p style={{fontSize: '.9rem'}}>{posting.liked.length} liked</p>
                </div>

                {/* If user is author, buttons appear */}
                {userInfo && userInfo._id === blog.author._id
                ? 
                <div className="content__buttons row right">
                    <Link to={`/postings/${posting._id}/edit`}><button className="grid__item__btn btn"><i className="fa fa-pencil" /></button></Link>
                    <button className="grid__item__btn btn" onClick={() => deletePostingHandler(posting)}><i className="fa fa-trash-o" /></button>
                </div>
                : <></>}
                    
            </div>
        );
    };


    
    useEffect(() => {
        dispatch(getBlogDetails(blogId));
        dispatch(postingGetList());
        dispatch(getFollows());
    }, [dispatch, blogId, successFollowAdd, postingDeleteSuccess]);

    return (
        <div className="container__long">
            {loading ? <Loading />
            : error ? <div><Message message="error">{error}</Message></div>
            : !blog ? <h3>Blog not found. Please try again</h3>
            :
            <div className="container__long">

                {/* BLOG HEADER */}
                <div className="page__header">
                    <img src={blog.image} className="page__image" alt={`${blog.title}`} />
                    <h5 className="page__corner__left">CATEGORY / {blog.category.toUpperCase()}</h5>
                    <Link to={`/authors/${blog.author._id}`}>
                        <div className="page__author">
                            <h4 className="content__text margin__vertical__small">created on {RenderDate(blog.createdAt)}</h4>
                            <h4> by <span className="page__author__name margin__vertical__small content__text">{blog.author.username}</span></h4>
                        </div>
                    </Link>
                    <h1 className="page__title">{blog.title}</h1>
                    <h6 className="content__text">{blog.description}</h6>
                    <div className="row center margin__vertical__small">
                        <h4 className="content__text">followed by {followsForThisBlog && followsForThisBlog.length > 1 ? followsForThisBlog.length+' readers' : followsForThisBlog.length+' reader'} 
                        {userInfo && followsForThisBlog && followsForThisBlog.filter(follow => follow.user === userInfo._id).length > 0
                            && <span className="italic"> - now following</span>}
                        </h4>
                        {userInfo  
                        && (userInfo._id !== blog.author._id) 
                        && followsForThisBlog.filter(blog => blog.user === userInfo._id).length === 0
                        && <button className="btn__follow content__text" onClick={followHandler}> + follow</button>}
                    </div>

                    {/* If user is the author, edit button shows */}
                    {userInfo && userInfo._id === blog.author._id ?
                    <div className="margin__vertical__small row center">
                        <Link to={`/blogs/${blog._id}/edit`}>
                            <button className="btn__follow content__text" onClick={editHandler}>edit blog</button>
                        </Link>
                        <Link to="/write">
                            <button className="btn__follow content__text">write</button>
                        </Link>
                    </div>
                    :<></>}
                    
                    <h5 className="page__corner__rightbottom page__category">{myPostings? myPostings.length : '0'} postings</h5>
                </div>
                
                {/* BLOG'S POSTING LIST */}
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
