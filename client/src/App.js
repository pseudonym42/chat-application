import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApolloProvider from './ApolloProvider';

import './App.scss';

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/home/Home";

import { AuthProvider } from './context/auth';
import { MessageProvider } from './context/message';
import { AllowOnlyAuthenticated, RedirectAuthenticated } from './util/DynamicRoute';

/*
  We need to tell the router to stop matching further once 
  it matches a route. This is done using the Routes component 
  from "react-router-dom"
*/

function App() {
    return (
        <ApolloProvider>
            <AuthProvider>
                <MessageProvider>
                    <BrowserRouter>
                        <Container className="pt-4">
                            <Routes>
                                <Route exact path="/" element={
                                    <AllowOnlyAuthenticated>
                                        <Home/>
                                    </AllowOnlyAuthenticated>
                                }/>
                                <Route path="/register" element={
                                    <RedirectAuthenticated>
                                        <Register />
                                    </RedirectAuthenticated>
                                }/>
                                <Route path="/login" element={
                                    <RedirectAuthenticated>
                                        <Login />
                                    </RedirectAuthenticated>
                                }/>
                            </Routes>
                        </Container>
                    </BrowserRouter>
                </MessageProvider>
            </AuthProvider>
        </ApolloProvider>
    );
}

export default App;
