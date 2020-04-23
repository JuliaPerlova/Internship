import React from 'react';
import { Menu, Dropdown, Button, Modal, Form, Input, Upload, message } from "antd";
import { DownOutlined, SettingOutlined, CloseOutlined, SolutionOutlined, UploadOutlined, LockOutlined } from "@ant-design/icons";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import './DropdownButton.css'

export default class DropdownButton extends React.Component {

  state = {
    tokenIsDelete: false,
    modalVisible: false,
    firstname: null,
    lastname: null,
    changepass: null,
    timezone: null,
    avatar: null,
    avatarId: null,
    changePassIsClicked: false,
  }

  handleOk = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleMenuClick = (event) => {
    if (event.key === "logout") {
      const token = localStorage.getItem('token');
      return axios.get(`http://localhost:4000/token=${token}/logout`)
        .then((res) => {
          localStorage.clear();
          this.setState({
            tokenIsDelete: !this.tokenIsDelete,
          })
        })
        .catch((err) => console.error(err));
    }
    if (event.key === 'settings') {
      this.setState({
        modalVisible: !this.modalVisible
      })
      return axios.post('http://localhost:4000/main/settings', { 
        token: localStorage.getItem('token'),
        uId: localStorage.getItem('uId')
      })
        .then((res) => {
          this.setState({
            firstname: res.data.firstName,
            lastname: res.data.lastName,
            changepass: res.data.password,
            timezone: res.data.timeZone,
            avatar: res.data.avatar,
            avatarId: res.data.avatarId
          })
        })
        .catch((err) => console.error(err))
    }
  }

  uploadFile = (event) => {
    console.log(event.file);
    const data = new FormData()
    data.append('file', event.file)
    data.append('upload_preset', 'tnd5cvzb')
    return axios.post('https://api.cloudinary.com/v1_1/deobpvcce/image/upload', data)
      .then((res) => {
        console.log(res)
        this.setState({
          avatar: res.data.url,
          avatarId: res.data.public_id
        })
        console.log(this.state)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    this.setState({
        [name]: event.target.value,
    })
};

handleInputTime = (value) => {
  this.setState({
    timezone: value,
  })
}

handleChangePass = () => {
  this.setState({
    changePassIsClicked: !this.changePassIsClicked
  })
}

onFinish = () => {
  const data = {
    firstName: this.state.firstname,
    lastName: this.state.lastname,
    password: this.state.changepass,
    timeZone: this.state.timezone,
    avatar: this.state.avatar,
    avatarId: this.state.avatarId,
  }
  return axios.patch('http://localhost:4000/main/settings', { 
    token: localStorage.getItem('token'),
    uId: localStorage.getItem('uId'),
    data,
  }).then((res) => {
    this.props.updateData(this.state.avatar)
    console.log(res)
  }).catch((err) => console.error(err))
}

  menu = (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="settings">
        <SettingOutlined />
        Settings
      </Menu.Item>
      <Menu.Item key="logout">
        <CloseOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );

  render() {
    console.log(this.state);
    return (
      !localStorage.getItem('token') ? <Redirect to="/auth/login"/> :
      <>
      <Dropdown overlay={this.menu}>
          <Button shape="circle" 
          size="small" 
          style={{marginTop: "7px", borderRadius: "50%", boxShadow: "0 0 0 0", border: "none", background: "#f0f2f5"}}
          >
              <DownOutlined />
          </Button>
      </Dropdown>
      <Modal
          title="Settings"
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form
          onFinish={this.onFinish}
          name="form"
          >
            <Form.Item>
              <Input prefix={<SolutionOutlined />} placeholder={this.state.firstname} name="firstname" onChange={this.handleInputChange} />
            </Form.Item>
            <Form.Item>
              <Input prefix={<SolutionOutlined />} placeholder={this.state.lastname} name="lastname" onChange={this.handleInputChange} />
            </Form.Item>

            {
              this.state.changePassIsClicked ? 
              <Form.Item
              name="changepass"
              hasFeedback
              rules={[
                  {
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/m,
                      message: 'Password must contain capital, lowercase letters and numbers and also have length of 8 to 20 characters',
                  }
              ]}
              >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Change password"
                name="changepass" 
                onChange={this.handleInputChange}
                />
              </Form.Item> 
                :
              <Form.Item>
              <Button type="primary" onClick={this.handleChangePass}>Change password</Button>
            </Form.Item>
            }
            
            <Form.Item>
              <TimezonePicker
              name="timezone"
              placeholder="Entter timezone"
              defaultValue={this.state.timezone}
              onChange={this.handleInputTime}
              />
            </Form.Item>
            <Form.Item>
              <Upload customRequest={this.uploadFile} showUploadList={false} beforeUpload={this.beforeUpload}>
                <Button>
                  <UploadOutlined /> Upload avatar
                </Button>
              </Upload>
              <img style={{width: "80px", height: "80px"}} src={this.state.avatar} alt="userAvatar"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" >
                Save
              </Button>
            </Form.Item>
          </Form>
      </Modal>
      </>
    )
  }
}