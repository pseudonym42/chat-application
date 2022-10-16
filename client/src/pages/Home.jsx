import React, { useEffect, useState, Fragment } from 'react';
import { 
    Button,
    Container,
    Navbar,
    Nav,
    Row,
    Col,
    Image
} from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { useAuthDispatch } from '../context/auth';
import { gql, useQuery, useLazyQuery } from  '@apollo/client';


const GET_USERS = gql`
    query getUsers{
        getUsers {
            username
            createdAt
            imageUrl
            latestMessage {
                uuid
                from
                to
                content
                createdAt
            }
        }
    }
`

const GET_MESSAGES = gql`
    query getMessages($from: String!) {
        getMessages(from: $from) {
            uuid
            from
            to
            content
            createdAt
        }
    }
`

export default function Home() {
    const dispatch = useAuthDispatch();
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    }

    const { loading, data, error } = useQuery(GET_USERS);

    const [
        getMessages,
        { loading: messagesLoading, data: messagesData },
    ] = useLazyQuery(GET_MESSAGES)

    useEffect(() => {
        if (selectedUser) {
          getMessages({ variables: { from: selectedUser } })
        }
      }, [selectedUser])

    let usersMarkup = <p>Loading</p>;
    if (data) {
        if (data.getUsers.length === 0) {
            usersMarkup = <p>No users found</p>;
        } else {
            usersMarkup = data.getUsers.map(user => (
                <div className="d-flex p-3"
                    key={user.username} 
                    onClick={() => setSelectedUser(user.username)}>
                    <Image src={user.imageUrl}
                        roundedCircle
                        className="mr-2"
                        style={{ width: 50, height: 50, objectFit: 'cover'}}
                    />
                    <div>
                        <p className="text-success">{user.username}</p>
                        <p className="font-weight-light">
                            {user.latestMessage ? user.latestMessage.content : "No messages"}
                        </p>
                    </div>
                </div>
            ))
        }
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
                <Col xs={4} className="p-0 bg-secondary">
                    {usersMarkup}
                </Col>
                <Col xs={8}>
                    {messagesData && messagesData.getMessages.length > 0 ? (
                        messagesData.getMessages.map((message) => (
                        <p key={message.uuid}>{message.content}</p>
                        ))
                    ) : (
                        <p>No messages</p>
                    )}
                </Col>            
            </Row>
        </Fragment>
    )
}
