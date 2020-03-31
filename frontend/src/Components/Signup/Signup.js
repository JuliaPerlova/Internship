import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Signup.css';

export default class Signup extends React.Component {

    state = {
        login: null,
        email: null,
        password: null,
        userIsCreated: false
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value,
        })
    };

    responseHandler = () => {
        const data = {
            email: this.state.email,
            password: this.state.password,
            login: this.state.login
        }
        return axios.post('http://localhost:4000/auth/sign-up', data).then((response) => {
            console.log(response);
            this.setState({ userIsCreated: !this.userIsCreated });
            console.log(this.state);
          })
          .catch((error) => {
            const errors = error.response.data.description;
            message.error(errors);
        });
    };

    render() {
        console.log(this.state);
        return (
            this.state.userIsCreated ? <Redirect to="/auth/login" /> :
            <div className="center">
                <h1>Create account</h1>
                <p>Please fill in the form fields</p>
                <div className="container">
                    <Form style={{margin: "20px"}}
                    name="signup"
                    className="signup-form"
                    size="large"
                    >
                        <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your E-mail!'
                            },
                            {
                                type: "email",
                                message: 'The input is not valid E-mail!'
                            }
                        ]}
                        >
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-mail" name="email" onChange={this.handleInputChange} />
                        </Form.Item>

                        <Form.Item
                        name="login"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Login!',
                            },
                            {
                                pattern: /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-_]{2,19}$/m,
                                message: 'Login must contain only alphanumeric characters, symbols "-", "_" and have a length of 3 to 20 characters',
                            }
                        ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Login" name="login" onChange={this.handleInputChange} />
                        </Form.Item>

                        <Form.Item
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/m,
                                message: 'Password must contain capital, lowercase letters and numbers and also have length of 8 to 20 characters',
                            }
                        ]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            name="password" 
                            onChange={this.handleInputChange}
                            />
                        </Form.Item>

                        <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                              required: true,
                              message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                  return Promise.resolve();
                                }
                  
                                return Promise.reject('The two passwords that you entered do not match!');
                              },
                            }),
                          ]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} 
                            type="password"
                            placeholder="Confirm password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="signup-form-button" onClick={this.responseHandler}>
                            Sign up
                            </Button>
                            
                        </Form.Item>
                        Already have an account? <a href="/auth/login">log in now!</a>
                    </Form>
                </div>
            </div>
        )
    }
};