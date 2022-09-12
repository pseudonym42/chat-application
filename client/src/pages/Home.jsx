import React, { Fragment } from 'react';
import { 
    Button,
    Container,
    Navbar,
    Nav,
    Row,
    Col
} from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { useAuthDispatch } from '../context/auth';
import { gql, useQuery } from  '@apollo/client';


const GET_USERS = gql`
    query getUsers{
        getUsers{
            username email createdAt
        }
    }
`

export default function Home() {
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    }

    const { loading, data, error } = useQuery(GET_USERS);

    let usersMarkup = <p>Loading</p>;
    if (data) {
        if (data.getUsers.length === 0) {
            usersMarkup = <p>No users found</p>;
        } else {
            usersMarkup = data.getUsers.map(user => (
                <div key={user.username}>
                    <p>{user.username}</p>
                </div>
            ))
        }
    }

    return (
        <Fragment>
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
        <Row>
            <Col xs={4}>
                {usersMarkup}
            </Col>
            <Col xs={8}>
                <p>Messages</p>
            </Col>            
        </Row>
        </Fragment>
    )
}
