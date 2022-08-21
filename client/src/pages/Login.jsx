import { gql, useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

import { useAuthDispatch } from '../context/auth';

import {
    Row,
    Col,
    Form,
    Button,
} from 'react-bootstrap';

const LOGIN_USER = gql`
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            # fields to return
            username
            email
            createdAt
            token
        }
    }
`;

export default function Login() {
    const [variables, setVariable] = useState({
        username: "",
        password: "",
    })

    const [errors, setErrors] = useState({});

    const dispatch = useAuthDispatch();

    const navigate = useNavigate();

    const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.errors)
        },
        onCompleted(data) {
            dispatch({ type: 'LOGIN', payload: data.login });
            navigate('/');
        },
    })

    const submitLoginForm = (event) => {
        event.preventDefault();
        loginUser({
            variables: {
                username: variables.username,
                password: variables.password,
            }
        });
    }
    return (
        <Row className="bg-white py-4 justify-content-center">
            <Col sm={8} md={6} lg={4}>
                <h1 className="text-center">Login</h1>
                <Form onSubmit={submitLoginForm}>
                    <Form.Group className="mb-3">
                        <Form.Label className={errors.username && 'text-danger'}>
                            {errors.username ?? 'Username'}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            className={errors.username && 'is-invalid'}
                            value={variables.username}
                            onChange={e => setVariable({ ...variables, username: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className={errors.password && 'text-danger'}>
                            {errors.password ?? 'Password'}
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            className={errors.password && 'is-invalid'}
                            value={variables.password}
                            onChange={e => setVariable({ ...variables, password: e.target.value })}
                        />
                    </Form.Group>
                    <Button variant="secondary" type="submit" disabled={loading}>
                        {loading ? 'Loading ...' : 'Login'}
                    </Button>
                    <br />
                    <small>Do not have an account?
                        <Link to="/register">
                            Register
                        </Link>
                    </small>
                </Form>
            </Col>
        </Row>
    )
}
