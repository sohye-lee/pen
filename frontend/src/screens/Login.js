import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Loading from '../components/Loading';
import Message from '../components/Message';


export default function Login(props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo, loading, error } = userLogin;

    const redirectPath = props.location.search 
        ? props.location.search.split('=')[1]
        : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
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
                    welcome back!
                </h1>
                {loading && <Loading />}
                {error && <Message message="error">{error}</Message>}
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
                    <button className="form__btn btn" type="submit">login</button>
                </div>
            </form>
        </div>
    )
}
