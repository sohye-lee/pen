import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/Footer'
import Header from './components/Header'
import Login from './screens/Login';
import MyBlogs from './screens/MyBlogs';
import Profile from './screens/Profile';
import Signup from './screens/Signup';
import Write from './screens/Write';

export default function App() {
    
    return (
        <BrowserRouter>
            <div className="app__container">
                <Header />
                <div className="app__content">
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/blogs" component={MyBlogs} />
                    <Route path="/write" component={Write} />
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
};
