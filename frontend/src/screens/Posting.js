import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { createComment, deleteComment, editComment } from '../actions/commentActions';
import { deletePosting, getPostingDetails, likePosting } from '../actions/postingActions';
import { profile } from '../actions/userActions';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { RenderDate } from '../components/RenderDate';

export default function Posting(props) {
    const dispatch = useDispatch();
    const postingId = props.match.params.postingId;
    const postingDetails = useSelector(state => state.postingDetails);
    const { loading, posting, error } = postingDetails;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const postingDelete = useSelector(state => state.postingDelete);
    const { loading: loadingDelete, error: errorDelete } = postingDelete;
    const postingLike = useSelector(state => state.postingLike);
    const { posting: postingLiked } = postingLike;
    const userProfile = useSelector(state => state.userProfile);
    const { user } = userProfile;
    const commentEdit = useSelector(state => state.commentEdit);
    const { loading: loadingCommentEdit, success: successCommentEdit, error: errorCommentEdit } = commentEdit;
    const commentDelete = useSelector(state => state.commentDelete);
    const { success: successCommentDelete, error: errorCommentDelete } = commentDelete;
    

    const [ isOpen, setIsOpen ] = useState(false);
    const [ editFormOpen, setEditFormOpen ] = useState(false);
    const [text, setText] = useState('');
    const [textToEdit, setTextToEdit] = useState('');
    const [commentToEdit, setCommentToEdit] = useState('');

    const deletePostingHandler = (posting) => {
        if (window.confirm(`Are you sure you wish to delete "${posting.title}"?`)) {
            dispatch(deletePosting(postingId));
            props.history.push(`/blogs/${posting.blog._id}`);
        }
    }

    const openFormHandler = () => {
        setIsOpen(true);
        dispatch(profile(userInfo._id));
    };

    const leaveCommentHandler = () => {
        dispatch(createComment(postingId, text));
    }

    const editFormOpenHandler = (comment) => {
        setEditFormOpen(true)
        setCommentToEdit(comment._id);
        setTextToEdit(comment.text);
    }

    const editCommentHandler = (commentId) => {
        const text = textToEdit;
        dispatch(editComment(postingId, commentId, text));
    }

    const deleteCommentHandler = (commentId) => {
        if (window.confirm('Are you sure you wish to delete this comment?'))
        dispatch(deleteComment(postingId, commentId))
    }

    const likePostingHandler = (postingId, userId) => {
        if (userId !== posting.author._id) {
            dispatch(likePosting(postingId, userId));
        }
    };

    const renderComment = (comment) => {        
        return (
            <div className="posting__comment" key={comment._id+Date.toString()}>
                <div className="posting__comment__author"> 
                    <img src={comment.author.image} className="thumbnail__xsmall" alt={comment.author.username} />
                    <h3 className="posting__comment__username">{comment.author.username}</h3>
                </div>
                <div className="posting__comment__content">
                    <p className="posting__comment__text">{comment.text}</p>
                    <p className="posting__comment__date">{RenderDate(comment.createdAt)}</p>
                </div>
                {userInfo._id === comment.author._id &&
                <div className="content__buttons row right">
                    <button className="grid__item__btn btn" onClick={() => editFormOpenHandler(comment)}><i className="fa fa-pencil" /></button>
                    <button className="grid__item__btn btn" onClick={() => deleteCommentHandler(comment._id)}><i className="fa fa-trash-o" /></button>
                </div>}
            </div>
        );
    }

    if (errorCommentDelete) {
        alert("Cannot delete your comment. Please try again!")
    }

    useEffect(() => {
        dispatch(getPostingDetails(postingId));
        setIsOpen(false);
        setText('');
  
    }, [dispatch, postingId, successCommentDelete, successCommentEdit,  userInfo])

    return (
        <div className="container__long">
            {loading ? <Loading /> 
            : error ? <Message message="error">{error}</Message>
            : !posting ? <h3>Posting not found. Please try again.</h3> 
            : 
            <div className="container__long">

                {/* POSTING HEADER */}
                <div className="page__header black">
                    <Link to={`/category/${posting.category}`}><h5 className="page__corner__right posting__category">CATEGORY / {posting.category.toUpperCase()}</h5></Link>
                    <div className="posting__header">
                        <div className="posting__header__content">
                            <h5 className="row left content__text margin__vertical__big">{RenderDate(posting.createdAt)}</h5>
                            <Link to={`/users/${posting.author._id}`}> 
                                <div className="row left">
                                    <img src={posting.author.image} className="thumbnail__xsmall" alt={posting.author.username} /> 
                                    <h4 className="posting__author">{posting.author.username}</h4>
                                </div>
                            </Link>
                            <h1 className="row left posting__title">{posting.title}</h1>
                            <div className="posting__subtitle content__text ">
                                <h5>in </h5> 
                                <Link to={`/blogs/${posting.blog._id}`} ><h5 className="page__author__name margin__left__small posting__blog"> {posting.blog.title}</h5></Link>
                            </div>
                            {/* If author, edit and delete button */}
                            {userInfo && userInfo._id === posting.author._id && 
                            <div className="page__corner__rightbottom">
                                <Link to={`/postings/${postingId}/edit`}><button className="btn__posting">edit</button></Link>
                                <button className="btn__posting" onClick={() => deletePostingHandler(posting)}>
                                    {loadingDelete ? <Loading />
                                    : 'delete'}
                                </button>
                            </div>}
                            {errorDelete && <Message message="error">{errorDelete}</Message>}
                        </div>
                    </div>
                    <img className="page__image separate" src={posting.image} alt={posting.title} />
                </div>

                {/* POSTING CONTENT */}
                <div className="posting__content">
                    
                    <p className="posting__text">
                        <span dangerouslySetInnerHTML={{ __html: posting.text }} />
                    </p>
                    <p className="margin__vertical__big">{posting.hashtags && posting.hashtags.map(hashtag => <span style={{marginRight: '.5rem'}}>#{hashtag}</span>)}</p>
                    <div className="row between">
                        <button className="posting__liked" onClick={() => likePostingHandler(postingId, userInfo._id)}>{postingLiked? postingLiked.liked.length + ' liked' : posting.liked? posting.liked.length + ' liked':'0 liked'}</button>
                    </div>
                    <div className="posting__bar"></div>
                    <div className="posting__comments">
                        <p>{posting.comments && posting.comments.map(comment => renderComment(comment))}</p>
                    </div>

                    {/* Button : if click, comment form opens and button disappear */}
                    {  (userInfo) && editFormOpen === false 
                        ? 
                        isOpen === false 
                        ? (<button 
                                className="btn__posting content__text margin__vertical__big"
                                onClick={openFormHandler}
                           >
                            leave comment
                           </button>)
                        : (<form onSubmit={leaveCommentHandler} className="posting__comment__form">
                            <div className="row left posting__comment__author">
                                <img className="thumbnail__xsmall" src={user && user.image} alt="user" />
                                <h3 className="posting__comment__username">{userInfo.username}</h3>
                            </div>
                            <input 
                                type="text"
                                id="text"
                                placeholder="leave your comment"
                                className="form__input posting__comment__text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <div className="row left">
                                <button className="margin__right__small btn small" type="submit">submit</button>
                                <button className="btn small btn__red" onClick={() => setIsOpen(false)}>cancel</button>
                            </div>
                          </form>)
                          : <></>
                    } 
                    {editFormOpen && 
                    (<form onSubmit={() => editCommentHandler(commentToEdit)} className="posting__comment__form">
                        <div className="row left posting__comment__author">
                            {/* <img className="thumbnail__xsmall" src={user && user.image} alt="user" /> */}
                            <h3 className="posting__comment__username">Edit your comment, {userInfo.username}</h3>
                        </div>
                        <input 
                            type="text"
                            id="text"
                            placeholder="leave your comment"
                            className="form__input posting__comment__text"
                            value={textToEdit}
                            onChange={(e) => setTextToEdit(e.target.value)}
                        />
                        <div className="row left">
                            <button className="margin__right__small btn small" type="submit">update</button>
                            <button className="btn small btn__red" onClick={() => setEditFormOpen(false)}>cancel</button>
                        </div>
                    </form>)}
                    {loadingCommentEdit && <Loading />}
                    {errorCommentEdit && <Message message="error">{errorCommentEdit}</Message>}
                </div>
 
            </div>}
            
        </div>
    )
}
