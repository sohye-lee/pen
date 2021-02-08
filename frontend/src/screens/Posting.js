import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deletePosting, getPostingDetails } from '../actions/postingActions';
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
    const redirectPath = props.location.search 
        ? props.location.search.split('=')[1]
        : '/';

    const deletePostingHandler = (posting) => {
        if (window.confirm(`Are you sure you wish to delete "${posting.title}"?`)) {
            dispatch(deletePosting(postingId));
            props.history.push(redirectPath);
        }
    }

    useEffect(() => {
        dispatch(getPostingDetails(postingId));
    }, [dispatch, postingId])

    return (
        <div className="container__long">
            {loading ? <Loading /> 
            : error ? <Message message="error">{error}</Message>
            : !posting ? <h3>Posting not found. Please try again.</h3> 
            : 
            <div className="container__long">

                {/* POSTING HEADER */}
                <div className="page__header black">
                    <h5 className="page__corner__right posting__category">CATEGORY / {posting.category.toUpperCase()}</h5>
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
                            <div className="row left page__subtitle content__text ">
                                <h5>in </h5> 
                                <h5 className="page__author__name margin__vertical__small margin__left__small"> {posting.blog.title}</h5>
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
                    <p className=""><span dangerouslySetInnerHTML={{ __html: posting.text }} /></p>
                </div>

            </div>}
            
        </div>
    )
}
