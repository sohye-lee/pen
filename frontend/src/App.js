import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/Footer'
import Header from './components/Header'
import CreateBlog from './screens/CreateBlog';
import Login from './screens/Login';
import MyBlogs from './screens/MyBlogs';
import Profile from './screens/Profile';
import Signup from './screens/Signup';
import CreatePosting from './screens/CreatePosting';
import Blog from './screens/Blog';

export default function App() {
    
    return (
        <BrowserRouter>
            <div className="app__container">
                <Header />
                <div className="app__content">
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/blogs" component={MyBlogs} exact />
                    <Route path="/createblog" component={CreateBlog}/>
                    <Route path="/write" component={CreatePosting} />
                    <Route path="/blogs/:blogId" component={Blog} />
                    
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
};
