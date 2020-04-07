import React from 'react';
import { Tabs } from 'antd';
import Posts from '../Posts/Posts';
import './Tabs.css'


const { TabPane } = Tabs;

export default () => {
    return (
        <Tabs tabPosition="left" size="large">
            <TabPane tab="Posts" key="1">
                <Posts />
            </TabPane>
            <TabPane tab="Calendar" key="2">
                Content of Tab 2
            </TabPane>
            <TabPane tab="Statistics" key="3">
                Content of Tab 3
            </TabPane>
            <TabPane tab="Archive" key="4">
                Content of Tab 3
            </TabPane>
        </Tabs>
    )
};