import React from 'react';
import { Layout, PageHeader, Avatar } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import Tabs from '../Tabs/Tabs';
import DrpdownButton from '../DropdownButton/DropdownButton';
import Agenda from '../Agenda/Agenda';
import './Main.css'
import axios from 'axios';

const { Header, Footer, Content, Sider } = Layout;

export default class Main extends React.Component {
    state = {
        imgSrc: null,
        login: null,
    }

    updateData = (value) => {
        this.setState({ imgSrc: value })
     }

    componentDidMount() {
        return axios.post('http://localhost:4000/main/settings', { 
            token: localStorage.getItem('token'),
            uId: localStorage.getItem('uId')
        })
        .then((res) => {
            this.setState({
            imgSrc: res.data.avatar,
            login: res.data.login,

        })
        }).catch((err) => console.log(err));
    }

    render() {
        console.log(this.state);
        return (
            <Layout style={{height: "100vh"}}>
                <Header>
                    <PageHeader
                    title="APPLICATION"
                    avatar={ {src: 'https://image.flaticon.com/icons/png/512/59/59157.png' } }
                    extra={[
                        <strong style={{float: "left", margin: "10px"}}>{this.state.login}</strong>,
                        <DrpdownButton updateData={this.updateData} />,
                        !this.state.imgSrc ?  
                            <Avatar size="large" style={{margin: 0}} icon={<UserOutlined />} /> :
                            <Avatar size="large" style={{margin: 0}} src={this.state.imgSrc} />
                    ]}
                    />
                </Header>
                <Layout>
                    <Content>
                        <Tabs />
                    </Content>
                    <Sider breakpoint="sm" width="25%">
                        <Agenda />
                    </Sider>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        )
    }
}