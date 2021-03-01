import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { createPosting } from '../actions/postingActions';
// import { CATEGORIES } from '../category';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { POSTING_CREATE_RESET } from '../constants/postingConstants';
import { blogGetList } from '../actions/blogActions';
import { RenderHashtags } from '../components/RenderHashtags';
import dotenv from 'dotenv';
import { getCategoryList } from '../actions/categoryActions';

dotenv.config();

export default function CreatePosting(props) {
    const dispatch = useDispatch();
    const redirectPath = props.location.search 
        ? props.location.search.split('=')[1]
        : '/';

    const [title, setTitle] = useState('');
    const [blog, setBlog] = useState('');
    const [category, setCategory] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(['']);
    const [hashtags, setHashtags] = useState('');

    const blogList = useSelector(state => state.blogList);
    const { blogs } = blogList;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const myblogs = blogs && blogs.filter(blog => blog.author._id === userInfo._id);
    const postingCreate = useSelector(state => state.postingCreate);
    const { loading, success, posting: postingCreated, error } = postingCreate;
    const categoryList = useSelector(state => state.categoryList);
    const { categories } = categoryList;
    const categoryOptions = categories && categories.map(category => (
        <option value={category._id} key={category._id}>{category.name}</option>
    ));

    const mybloglist = myblogs 
    ? myblogs.map(blog => (
        <option value={blog._id} key={blog._id}>{blog.title}</option>
    ))
    : <option value={null} disabled={true}>No Blog. You need to created a blog first.</option>
    
    const resetHandler = () => {
        setTitle('');
        setBlog('');
        setCategory('');
        setText('');
        setImage('');
        setHashtags('');
    };

 

    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState('');

    const imageUploadHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setImageUploadLoading(true);
        try {
            const { data } = await Axios.post('/images', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            setImageUploadLoading(false);
            setImage(data);
        } catch (error) {
            setImageUploadLoading(false);
            setImageUploadError(error.message);
        }
    }

    const submitHandler = () => {
        const hashList = RenderHashtags(hashtags);
        dispatch(createPosting({title, blog, category, text, image, hashtags: hashList}));
    };

    let isValid = false;
    if (title !== '' && blog !== '' && category !== '' && text !== '' && image !== '') {
        isValid = true;
    };
    
    useEffect(() => {
        if (!userInfo) {
            alert('You need to login!');
            props.history.push('/login');
        }
        
        dispatch(blogGetList());
        dispatch(getCategoryList());

        if (myblogs)  {
            if (myblogs.length === 0) {
                alert('You need to create a blog before writing!');
                props.history.push('/createblog');
            }
        }
        
        if (success) {
            alert('Your new story has been successfully created!');
            dispatch({ type: POSTING_CREATE_RESET });
            dispatch(blogGetList());
            console.log(postingCreated._id)
            resetHandler();
            props.history.push(`/postings/${postingCreated._id}`);
        }

        
    },[dispatch, success, postingCreated, props.history, userInfo]);

    return (
        <div className="container__long">
            <form className="form__content" onSubmit={submitHandler}>
                <h1 className="form__title">
                    share a new story!
                </h1>
                {loading && <Loading />}
                {error && <Message message="error">{error}</Message>}
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
                        <option defaultValue={true} value=''>select category</option>
                        {categoryOptions}
                    </select>
                </div>
                <div className="row">
                    <Editor
                        apiKey={process.env.REACT_APP_EDITOR_API_KEY}
                        initialValue="<p>write your story here.</p>"
                        init={{
                        height: 400,
                        width: 800,
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
                        // outputFormat="text"
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
                    <input
                        className="form__input"
                        type="text"
                        id="hashtags"
                        placeholder="enter hashtags separated by commas"
                        value={hashtags.toLowerCase().replace(/[^\w\s]/gi, ',').replace(/ +/g, ',').replace(/,+/g,',')}
                        onChange={e => setHashtags(e.target.value)}
                    />
                </div>
                <button 
                        className="form__btn btn" 
                        type='submit' 
                        disabled={isValid ? false : true}
                        style={{backgroundColor: isValid ? 'var(--Blue)' : 'var(--Gray)', boxShadow: !isValid && 'none'}}
                    >
                        post this story
                    </button>
                <div className="row between">
                    <button className="btn btn__reset" type="reset" onClick={resetHandler}>reset</button>
                    <button className="btn btn__cancel" onClick={e => props.history.push(redirectPath)}>cancel</button>
                </div>
                
            </form>
        </div>
    )
}
