import React from 'react';
import { Container, Row, Col, Form, Button, Image, Alert } from 'react-bootstrap';
import '../App.css';
import { FaFacebookF, FaTwitter, FaLinkedin, FaGoogle } from 'react-icons/fa';
import loginImage from '../assets/images/login.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slice/authSlice';

const socialIcons = [
    { id: 1, icon: <FaGoogle />, name: 'Google' },
    { id: 2, icon: <FaFacebookF />, name: 'Facebook' },
    { id: 3, icon: <FaLinkedin />, name: 'Linkedin' },
    { id: 4, icon: <FaTwitter />, name: 'Twitter' },
];

const Login = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [checked, setChecked] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            setError(
                'Password must be at least 8 characters long and include at least 1 capital letter, 1 number, and 1 symbol.'
            );
            return;
        }

        setError('');
        dispatch(login()); // Update Redux
        navigate('/home');

    };

    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
            <Row className="w-100 justify-content-around align-items-center">
                <Col xs={12} md={6} lg={4} className="d-flex flex-column align-items-center">
                    <Form className="px-3 w-100" onSubmit={handleSubmit} style={{ maxWidth: 350 }}>
                        <h2 className="mb-2 text-center">Sign In</h2>
                        <p className="mb-4 fw-semibold text-center">
                            New user? <a className='text-decoration-none' href="/register">Create an account</a>
                        </p>
                        {error && <Alert style={{ width: '100%' }} variant="danger">{error}</Alert>}
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Control
                                type="email"
                                placeholder="Username or email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="custom-input h-48 border-1 border border-black"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="custom-input h-48 border-1 border border-black"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center" controlId="keepSignedIn">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                                className="big-checkbox"
                                id="keepSignedIn"
                            />
                            <Form.Label htmlFor="keepSignedIn" className="ms-2 mb-0 text-black fw-semibold">
                                Keep me signed in
                            </Form.Label>
                        </Form.Group>

                        <Button variant="dark" type="submit" className="w-100 mt-2" style={{ borderRadius: 0 }}>
                            Sign In
                        </Button>

                        <div className="d-flex align-items-center mt-4">
                            <div className="flex-grow-1 border-top"></div>
                            <span className="mx-3  fw-semibold">or Sign in With</span>
                            <div className="flex-grow-1 border-1 border-top border-grey"></div>
                        </div>

                        <div className='d-flex gap-3 mt-4 justify-content-center'>
                            {socialIcons.map((icon) => (
                                <div
                                    key={icon.id}
                                    className='d-flex justify-content-center align-items-center rounded-circle text-dark border-1 border border-black'
                                    style={{ width: '48px', height: '48px', cursor: 'pointer' }}
                                >
                                    <span className='fs-6'>{icon.icon}</span>
                                </div>
                            ))}
                        </div>
                    </Form>
                </Col>
                <Col xs={12} md={6} lg={4} className="d-none d-md-flex justify-content-center">
                    <Image
                        style={{ width: '100%', maxWidth: '350px', height: 'auto', objectFit: 'cover' }}
                        src={loginImage}
                        alt="Login"
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Login;