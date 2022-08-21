import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApolloProvider from './ApolloProvider';

import './App.scss';

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { AuthProvider } from './context/auth';

/*
  We need to tell the router to stop matching further once 
  it matches a route. This is done using the Routes component 
  from "react-router-dom"
*/

function App() {
    return (
        <ApolloProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Container className="pt-4">
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </Container>
                </BrowserRouter>
            </AuthProvider>
        </ApolloProvider>
    );
}

export default App;
