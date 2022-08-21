import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {
    Row,
    Col,
    Form,
    Button,
} from 'react-bootstrap';

const REGISTER_USER = gql`
    mutation register(
        $username: String!, 
        $email: String!, 
        $password: String!, 
        $confirmPassword: String!
    ) {
        register(
            username: $username, 
            email: $email, 
            password: $password, 
            confirmPassword: $confirmPassword
        ) {
            # fields to return
            username
            email
            createdAt
        }
    }
`;

export default function Register() {
    const [variables, setVariable] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    })

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(cache, results) {
            console.log(results);
            navigate('/login');
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.errors)
        }
    })

    const submitRegisterForm = (event) => {
        event.preventDefault();
        registerUser({
            variables: {
                email: variables.email,
                username: variables.username,
                password: variables.password,
                confirmPassword: variables.confirmPassword
            }
        });
    }
    return (
        <Row className="bg-white py-4 justify-content-center">
            <Col sm={8} md={6} lg={4}>
                <h1 className="text-center">Register</h1>
                <Form onSubmit={submitRegisterForm}>
                    <Form.Group className="mb-3">
                        <Form.Label className={errors.email && 'text-danger'}>
                            {errors.email ?? 'Email address'}
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            className={errors.email && 'is-invalid'}
                            value={variables.email}
                            onChange={e => setVariable({ ...variables, email: e.target.value })}
                        />
                    </Form.Group>
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
                    <Form.Group className="mb-3">
                        <Form.Label className={errors.confirmPassword && 'text-danger'}>
                            {errors.confirmPassword ?? 'Confirm Password'}
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            className={errors.confirmPassword && 'is-invalid'}
                            value={variables.confirmPassword}
                            onChange={e => setVariable({ ...variables, confirmPassword: e.target.value })}
                        />
                    </Form.Group>
                    <Button variant="secondary" type="submit" disabled={loading}>
                        {loading ? 'Loading ...' : 'Register'}
                    </Button>
                    <br />
                    <small>Already registered?
                        <Link to="/login">
                            Login
                        </Link>
                    </small>
                </Form>
            </Col>
        </Row>
    )
}
