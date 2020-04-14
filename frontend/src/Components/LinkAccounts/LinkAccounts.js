import React from 'react';
import './LinkAccounts.css';
import { Button } from 'antd';
import { FacebookOutlined, MediumOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons"; 
import axios from 'axios';

export default class LinkAccounts extends React.Component {
    state = {
        facebook: null,
        linkedIn: null,
        medium: null,
        twitter: null,
    }

    componentDidMount() {
        const uId = localStorage.getItem('uId');
        return axios.post(`http://localhost:4000/social/profiles`, { uId })
        .then((res) => {
            const socials = res.data;
            if (socials.length > 0) {
                socials.map((s) => this.setState({ [s.provider]: s }));
            }
            console.log(this.state);
        })
        .catch((err) => console.log(err));
    }

    render() {
        return (
            <>
            <h1>Link your social media accounts</h1>
            <div className="sm-buttons">
                <Button type="primary" size="large" icon={<FacebookOutlined />} name="facebook" href="http://localhost:4000/facebook">connect</Button>
                <Button type="primary" size="large" icon={<MediumOutlined />} name="medium" disabled>connect</Button>
                <Button type="primary" size="large" icon={<LinkedinOutlined />} name="linkedIn" href="http://localhost:4000/linkedin">connect</Button>
                <Button type="primary" size="large" icon={<TwitterOutlined />} name="twitter" disabled>connect</Button>
            </div>
            </>
        )
    }
}