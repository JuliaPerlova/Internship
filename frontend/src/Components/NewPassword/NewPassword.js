import React from 'react';
import './NewPassword.css';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


export default class NewPassword extends React.Component {
    pathname = () => window.location.pathname;

    state = {
        password: null,
        isSent: false,
    }

    async guard() {
        return await axios.get(`http://localhost:4000${this.pathname()}`)
        .then(() => this.setState({ isSent: false }))
        .catch(() => this.setState({isSent: true}));
    }


    handleInputChange = (event) => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value,
        })
    };

    responseHandler = () => {
        const data = {
            password: this.state.password,
        }

        return axios.post(`http://localhost:4000${this.pathname()}`, data)
        .then((response) => {
            console.log(response);
            this.setState({ isSent: true })
        })
        .catch((error) => {
            const errors = error.response.data.description;
            message.error(errors);
        });
    };
    render() {
        this.guard();
        return (
            (this.state.isSent) ? <Redirect to="/auth/login" /> : 
            <div className="center">
                <h1>Сreate new password</h1>
                <p>Please fill in the form fields</p>
                <div className="container">
                    <Form style={{margin: "20px"}}
                    name="newpass"
                    size="large"
                    >
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
                                <Button type="primary" htmlType="submit" className="newpass-form-button" onClick={this.responseHandler}>
                                Send
                                </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
};