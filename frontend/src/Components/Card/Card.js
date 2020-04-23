import React from 'react';
import { Card, Avatar, Checkbox } from 'antd';
import { UserOutlined } from "@ant-design/icons";

const { Meta } = Card;

export default (props) => {

    const handleProvider = (event) => {
        return props.updateData(props.provider, event.target.checked);
    }

    return (
        <Card style={{width: "280px"}} extra={<Checkbox onChange={handleProvider} defaultChecked={props.checked}></Checkbox>} size="small">
          <Meta
            avatar={
                props.avatar ? 
                <Avatar size={72} shape="square" src={props.avatar} /> 
                    :
                <Avatar size="large" shape="square" icon={<UserOutlined />} />
            }
            title={`${props.firstName} ${props.lastName}`}
            description={props.provider}
          />
    </Card>
    )
};