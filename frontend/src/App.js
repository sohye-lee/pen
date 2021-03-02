import React, { useState } from 'react'
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
import Follows from './screens/Follows';
import Search from './screens/Search';
import Author from './screens/Author';
import AdminCategory from './screens/AdminCategory';
import AdminUsers from './screens/AdminUsers';


export default function App() {
    const [search, setSearch] = useState('');

    return (
        <BrowserRouter>
            <div className="app__container">
                <Header setSearch={setSearch} />
                <div className="app__content">
                    {search && search !== "" ? 
                    <Route path="/" render={(props) => <Search {...props} search={search}  />} exact /> :
                    <Route path="/" render={(props) => <Main {...props} search={search}/>} exact/>
                    }
                    <Route path="/signup" component={(props) => <Signup {...props} search={search} />} />
                    <Route path="/login" component={(props) => <Login {...props} search={search} />} />
                    <Route path="/profile" component={(props) => <Profile {...props} search={search}/>} />
                    <Route path="/blogs" component={(props) => <MyBlogs {...props} search={search} />} exact />
                    <Route path="/createblog" component={(props) => <CreateBlog {...props} search={search} />}/>
                    <Route path="/write" component={(props) => <CreatePosting {...props} search={search} />} />
                    <Route path="/blogs/:blogId" component={(props) => <Blog {...props} search={search} />} exact/>
                    <Route path="/blogs/:blogId/edit" component={(props) => <EditBlog {...props} search={search} />} exact />
                    <Route path="/postings/:postingId" component={(props) => <Posting {...props} search={search} />} exact />
                    <Route path="/postings/:postingId/edit" component={(props) => <EditPosting {...props} search={search} />} exact />
                    <Route path="/follows" component={(props) => <Follows {...props} search={search} />} />
                    <Route path="/authors/:userId" component={(props) => <Author {...props} search={search} />} />
                    <Route path="/admin/category" component={(props) => <AdminCategory {...props} search={search} />} exact />
                    <Route path="/admin/users" component={(props) => <AdminUsers {...props} search={search} />} exact />
                    {/* <Route path="/admin/contents" component={(} */}
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
};
