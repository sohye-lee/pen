import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetails, updateBlog } from '../actions/blogActions';
import { CATEGORIES } from '../category';
import Loading from '../components/Loading';
import Message from '../components/Message';
import {  BLOG_UPDATE_RESET } from '../constants/blogConstants';


export default function EditBlog(props) {
    const dispatch = useDispatch();
    const blogId = props.match.params.blogId;

    const blogDetails = useSelector(state => state.blogDetails);
    const { loading: loadingBlogDetails, blog, error: errorBlogDetails } = blogDetails;

    const [title, setTitle] = useState(blog? blog.title : '');
    const [category, setCategory] = useState(blog? blog.category : '');
    const [description, setDescription] = useState(blog? blog.description : '');
    const [image, setImage] = useState(blog? blog.image : '/noimage.jpg');

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const blogUpdate = useSelector(state => state.blogUpdate);
    const { loading: loadingUpdate, blog: blogUpdated, success: successUpdate, error: errorUpdate } = blogUpdate;
    
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const categories = CATEGORIES.map(category => (
        <option value={category} key={category}>{category}</option>
    ))

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateBlog(blogId, title, category, description, image));
    };
 
    const resetHandler = () => {
        setTitle(blog? blog.title : '');
        setCategory(blog? blog.category : '');
        setDescription(blog? blog.description : '');
        setImage(blog? blog.image : '');
    };

    if (!userInfo) {
        props.history.push('/login');
    };

    useEffect(() => {
        dispatch(getBlogDetails(blogId));
        if (successUpdate) {
            alert('Your blog has been successfully updated!');
            dispatch(getBlogDetails(blogId));
            setTitle(blogUpdated ? blogUpdated.title : '');
            setCategory(blogUpdated ? blogUpdated.category : '');
            setDescription(blogUpdated ? blogUpdated.description : '');
            setImage(blogUpdated ? blogUpdated.image : '/noimage.jpg');
            props.history.push(`/blogs/${blogId}`);
        }
    }, [dispatch, blogId, props.history, successUpdate]);

    return (
        <div className="container__center">
            <form className="form__content" onSubmit={submitHandler}>
                <h1 className="form__title">
                    Update your blog
                </h1>
                {loadingBlogDetails ? <Loading />
                : errorBlogDetails ? <Message message="error">{errorBlogDetails}</Message> 
                :
                <>
                    {successUpdate && <Message message="success">Your blog <span style={{textDecoration: "italic"}}>'{blogUpdated ? blogUpdated.title : ''}'</span> has been updated!</Message>}
                    {loadingUpdate && <Loading />}
                    {errorUpdate && <Message message="error">{errorUpdate}</Message>}
                    <div className="row">
                        <input
                            className="form__input"
                            type="text"
                            id="title"
                            placeholder="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        <select
                            className="form__input"
                            id="category"
                            onChange={e => setCategory(e.target.value)}
                            value={category}
                        >
                            <option defaultValue={true} value="">select category</option>
                            {categories}
                        </select>
                    </div>
                    <div className="row">
                        <input
                            className="form__input"
                            type="text"
                            id="description"
                            placeholder="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        <input
                            className="form__input"
                            type="text"
                            id="image"
                            placeholder="image"
                            value={image}
                            onChange={e => setImage(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        <button className="form__btn btn" type="submit">update</button>
                    </div>
                    <div className="row between">
                        <button className="btn btn__reset" type="reset" onClick={resetHandler}>reset</button>
                        <button className="btn btn__cancel" onClick={e => props.history.push(redirect)}>cancel</button>
                    </div>
                </>}
            </form>
        </div>
    )
};
