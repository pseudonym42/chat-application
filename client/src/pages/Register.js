import React, {useState} from 'react';
import { 
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

export default function Register() {
  const [variables, setVariable] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  })
  const submitRegisterForm = (event) => {
    event.preventDefault();
    console.log(variables);
  }
  return (
    <Row className="bg-white py-4 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Register</h1>
          <Form onSubmit={submitRegisterForm}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email"
                placeholder="Enter email"
                value={variables.email}
                onChange={e => setVariable({...variables, email: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={variables.username}
                onChange={e => setVariable({...variables, username: e.target.value})}
            />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={variables.password}
                onChange={e => setVariable({...variables, password: e.target.value})}
            />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={variables.confirmPassword}
                onChange={e => setVariable({...variables, confirmPassword: e.target.value})}
            />
            </Form.Group>
            <Button variant="secondary" type="submit">
              Register
            </Button>
          </Form>
      </Col>
    </Row>
  )
}
