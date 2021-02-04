import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPosting } from '../actions/postingActions';
import { CATEGORIES } from '../category';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { POSTING_CREATE_RESET } from '../constants/postingConstants';

export default function CreatePosting(props) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [blog, setBlog] = useState('');
    const [category, setCategory] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(['']);
    const [hashtags, setHashtags] = useState(['']);
    const makeHashList = (text) => text.toLowerCase().replace(/ +(\+\(\)\[\]\{\}\/\?@\$&*?!=-_.)/g, ",").split(",");
    

    const blogList = useSelector(state => state.blogList);
    const { blogs } = blogList;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const myblogs = blogs && blogs.filter(blog => blog.author._id === userInfo._id);
    const postingCreate = useSelector(state => state.postingCreate);
    const { loading, success, posting: postingCreated, error } = postingCreate;

    const categories = CATEGORIES.map(category => (
        <option value={category} key={category}>{category}</option>
    ));

    const mybloglist = myblogs 
    ? myblogs.map(blog => (
        <option value={blog._id} key={blog._id}>{blog.title}</option>
    ))
    : <option value={null} disabled={true}>No Blog</option>
    
    const resetHandler = () => {
        setTitle('');
        setBlog('');
        setCategory('');
        setText('');
        setImage('');
        setHashtags('');
    };

    const submitHandler = () => {
        const hashList = makeHashList(hashtags);
        dispatch(createPosting(title, blog, category, text, image, hashList));
        alert('Your new story has been successfully created!');
    };

    useEffect(() => {
        if (success) {
            resetHandler();
            dispatch({ type: POSTING_CREATE_RESET });
            props.history.push(`/postings/${postingCreated._id}`);
        }
        resetHandler();
    },[dispatch, success, postingCreated, props.history]);

    return (
        <div className="container__center">
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
                        {categories}
                    </select>
                </div>
                <div className="row">
                    <input
                        className="form__input"
                        type="text"
                        id="text"
                        placeholder="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
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
                    <input
                        className="form__input"
                        type="text"
                        id="hashtags"
                        placeholder="enter hashtags separated by commas"
                        value={hashtags}
                        onChange={e => setHashtags(e.target.value)}
                    />
                </div>
                <div className="row">
                    <button className="form__btn btn" type="submit">post this story</button>
                </div>
                <div className="row between">
                    <button className="btn btn__reset" type="reset" onClick={resetHandler}>reset</button>
                    <button className="btn btn__cancel" onClick={e => props.history.push('/')}>cancel</button>
                </div>
                
            </form>
        </div>
    )
}