import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../actions/blogActions';
import { CATEGORIES } from '../category';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { BLOG_CREATE_RESET } from '../constants/blogConstants';


export default function CreateBlog(props) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(['']);
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const blogCreate = useSelector(state => state.blogCreate);
    const { loading, success, blog: blogCreated, error } = blogCreate; 
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';
    const categories = CATEGORIES.map(category => (
        <option value={category} key={category}>{category}</option>
    ))

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createBlog(title, category, description, image));
    };
 
    const resetHandler = () => {
        setTitle('');
        setCategory('');
        setDescription('');
        setImage('');
    };

    useEffect(() => {
        if (!userInfo) {
            props.history.push('/login');
        };
        if (success) {
            alert(`Your new blog ${blogCreated.title} has been created!`);
            dispatch({ type: BLOG_CREATE_RESET });
            setTitle('');
            setCategory('');
            setDescription('');
            setImage('');
            props.history.push(`/blogs/${blogCreated._id}`);
        }
    }, [dispatch, success, props.history, userInfo, blogCreated])

    return (
        <div className="container__center">
            <form className="form__content" onSubmit={submitHandler}>
                <h1 className="form__title">
                    create a new blog!
                </h1>
                {success && <Message message="success">Your new blog <span style={{textDecoration: "italic"}}>'{blogCreated.title}'</span> has been created!</Message>}
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
                    <button className="form__btn btn" type="submit">create</button>
                </div>
                <div className="row between">
                    <button className="btn btn__reset" type="reset" onClick={resetHandler}>reset</button>
                    <button className="btn btn__cancel" onClick={e => props.history.push(redirect)}>cancel</button>
                </div>
                
            </form>
        </div>
    )
}
