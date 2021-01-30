import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../actions/userActions';


export default function Signup(props) {
    const dispatch = useDispatch();
    const [firstname, setFirstname] = useState(''); 
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password not matched. Please confirm your password.');
        } else {
            dispatch(signup);
        }
    }

    return (
        <div className="form__container">
            <form className="form__content">
                <h1 className="form__title">
                    Become Our Writer!
                </h1>
                <div className="row">
                    <input 
                        type="text"
                        id="firstname"
                        placeholder="firstname"
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}
                    />
                </div>
                <div className="row">
                    <input 
                        type="text"
                        id="lastname"
                        placeholder="lastname"
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                    />
                </div>
                <div className="row">
                    <input 
                        type="text"
                        id="email"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="row">
                    <input 
                        type="text"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="row">
                    <input 
                        type="text"
                        id="confirmPassword"
                        placeholder="confirm your password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button className="form__btn btn" type="submit">Create</button>
            </form>
            
        </div>
    )
}
