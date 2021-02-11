import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postingGetList } from '../actions/postingActions';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

export default function Main() {
    const dispatch = useDispatch();
    const postingList = useSelector(state => state.postingList);
    const { loading: loadingPostings, postings, error: errorPostings } = postingList;
    let selectedCategories = []
    postings && postings.forEach((posting) => {
        if (!selectedCategories.includes(posting.category)) {
            selectedCategories.push(posting.category);
        }
    });

    const renderPosting = (posting) => {
        const postingTextShort = posting.text.length > 200 ? posting.text.substring(0,200)+'...' : posting.text;
        
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
                    <p style={{fontSize: '.9rem'}}>{posting.liked.length} liked</p>
                </div>
            </div>
        )
    }

    const renderCategory = (category) => {
        const postingsInCategory = postings.filter(posting => posting.category === category);
        return (
            <div className="main__category" key={category}>
                <div className="section__title">{category} <span className="title__tab">ii</span></div>
                <div className="section__content">
                    {postingsInCategory && postingsInCategory.length > 0
                    && postingsInCategory.map(posting => renderPosting(posting))}
                </div>
            </div>
        )
    };

    useEffect(() => {
        dispatch(postingGetList());
    },[dispatch]);
    
    return (
        <div className="main__container">
            {loadingPostings && <Loading />}
            {errorPostings && <Message message="error">{errorPostings}</Message>}
            {postings &&
            <div className="main__horizontal">
                {selectedCategories.map(category => renderCategory(category))}
            </div>}
        </div>
    )
};
