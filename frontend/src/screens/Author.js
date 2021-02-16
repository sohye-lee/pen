import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { blogGetList } from '../actions/blogActions';
import { postingGetList } from '../actions/postingActions';
import { profile } from '../actions/userActions';
import Loading from '../components/Loading';
import Message from '../components/Message';

function RenderPosting ({posting}) {
    const postingTextShort = posting.text.length > 1000 ? posting.text.substring(0,1000)+'...' : posting.text;
    return (
        <div className="content__container author__posting" key={posting._id}>
            <Link to={`/blogs/${posting.blog._id}`} >
                <p className="content__text">published in <span style={{fontWeight: '600', fontStyle: 'italic'}}>{posting.blog.title}</span></p>
            </Link>
            <h1 className="content__title">{posting.title}</h1>
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
    const postingList = useSelector(state => state.postingList);
    const { loading: loadingPostings, postings, error: errorPostings } = postingList;
                  
    const myPostings = postings && postings.filter(posting => posting.author._id === userId);

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
                        <img src={user.image} alt="author" className="author__thumbnail author__line" />
                        <div className="author__text">
                            <p style={{color: "var(--LightGray)", fontSize: ".7rem"}}>ABOUT</p>
                            <h3 className="author__username author__line">{user.username}</h3>
                            <h6 className="content__text author__line">{user.introduction}</h6>
                            <p className="author__line">{user.email}</p>
                        </div>
                        
                    </div>
                </div>
                <div className="author__right">
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
