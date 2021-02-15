import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { blogGetList } from '../actions/blogActions';
import { deleteFollow, getFollows } from '../actions/followActions';
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function Follows(props) {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const followList = useSelector(state => state.followList);
    const { loading: loadingFollows, follows, error: errorFollows } = followList; 
    const blogList = useSelector(state => state.blogList);
    const { blogs } = blogList;
    const followDelete = useSelector(state => state.followDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = followDelete;
    const myFollow = follows && follows.filter(follow => follow.user === userInfo._id)[0];

    const deleteFollowHandler = (blog) => {
        if (window.confirm(`Are you sure you wish to unfollow this blog?`)) {
            dispatch(deleteFollow(blog));
            console.log(blog);
        }
    };


    const renderFollowingBlog = (blog) => {
        const thisBlog = blogs && blogs.filter(bl => bl._id === blog)[0];
        const author = thisBlog && thisBlog.author;

        return (
            <div className="row between follow__item" key={blog._id}>
                <div className="row left">
                    <Link to={author ? `/authors/${author._id}`: '/'}>
                        <div className="follow__author margin__right__small">
                            <img style={{margin: "0"}} className="thumbnail__xsmall" src={author && author.image} alt="author" />
                            <h5 style={{marginTop: ".4rem"}}>{author && author.username}</h5>
                        </div>
                    </Link>
                    <Link to={`/blogs/${blog}`}>
                        <h3 className="follow__item__title">{thisBlog && thisBlog.title}</h3>
                    </Link>
                </div>
                <button className="follow__btn__delete" onClick={() => deleteFollowHandler(blog)}><i className="fa fa-trash-o" /></button>
            </div>
        )
    }

    useEffect(() => {
        if (!userInfo) {
            props.history.push('/login');
        }
        dispatch(getFollows());
        dispatch(blogGetList());
    }, [dispatch, userInfo, props.history, successDelete]);

    return (
        <div className="container__long">
            <div className="follow__container">
                {loadingFollows ? <Loading />
                : errorFollows ? <Message message="error">{errorFollows}</Message>
                : <div className="follow__content">
                    <h1 className="follow__title">Blogs You Are Following</h1>
                    <div className="follow__list">
                        {myFollow && myFollow.blogs.map(blog => renderFollowingBlog(blog))}
                    </div>
                </div>}
                {((!myFollow) || myFollow.blogs.length === 0) && <h3 className="follow__item row center">You are not following any blog.</h3>}
                {loadingDelete && <Loading />}
                {errorDelete && <Message message="error">{errorDelete}</Message>}
            </div>
        </div>
    )
};
