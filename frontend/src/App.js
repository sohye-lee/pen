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
import EditBlog from './screens/EditBlog';
import EditPosting from './screens/EditPosting';
import Posting from './screens/Posting';
import Main from './screens/Main';


export default function App() {
    return (
        <BrowserRouter>
            <div className="app__container">
                <Header />
                <div className="app__content">
                    <Route path="/" component={Main} exact/>
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/blogs" component={MyBlogs} exact />
                    <Route path="/createblog" component={CreateBlog}/>
                    <Route path="/write" component={CreatePosting} />
                    <Route path="/blogs/:blogId" component={Blog} exact/>
                    <Route path="/blogs/:blogId/edit" component={EditBlog} exact />
                    <Route path="/postings/:postingId" component={Posting} exact />
                    <Route path="/postings/:postingId/edit" component={EditPosting} exact />
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
};
