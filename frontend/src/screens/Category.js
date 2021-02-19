import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postingGetList } from '../actions/postingActions';

export default function Category(props) {
    const dispatch = useDispatch();
    const categoryId = props.match.params.categoryId;
    const postingList = useSelector(state => state.postingList);
    const { loading, postings, error } = postingList;
    const postingsInCategory = postings.category._id === categoryId


    const renderPosting = (posting) => {
        const postingTextShort = posting.text.length > 400 ? posting.text.substring(0,400)+'...' : posting.text;
        
        return (
            <div className="main__posting" key={posting._id}>
                <Link to={`/postings/${posting._id}`}>
                    <img className="content__img" src={posting.image} alt="sectionimage"/> 
                    <h3 className="content__title">{posting.title}</h3>
                </Link>
                <h5>in <span className="italic">{posting.blog.title}</span></h5>
                <div className="row right content__subtitle">
                    <p className="content__text">- {posting.author.username}</p>
                </div>
                <div className="content__subtitle">
                    <h4 className="content__text row left">
                        <span 
                            dangerouslySetInnerHTML={{
                                __html:postingTextShort
                            }}
                        />
                    </h4>
                    <Link to={`/postings/${posting._id}`}>
                        <h5 className="grid__item__readmore content__text">read more</h5>
                    </Link>
                </div>
                <div className="content__subitle margin__vertical__small">
                    <p>{posting.hashtags && posting.hashtags.map(hashtag => (
                        hashtag !== '' && <span key={hashtag}>#{hashtag} </span>
                    ))}</p>
                </div>
                <div className="row left ">
                    <p className="content__liked">{posting.liked.length} liked</p>
                    <p className="content__liked">{posting.comments.length} comments</p>
                </div>
            </div>
        )
    }

    useEffect(() => {
        dispatch(postingGetList());

    }, [dispatch])

    return (
        <div className="container__full">
            <div className="container__horizontal category__container">
                <h3 className="section__title">
                    
                </h3>
            </div>
        </div>
    )
};
