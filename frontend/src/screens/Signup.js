import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/userActions';
import Loading from '../components/Loading';
import Message from '../components/Message';


export default function Signup(props) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignup = useSelector(state => state.userSignup);
    const { userInfo, loading, error } = userSignup;

    const redirectPath = props.location.search 
        ? props.location.search.split('=')[1]
        : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password not matched. Please confirm your password.');
        } else {
            dispatch(signup(username, email, password));
            alert(`Welcome, you are now our new writer! \nusername: ${username} \nemail: ${email}`);
        }
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirectPath);
        }
    }, [dispatch, props.history, redirectPath, userInfo]);

    return (
        <div className="container__center">
            <form className="form__content" onSubmit={submitHandler}>
                <h1 className="form__title">
                    Become Our Writer!
                </h1>
                {loading && <Loading />}
                {error && <Message message="error">{error}</Message>}
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
                        type="text"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="row">
                    <input 
                        className="form__input"
                        type="text"
                        id="confirmPassword"
                        placeholder="confirm your password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="row">
                    <button className="form__btn btn" type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}