import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postingGetList } from '../actions/postingActions';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { CATEGORIES } from '../category';
import { Link } from 'react-router-dom';

export default function Main() {
    const dispatch = useDispatch();
    const postingList = useSelector(state => state.postingList);
    const { loading: loadingPostings, postings, error: errorPostings } = postingList;
    const categories = CATEGORIES;
    let selectedCategories = []
    postings && postings.forEach((posting) => {
        if (!selectedCategories.includes(posting.category)) {
            selectedCategories.push(posting.category);
        }
    });

    const renderPosting = (posting) => {
        const postingTextShort = posting.text.length > 200 ? posting.text.substring(0,200)+'...' : posting.text;
        
        return (
            <div className="content__container" key={posting._id}>
                <Link to={`/postings/${posting._id}`}>
                    <img className="content__img" src={posting.image} alt="sectionimage"/> 
                    <div className="content__subtitle">
                        <h4 className="content__category">{posting.category}</h4>
                    </div>   
                    <h3 className="content__title">{posting.title}</h3>
                </Link>
                <h5>in <span className="italic">{posting.blog.title}</span></h5>
                <div className="row right content__subtitle">
                    <p style={{}}>{posting.like} liked</p>
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
                
                <div className="content__subitle margin__vertical__big">
                    <p>{posting.hashtags && posting.hashtags.map(hashtag => (
                        hashtag !== '' && <span key={hashtag}>#{hashtag} </span>
                    ))}</p>
                </div>
                

                {/* <div className="content__buttons">
                    
                </div> */}
            </div>
        )
    }

    const renderCategory = (category) => {
        const postingsInCategory = postings.filter(posting => posting.category === category);
        return (
            <div className="section section__small margin__right__small">
                    <div className="section__title">{category} <span className="title__tab">ii</span></div>
                    <div className="section__content">
                        <div className="content__container">
                            {postingsInCategory && postingsInCategory.length > 0
                            && postingsInCategory.map(posting => renderPosting(posting))}
                        </div>
                    </div>
            </div>
        )
    }

    useEffect(() => {
        dispatch(postingGetList());
    },[dispatch]);
    
    return (
        <div className="container__full">
            {loadingPostings && <Loading />}
            {errorPostings && <Message message="error">{errorPostings}</Message>}
            {postings &&
            <div className="container__horizontal">
                {selectedCategories.map(category => renderCategory(category))}
            </div>
            }
           
        </div>
    )
};
