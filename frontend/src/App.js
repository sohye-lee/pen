import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/Footer'
import Header from './components/Header'
import Login from './screens/Login';
import Signup from './screens/Signup';

export default function App() {
    
    return (
        <BrowserRouter>
            <div className="app__container">
                <Header />
                <div className="app__content">
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
};
