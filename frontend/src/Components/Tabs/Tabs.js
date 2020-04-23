import React from 'react';
import { Tabs } from 'antd';
import LinkAccounts from '../LinkAccounts/LinkAccounts';
import BigCalendar from '../BigCalendar/BigCalendar';
import './Tabs.css'


const { TabPane } = Tabs;

export default () => {
    return (
        <Tabs tabPosition="left" size="large">
            <TabPane tab="Posts" key="1">
                <LinkAccounts />
            </TabPane>
            <TabPane tab="Calendar" key="2">
                <BigCalendar />
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