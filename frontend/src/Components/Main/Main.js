import React from 'react';
import { Layout } from 'antd';
import Tabs from '../Tabs/Tabs';
import './Main.css'

const { Header, Footer, Content, Sider } = Layout;

export default () => {
    return (
        <Layout style={{height: "100vh"}}>
            <Header>Header</Header>
            <Layout>
                <Content>
                    <Tabs />
                </Content>
                <Sider breakpoint="sm" width="25%">Sider</Sider>
            </Layout>
            <Footer>Footer</Footer>
        </Layout>
    )
}