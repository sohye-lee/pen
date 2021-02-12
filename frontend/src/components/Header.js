import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';

export default function Header() {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    const [display, setDisplay] = useState("none");
    const displayToggler = () => {
        if (display === "none") {
            setDisplay("flex");
            setDropdown("none");
        } else {
            setDisplay("none");
        }
    };
    const [dropdown, setDropdown] = useState('none');
    const dropdownToggler = () => {
        if (dropdown === "none") {
            setDropdown("flex");
            setDisplay("none");
        } else {
            setDropdown("none");
        }
    };

    window.addEventListener('click', (e) => {
        if (!document.getElementById('header').contains(e.target)) {
            setDropdown("none");
            setDisplay("none");
        }
    });

    useEffect(() => {
        if (userInfo) {
            setDropdown("none");
        }
    }, [userInfo]);

    return (
        <div className="header__container row" id="header">
            <div className="header__content row between">
                <div className="header__left">
                        <Link to="/" className="header__item logo">pen</Link>
                </div>
                <div className="header__right row right">
                    <div className="row right">
                        
                        {!userInfo
                        ? 
                        <div className="row right">
                            <div className="header__item row right">
                                <input type="text" className="form__input search"/>
                                <i className="fa fa-search" aria-hidden="true"/>
                            </div>
                            <Link className="header__item" to="/login">login</Link>
                            <Link className="header__item" to="/signup">signup</Link>
                        </div>
                        : 
                        <div className="row right">
                            <div className="header__item row right">
                                <input type="text" className="form__input search"/>
                                <i className="fa fa-search" aria-hidden="true"/>
                            </div>
                            <div>
                                <div 
                                    className="header__item profile" 
                                    onClick={dropdownToggler}
                                >
                                    {userInfo.username} <i className="fa fa-caret-down "/>
                                </div>
                                <div className="header__dropdown" style={{display: dropdown}} onClick={() => setDropdown("none")}>
                                    <Link className="header__item" to="/profile" onClick={() => setDropdown("none")}>profile</Link>
                                    <Link className="header__item" to="/write" onClick={() => setDropdown("none")}>write</Link>
                                    <Link className="header__item" to="/blogs" onClick={() => setDropdown("none")}>my blogs</Link>
                                    <Link className="header__item" to="/follows" onClick={() => setDropdown("none")}>follows</Link>
                                    <Link className="header__item" to="/" onClick={logoutHandler}>logout</Link>
                                </div>
                            </div>
                        </div>
                        }
                        <div onClick={displayToggler}>
                            <div>
                                <div className="header__bar"></div>
                                <div className="header__bar"></div>
                                <div className="header__bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header__hidden" style={{display:display}}>
                <Link to="/" className="header__item">home</Link>
                <Link to="/life" className="header__item">life</Link>
                <Link to="/arts" className="header__item">arts</Link>
                <Link to="/food" className="header__item">food</Link>
                <Link to="/travel" className="header__item">travel</Link>
                <Link to="/movies" className="header__item">movies</Link>
                <Link to="/books" className="header__item">books</Link>
                <Link to="/technologies" className="header__item">technologies</Link>
            </div>
        </div>
    )
};
