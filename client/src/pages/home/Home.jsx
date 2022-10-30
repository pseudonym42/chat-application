import React, { Fragment } from 'react';
import { 
    Button,
    Container,
    Navbar,
    Nav,
    Row,
} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useAuthDispatch } from '../../context/auth';

import Users from './Users'
import Messages from './Messages'

export default function Home() {
    const dispatch = useAuthDispatch();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        window.location.href = '/login'
    }

    return (
        <Fragment>
            <Navbar className="bg-white justify-content-around mb-2">
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
            <Row className='bg-white'>
                <Users />
                <Messages />          
            </Row>
        </Fragment>
    )
}
