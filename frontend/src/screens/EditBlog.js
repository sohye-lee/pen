import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetails, updateBlog } from '../actions/blogActions';
import { CATEGORIES } from '../category';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { BLOG_UPDATE_RESET } from '../constants/blogConstants';

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

    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState('');
    const imageUploadHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setImageUploadLoading(true)
        try {
            const { data } = await Axios.post('/images', bodyFormData, {
                headers: {
                    'Content-Type': "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            setImage(data);
            setImageUploadLoading(false);
        } catch (error) {
            setImageUploadError(error.message);
            setImageUploadLoading(false);
        }
    }

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
            dispatch({ type: BLOG_UPDATE_RESET });
        }
    }, [dispatch, blogId, props.history, successUpdate, blogUpdated]);

    let isValid = false;
    if (title !== '' && category !== '' && description !== '' && image !== '') {
        isValid = true;
    }
    
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
                            type="file"
                            id="image"
                            placeholder="image"
                            onChange={imageUploadHandler}
                        />
                        {imageUploadLoading && <Loading />}
                        {imageUploadError && <Message message="error">{imageUploadError}</Message>}
                    </div>
                    <div className="row">
                        <button 
                            className="form__btn btn" 
                            type='submit'
                            disabled={isValid ? false : true}
                            style={{backgroundColor: isValid ? 'var(--Blue)' : 'var(--Gray)', boxShadow: !isValid && 'none'}}
                        >
                            update
                        </button>
                    </div>
                    <div className="row between">
                        <button className="btn btn__reset" type="reset" onClick={resetHandler}>reset</button>
                        <button className="btn btn__cancel" onClick={e => props.history.push(`/blogs/${blogId}`)}>cancel</button>
                    </div>
                </>}
            </form>
        </div>
    )
};
