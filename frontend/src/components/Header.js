import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';

export default function Header() {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <div className="header__container row">
            <div className="header__content row between">
                <div className="header__left row left">
                    <div className="row left">
                        <Link to="/" className="header__item logo">pen</Link>
                        <Link to="/life" className="header__item">life</Link>
                        <Link to="/arts" className="header__item">arts</Link>
                        <Link to="/food" className="header__item">food</Link>
                        <Link to="/travel" className="header__item">travel</Link>
                        <Link to="/movies" className="header__item">movies</Link>
                        <Link to="/books" className="header__item">books</Link>
                        <Link to="/technologies" className="header__item">technologies</Link>
                    </div>
                </div>
                <div className="header__right row right">
                    <div className="row right">
                        
                        {!userInfo
                        ? 
                        <div className="row right">
                            <div className="header__item row right">
                                <input type="text" className="form__input"/>
                                <i className="fa fa-search" aria-hidden="true"/>
                            </div>
                            <Link className="header__item" to="/login">login</Link>
                            <Link className="header__item" to="/signup">signup</Link>
                        </div>
                        : 
                        <div className="row right">
                            <div className="header__item row right">
                                <input type="text" className="form__input"/>
                                <i className="fa fa-search" aria-hidden="true"/>
                            </div>
                            <Link className="header__item" style={{color:"var(--Blue)"}} to="/">{userInfo.username}</Link>
                            <Link className="header__item" to="/" onClick={logoutHandler}>logout</Link>
                        </div>
                        }
                        
                        <div className="header__item bars">
                            <a href="/">
                                <div className="header__bar"></div>
                                <div className="header__bar"></div>
                                <div className="header__bar"></div>
                            </a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
};
