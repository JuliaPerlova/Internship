import React from 'react';
import './Forgot.css';
import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

export default () => {
    return (
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
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-mail" />
                    </Form.Item>
                    <Form.Item>
                            <Button type="primary" htmlType="submit" className="forgot-form-button">
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
};