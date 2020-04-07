import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Login.css';

export default class Login extends React.Component {

    state = {
        email: null,
        password: null,
        isAuth: false,
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
        }
        return axios.post('http://localhost:4000/auth/login', data).then((response) => {
            console.log(response);
            const { token, uId } = response.data;
            localStorage.setItem('uId', uId);
            localStorage.setItem('token', token);
            this.setState({
                isAuth: !this.isAuth
            })
          })
          .catch((error) => {
            const errors = error.response.data.description;
            message.error(errors);
        });
    };

    render() {
        return (
            localStorage.getItem('token') ? <Redirect to={"/main"} /> :
            <div className="center">
                <h1>Welcome back!</h1>
                <p>Please log in to your account</p>
                <div className="container">
                    <Form style={{margin: "20px"}}
                    name="login"
                    className="login-form"
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
                        name="password"
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
                        <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.responseHandler}>
                                Log in
                                </Button>
                        </Form.Item>
                        <a href="/auth/forgot">Forgot your password?</a>
                        <br/>
                        Don't have an account yet? <a href="/auth/sign-up">create now!</a>
                    </Form>
                </div>
            </div>
        )
    }
}