import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { blogGetList } from '../actions/blogActions';
import { postingGetList } from '../actions/postingActions';
import { adminUpdate, getUserList, profileUpdate } from '../actions/userActions';

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

    const [isAdmin, setIsAdmin] = useState(null);

    const updateAdminHandler = (e, user) => {
        e.preventDefault();
        const profileToUpdate = {
            _id: user._id,
            username: user.username,
            email: user.email,
            introduction: user.introduction,
            image: user.image,
            isAdmin: isAdmin,
        }
        console.log(profileToUpdate.toString())
        dispatch(adminUpdate({userId: user._id, username: user.username, email: user.email, introduction: user.introduction, image: user.image, isAdmin}));
    }

    const renderUser = (user) => {
        const myBlogs = blogs && blogs.filter(blog => blog.author._id === user._id);
        const myPostings = postings && postings.filter(posting => posting.author._id === user._id);

        return(
            <tr key={user._id}>
                <td><img className="thumbnail__small" src={user.image} alt={user.username} /></td>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>
                    <ul className="content__text">
                        {myBlogs
                        ? myBlogs.map(blog => <Link key={blog._id} to={`/blogs/${blog._id}`} style={{color: 'var(--Black)'}}><li className="nospacing italic">- {blog.title.length > 30 ? blog.title.slice(0,30)+'...': blog.title}</li></Link>) 
                        : <li>No Blog Found</li>}
                    </ul>
                </td>
                <td>
                    <ul className="content__text">
                        {myPostings
                        ? myPostings.map(posting => <Link key={posting._id} to={`/postings/${posting._id}`} style={{color: 'var(--Black)'}}><li className="nospacing italic">- {posting.title.length > 40 ? posting.title.slice(0,40)+'...': posting.title}</li></Link>) 
                        : <li>No Posting Found</li>}
                    </ul>
                </td>
                <td>
                    <a href={`mailto:${user.email}`} className="content__text nospacing" style={{color: 'var(--Black)'}}>{user.email}</a>
                </td>
                <td style={{textAlign: 'center'}}>
                    <form className="row between" onSubmit={(e) => {updateAdminHandler(e, user);}}>
                        <input type="radio" name="isAdmin" id={user.email+"yes"} value={true} onClick={e => setIsAdmin(e.target.value)} defaultChecked={user.isAdmin && 'defaultChecked'} className="margin__right__xsmall"/>
                        <label htmlFor={user.email+"yes"} className="margin__right__xsmall">Yes</label>
                        <input type="radio" name="isAdmin" id={user.email+"no"} value={false} onClick={e => setIsAdmin(e.target.value)} defaultChecked={!user.isAdmin && 'defaultChecked'} className="margin__right__xsmall"/>
                        <label htmlFor={user.email+"no"} className="margin__right__xsmall">No</label>
                        <button className="btn small btn__cancel" type="submit" style={{width: "5rem"}}>Update</button>
                    </form>
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
        dispatch(blogGetList());
        dispatch(postingGetList());

    }, [dispatch, userInfo, props.history])
    
    return (
        <div className="container__long">
            {/* <div className=""> */}
                <div className="admin__content">
                    <table>
                        <thead>
                            <tr>
                                <th>avatar</th>
                                <th>id</th>
                                <th>username</th>
                                <th>blogs</th>
                                <th>postings</th>
                                <th>email</th>
                                <th>admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map(user => renderUser(user))}
                        </tbody>
                    </table>
                {/* </div> */}
            </div>
           
        </div>
    )
};
