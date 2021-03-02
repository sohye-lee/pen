import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../actions/userActions';

export default function AdminUsers(props) {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const userList = useSelector(state => state.userList);
    const { loading, users, error } = userList;
    const blogList = useSelector(state => state.blogList);
    const { blogs } = blogList;
    const postingList = useSelector(state => state.postingList);
    const { postings } = postingList;

    const renderUser = (user) => {
        const myBlogs = blogs.filter(blog => blog.author._id === user._id);
        const myPostings = postings.filter(posting => posting.author._id === user._id);

        return(
            <tr>
                <td><img className="thumbnail__small" src={user.image} alt={user.username} /></td>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>
                    <ul>
                        {myBlogs? myBlogs.map(blog => <li>{blog.title}</li>) : <li>No Blog Found</li>}
                    </ul>
                </td>
                <td>
                    <ul>
                        {myPostings? myPostings.map(posting => <li>{posting.title}</li>) : <li>No Posting Found</li>}
                    </ul>
                </td>
                <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                    <button className="btn small btn__reset"></button>
                </td>
            </tr>
        )
    }
    
    useEffect(() => {
        if (!userInfo) {
            props.history.push('/login');
            alert("You need to login first!")
        }
        if (userInfo && !userInfo.isAdmin) {
            props.history.push('/');
            alert('You must be an admin user to access this page!');
        }

        dispatch(getUserList());

    }, [dispatch, userInfo, props.history])
    
    return (
        <div className="container__full">
            <div className="admin__content">
                <table>
                    <thead>
                        <th>avatar</th>
                        <th>id</th>
                        <th>username</th>
                        <th>blogs</th>
                        <th>postings</th>
                        <th>email</th>
                        <th>admin</th>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    )
};
