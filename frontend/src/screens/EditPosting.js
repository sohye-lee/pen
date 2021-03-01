import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import Axios from 'axios';
import { getPostingDetails, updatePosting } from '../actions/postingActions';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { blogGetList } from '../actions/blogActions';
import { RenderHashtags } from '../components/RenderHashtags';
import dotenv from 'dotenv';
import { POSTING_UPDATE_RESET } from '../constants/postingConstants';
import { getCategoryList } from '../actions/categoryActions';

dotenv.config();

export default function EditPosting(props) {
    const dispatch = useDispatch();
    const postingId = props.match.params.postingId;
    // const redirectPath = props.location
    //     ? props.location.search.split('=')[1]
    //     : '/';

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const postingDetails = useSelector(state => state.postingDetails);
    const { loading, error, success, posting } = postingDetails;
    const postingUpdate = useSelector(state => state.postingUpdate);
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = postingUpdate;
    const blogList = useSelector(state => state.blogList);
    const { blogs } = blogList;
    const myblogs = blogs && blogs.filter(blog => blog.author._id === userInfo._id);
    const categoryList = useSelector(state => state.categoryList);
    const { categories } = categoryList;

    const [title, setTitle] = useState(posting ? posting.title : '');
    const [blog, setBlog] = useState(posting ? posting.blog._id : '');
    const [category, setCategory] = useState(posting ? posting.category._id : '');
    const [text, setText] = useState(posting && posting.text );
    const [image, setImage] = useState(posting ? posting.image : '');
    const [hashtags, setHashtags] = useState(posting ? posting.hashtags.join(',').toString()  : '');

    const categoryOptions = categories && categories.map(category => (
        <option value={category._id} key={category._id}>{category.name}</option>
    ));

    const mybloglist = myblogs 
    ? myblogs.map(blog => (
        <option value={blog._id} key={blog._id}>{blog.title}</option>
    ))
    : <option value={null} disabled={true}>No Blog. You need to created a blog first.</option>
    
    const resetHandler = () => {
        setTitle(posting ? posting.title : '');
        setBlog(posting ? posting.blog._id : '');
        setCategory(posting ? posting.category : '');
        setText(posting ? posting.text : '');
        setImage(posting ? posting.image : '');
        setHashtags(posting ? posting.hashtags.join(',') : '');
    };

    const submitHandler = () => {
        const hashList = RenderHashtags(hashtags);
        dispatch(updatePosting({_id: postingId, title, blog, category, text, image, hashtags: hashList}));
        if (success) {
            alert('Your story has been successfully updated!');
        }
        props.history.push(`/postings/${postingId}`);
    };

    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState('');
    const uploadImageHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file)
        setImageUploadLoading(true);
        try {
            const { data } = await Axios.post('/images', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            console.log(data);
            setImage(data);
            setImageUploadLoading(false);
        } catch (error) {
            console.log(error);
            setImageUploadError(error.message);
            setImageUploadLoading(false);
        }
    }

    let isValid = false;
    if (title !== '' && blog !== '' && category !== '' && text !== '' && image !== '') {
        isValid = true;
    }

    
    useEffect(() => {
        if (!userInfo) {
            alert('You need to login!');
            props.history.push('/login');
        }
        dispatch(getPostingDetails(postingId));
        dispatch(blogGetList());
        dispatch(getCategoryList());
        resetHandler();
        
        if (successUpdate) {
            dispatch({ type: POSTING_UPDATE_RESET });
            props.history.push(`/postings/${postingId}`);
            
        }
    },[dispatch, successUpdate, props.history, userInfo, postingId]);

    return (
        <div className="container__long">
            <form className="form__content" onSubmit={submitHandler}>
                <h1 className="form__title">
                    share a new story!
                </h1>
                {loading && <Loading />}
                {error && <Message message="error">{error}</Message>}
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
                        id="blog"
                        value={blog}
                        onChange={e => setBlog(e.target.value)}
                    >
                        <option value='' defaultValue={true}>select blog</option>
                        {mybloglist}
                    </select>
                </div>
                <div className="row">
                    <select
                            className="form__input"
                            id="category"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                    >
                        <option defaultValue={true} value="">select category</option>
                        {categoryOptions}
                    </select>
                </div>
                <div className="row">
                    <Editor
                        apiKey={process.env.REACT_APP_EDITOR_API_KEY}
                        initialValue={posting && posting.text}
                        init={{
                            height: 500,
                            width: 900,
                            menubar: false,
                            content_style: 'body { font-family:Courier New, Courier, monospace; font-size:1.1rem }',
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={setText}
                    />
                </div>
                <div className="row">
                    <input
                        className="form__input"
                        type="file"
                        id="image"
                        placeholder="image"
                        onChange={uploadImageHandler}
                    />
                    {imageUploadLoading && <Loading />}
                    {imageUploadError && <Message message="error">{imageUploadError}</Message>}
                </div>
                <div className="row">
                    <input
                        className="form__input"
                        type="text"
                        id="hashtags"
                        placeholder="enter hashtags separated by commas"
                        value={hashtags.toLowerCase().replace(/[^\w\s]/gi, ' ').replace(/ +/g, ',').replace(/,+/g,',')}
                        onChange={e => setHashtags(e.target.value)}
                    />
                </div>
                <div className="row">
                    <button 
                        className="form__btn btn" 
                        type='submit'
                        disabled={isValid ? false : true}
                        style={{backgroundColor: isValid ? 'var(--Blue)' : 'var(--Gray)', boxShadow: !isValid && 'none'}}
                    >
                        {loadingUpdate ? <loading /> : 'update'}
                    </button>
                </div>
                <div className="row between">
                    <button className="btn btn__reset" type="reset" onClick={resetHandler}>reset</button>
                    <button className="btn btn__cancel" onClick={() => props.history.push('/blogs')}>cancel</button>
                </div>
            </form>
        </div>
    )
}
