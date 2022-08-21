import React from 'react';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { useAuthDispatch } from '../context/auth';

export default function Home() {
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav className="me-auto">
                    <Link to="/login">
                        <Button variant="link">Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button variant="link">Register</Button>
                    </Link>
                    <Button variant="link" onClick={logout}>Logout</Button>
                </Nav>
            </Container>
        </Navbar>
    )
}
