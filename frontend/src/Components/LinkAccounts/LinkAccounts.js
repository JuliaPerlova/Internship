import React from 'react';
import './LinkAccounts.css';
import { Button } from 'antd';
import { FacebookOutlined, MediumOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";
import Card from '../Card/Card';
import Posts from '../Posts/Posts';
import axios from 'axios';

export default class LinkAccounts extends React.Component {
    state = {
        socialProviders: [
            {
                name: 'facebook',
                params: null,
                selected: false,
            },
            {
                name: 'linkedin',
                params: null,
                selected: false,
            },
            {
                name: 'medium',
                params: null,
                selected: false,
            },
            {
                name: 'twitter',
                params: null,
                selected: false,
            }
        ],
        blockIsHide: false,
    }

    componentDidMount() {
        const uId = localStorage.getItem('uId');
        console.log(uId);
        return axios.post(`http://localhost:4000/social/profiles`, { uId })
        .then((res) => {
            console.log(res);
            const socials = res.data;
            if (socials.length > 0) {
                socials.map((s) => {
                    return this.state.socialProviders.forEach((item) => {
                        if (item.name === s.provider) {
                            item.params = s;
                        }
                    })
                });
            }
        })
        .catch((err) => console.error(err));
    }

    updateData = (provider, check) => {
        return this.state.socialProviders.forEach((item) => {
            if (item.name === provider) {
                item.selected = check;
            }
        })
    }

    toPostHAndler = () => {
        this.setState({ blockIsHide: !this.state.blockIsHide });
    }

    render() {
        console.log(this.state);
        return (
            this.state.blockIsHide ? <div className="visible">
                <Posts provider={this.state.socialProviders.map((item) => {
                    if (item.selected) {
                        return item.name
                    }
            }).filter((item) => item)}
            providerId={this.state.socialProviders.map((item) => {
                if (item.selected) {
                    return item.params.providerId;
                }
            }).filter((item) => item)}
             />
             <Button type="primary" size="large" onClick={this.toPostHAndler}>Back</Button>
            </div> :
            <div>
                <div className={`${this.state.blockIsHide ? "hidden" : "visible"}`}>
                <h1>Link your social media accounts</h1>
                { this.state.socialProviders.map((item) => {
                    if (!item.params) {
                        return null;
                    }
                    return (
                        console.log(this.state),
                        <Card
                        avatar={item.params.avatar}
                        firstName={item.params.firstName}
                        lastName={item.params.lastName}
                        provider={item.name}
                        checked={item.selected}
                        updateData={this.updateData}
                        />
                    )
                }) }
                <div className="sm-buttons">
                    <Button type="primary" size="large" icon={<FacebookOutlined />} name="facebook" href="http://localhost:4000/facebook">connect</Button>
                    <Button type="primary" size="large" icon={<MediumOutlined />} name="medium" disabled>connect</Button>
                    <Button type="primary" size="large" icon={<LinkedinOutlined />} name="linkedIn" href="http://localhost:4000/linkedin">connect</Button>
                    <Button type="primary" size="large" icon={<TwitterOutlined />} name="twitter" disabled>connect</Button>
                </div>
                    
                </div>
                <Button type="primary" size="large" onClick={this.toPostHAndler}>to Post</Button>
            </div>
        )
    }
}