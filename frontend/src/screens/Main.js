import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postingGetList } from '../actions/postingActions';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { blogGetList } from '../actions/blogActions';
import { getFollows } from '../actions/followActions';
// import { getCategoryList } from '../actions/categoryActions';

export default function Main({search}) {
    const dispatch = useDispatch();
    const postingList = useSelector(state => state.postingList);
    const { loading: loadingPostings, postings, error: errorPostings } = postingList;
    const blogList = useSelector(state => state.blogList);
    const { loading: loadingBlogs, blogs, error: errorBlogs } = blogList;
    const featuredBlogs =  blogs && blogs.filter(blog => blog.featured === true);
    const followList = useSelector(state => state.followList);
    const { follows } = followList;
    // const categoryList = useSelector(state => state.categoryList);
    // const { loading: loadingCategories, categories, error: errorCategories } = categoryList;

    let selectedCategories = []
    postings && postings.forEach((posting) => {
        if (!selectedCategories.includes(posting.category.name)) {
            selectedCategories.push(posting.category.name);
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
                    <p className="content__liked">{posting.liked.length} liked</p>
                    <p className="content__liked">{posting.comments.length} comments</p>
                </div>
            </div>
        )
    }

    const renderCategory = (categoryname) => {
        const postingsInCategory = postings.filter(posting => posting.category.name === categoryname);
        return (
            <div className="main__category" key={categoryname}>
                <div className="section__title">{categoryname} <span className="title__tab">ii</span></div>
                <div className="section__content">
                    {postingsInCategory && postingsInCategory.length > 0
                    && postingsInCategory.map(posting => renderPosting(posting))}
                </div>
            </div>
        )
    };

    const renderFeaturedBlogs = (blog) => {
        const blogFollows = follows && follows.filter(follow => follow.blogs.includes(blog._id));
        
        return (
            <div className="main__posting" key={blog._id}>
                <Link to={`/blogs/${blog._id}`}>
                    <img className="content__img" src={blog.image} alt="sectionimage"/> 
                    <h3 className="content__title">{blog.title}</h3>
                </Link>
                <div className="row right content__subtitle">
                    <p className="content__text">- {blog.author.username}</p>
                </div>
                <div className="content__subtitle">
                    <h4 className="content__text row left">{blog.description}</h4>
                    <Link to={`/blogs/${blog._id}`}>
                        <h5 className="grid__item__readmore content__text margin__vertical__small">know more</h5>
                    </Link>
                </div>
                <div className="row between">
                    {/* <p className="content__liked">{postings && postings.filter(posting => posting.blog === blog._id).length} stories</p> */}
                    <p className="content__liked">{postings && postings.filter(posting => posting.blog._id === blog._id).length} stories</p>
                    <p className="content__liked">followed by {blogFollows.length} readers</p>
                </div>
            </div>
        )
    }

    useEffect(() => {
        dispatch(postingGetList());
        dispatch(blogGetList());
        dispatch(getFollows());
        // dispatch(getCategoryList());
    },[dispatch]);
    
    return (
        <div className="main__container">
            <h1>{search}</h1>
            {(loadingPostings || loadingBlogs )&& <Loading />}
            {errorPostings && <Message message="error">{errorPostings}</Message>}
            {errorBlogs && <Message message="error">{errorBlogs}</Message>}
            {postings && blogs &&
            <div className="main__horizontal">
                <div className="main__blog ">
                    <div className="section__title">featured blogs <span className="title__tab">ii</span></div>
                    <div className="section__content">
                        {featuredBlogs && featuredBlogs.map(blog => renderFeaturedBlogs(blog))}
                    </div>
                </div>
                {selectedCategories && selectedCategories.map(category => renderCategory(category))}
            </div>}
        </div>
    )
};
