import React from 'react';
import './Forgot.css';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


export default class Forgot extends React.Component {

    state = {
        email: null,
        isSent: false,
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
        }

        return axios.post('http://localhost:4000/auth/forgot', data).then((response) => {
            console.log(response);
            this.setState({ isSent: true })
        })
        .catch((error) => {
            const errors = error.response.data.description;
            message.error(errors);
        });
    };
    render() {
        return (
            this.state.isSent ? <Redirect to="/auth/login" /> : 
            <div className="center">
                <h1>Forgot your password?</h1>
                <p>Please enter your email</p>
                <div className="container">
                    <Form style={{margin: "20px"}}
                    name="forgot"
                    size="large"
                    >
                        <Form.Item
                        name="enterEmail"
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
                        <Form.Item>
                                <Button type="primary" htmlType="submit" className="forgot-form-button" onClick={this.responseHandler}>
                                Send
                                </Button>
                        </Form.Item>
                        Trying to log in to your account? <a href="/auth/login">that way!</a>
                        <br/>
                        Don't have an account yet? <a href="/auth/sign-up">create now!</a>
                    </Form>
                </div>
            </div>
        )
    }
};