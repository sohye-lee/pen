import React from 'react'

export default function Header() {
    return (
        <div className="header__container row">
            <div className="header__content row between">
                <div className="header__left row left">
                    <ul className="row left">
                        <li className="header__item logo"><a href="/">pen</a></li>
                        <li className="header__item"><a href="/">Life</a></li>
                        <li className="header__item"><a href="/">Arts</a></li>
                        <li className="header__item"><a href="/">Design</a></li>
                        <li className="header__item"><a href="/">Movies</a></li>
                        <li className="header__item"><a href="/">Technologies</a></li>
                        <li className="header__item"><a href="/">Reviews</a></li>
                    </ul>
                </div>
                <div className="header__right row right">
                    <ul className="row right">
                        <li className="header__item">
                            <i className="fa fa-search" aria-hidden="true"/>
                        </li>
                        <li className="header__item bars">
                            <a href="/">
                                <div className="header__bar"></div>
                                <div className="header__bar"></div>
                                <div className="header__bar"></div>
                            </a>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </div>
    )
};
