import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postingGetList } from '../actions/postingActions';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { RenderDate } from '../components/RenderDate';

function RenderPosting ({posting}) {
    const date = new Date(posting.updatedAt !== posting.createdAt ? posting.updatedAt : posting.createdAt);
    const dateInText = RenderDate(date);
    const postingText = posting.text && posting.text.length > 200 ? posting.text.substring(0,100)+'...' : posting.text;

    return (
        <div className="grid__item">
            <a href={`/postings/${posting._id}`}>
                <h2 className="grid__item__title content__title">{posting.title}</h2>
                <h4 className="grid__item__subtitle content__text">{posting.updatedAt !== posting.createdAt ? 'updated on '+dateInText : 'written on '+dateInText}</h4>
                <img src={posting.image} alt={posting.title} className="grid__item__img"/>
                <h4 className="content__text">
                    <span 
                        dangerouslySetInnerHTML={{
                            __html: postingText
                        }}
                    ></span>
                </h4>
            </a>
            <Link className="content__text" to={`/postings/${posting._id}`}><h6 className="content__text grid__item__readmore">read more</h6></Link>
            <div className="row left margin__vertical__small">
                <p style={{fontSize: '.9rem'}}>{posting.liked && posting.liked.length} liked</p>
            </div>
                
        </div>
    );
}


export default function Search({search}) {
    const dispatch = useDispatch();
    const postingList = useSelector(state => state.postingList);
    const { loading, postings, error } = postingList;
    const searchedPostings = postings && postings.filter(posting => posting.title.includes(search) || posting.text.includes(search) || posting.hashtags.includes(search));

    useEffect(() => {
        dispatch(postingGetList());
    }, [dispatch]);

    return (
        <div className="container__full">
            <div className="container__long">
                <div className="row margin__left__big">
                    <h5 className="content__text margin__vertical__small">You searched  
                        <span style={{fontStyle: 'italic', fontWeight: '600'}}>
                        {searchedPostings && searchedPostings.length > 0 ? '  "'+search + `" : ${searchedPostings.legnth} found` :  '  "'+search + '" : 0 found'}
                        </span>
                    </h5>
                    
                </div>
                <div className="page__grid">
                    {loading ? <Loading />
                    : error ? <Message message="error">{error}</Message>
                    : searchedPostings && searchedPostings.map(posting => <RenderPosting key={posting._id} posting={posting} />)}
                </div>
            </div>
        </div>
    )
};
