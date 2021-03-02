import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profile, profileUpdate } from '../actions/userActions';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';


export default function Profile(props) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState('/user.png');
    const [introduction, setIntroduction] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const userProfile = useSelector(state => state.userProfile);
    const { user, loading: profileLoading, error: profileError } = userProfile;
    const userUpdate = useSelector(state => state.userUpdate);
    const { success: updateSuccess, loading: updateLoading, error: updateError } = userUpdate;

    // const redirectPath = props.location.search 
    //     ? props.location.search.split('=')[1]
    //     : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password not matched. Please confirm your password.');
        } else {
            if (window.confirm(`Do you want to update your profile?\nusername: ${username}\nemail: ${email}\nintroduction: ${introduction}`)) {
                dispatch(profileUpdate({ userId: user._id, username, email, password, image, introduction }));
            }
        }
    };

    useEffect(() => {
        if (!userInfo) {
            props.history.push('/login');
        } else {
            if (!user) {
                dispatch({ type: USER_UPDATE_RESET });
                dispatch(profile(userInfo._id));
            } else {
                setUsername(user.username);
                setEmail(user.email);
                setImage(user.image);
                setIntroduction(user.introduction);
            }
        }
    }, [dispatch, props.history, user, userInfo]);

    return (
        <div className="container__center">
            <form className="form__content" onSubmit={submitHandler}>
                <h1 className="form__title">
                    update your profile
                </h1>
                {profileLoading ? <Loading />
                : profileError ? <Message message="error">{profileError}</Message>
                : 
                <>
                    {updateLoading && <loading />}
                    {updateError && <Message message="error">{updateError}</Message>}
                    {updateSuccess && <Message message="success">Your profile has been successfully updated!</Message>}
                    <div className="row">
                        <input 
                            className="form__input"
                            type="text"
                            id="username"
                            placeholder="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        <input 
                            className="form__input"
                            type="text"
                            id="email"
                            placeholder="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        <input 
                            className="form__input"
                            type="password"
                            id="password"
                            placeholder="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        <input 
                            className="form__input"
                            type="password"
                            id="confirmPassword"
                            placeholder="confirm your password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        <textarea 
                            className="form__input"
                            type="text"
                            id="introduction"
                            rows={3}
                            placeholder="tell us about you"
                            value={introduction}
                            onChange={e => setIntroduction(e.target.value)}
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
                </>}
            </form>
        </div>
    )
}
