import React from 'react';
import './Posts.css';
import { Form, Input, Button, message, Upload, Modal, TimePicker, Calendar, Alert, Tabs, DatePicker } from 'antd';
import moment from 'moment';
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';

const { TabPane } = Tabs;
const format = 'HH:mm';
const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();
const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

export default class Posts extends React.Component {
    constructor(props) {
        super(props);
        const contentState = convertFromRaw(content);
        this.state = {
            contentState,
            editorState: EditorState.createEmpty(),
            title: null,
            text: null,
            video: null,
            img: null,
            attachments: [],
            providerId: [...this.props.providerId],
            provider: [...this.props.provider],
            template: {},
            postArticleTumbler: 'post',
            date: null,
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const providers = this.state.provider;
        const data = {
            token,
            providers,
        }
        return axios.post('http://localhost:4000/main/post/template', data)
            .then((res) => this.setState({ template: res.data }))
            .catch((err) => console.error(err));
    }

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
    };

    onContentStateChange = (contentState) => {
        this.setState({
          contentState,
        });
    };

    rawToText = (obj) => {
        if (Object.keys(obj).length < 2) {
            return null;
        }
        const arr = obj.blocks.map((item) => item.text);
        return arr.join('\n');
    };

    beforeUpload = (file) => {
        if (!this.state.template.video) {
            if (file.type === 'video/mp4') {
                message.error(`Sorry, but you can't download video on ${this.state.template.provider}`);
                return false;
            }
        }

        const isJpgOrPngOrMp4 = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'video/mp4';
        if (!isJpgOrPngOrMp4) {
          message.error('You can only upload JPG/PNG/MP4 file!');
        }
        const isLt100M = file.size / 1024 / 1024 < 100;
        if (!isLt100M) {
          message.error('File must be smaller than 100MB!');
        }
        return isJpgOrPngOrMp4 && isLt100M;
    };

    upload = (event) => {
        console.log(event.file);
        const data = new FormData()
        data.append('file', event.file)
        data.append('upload_preset', 'tnd5cvzb')
        const fileType = event.file.type === 'video/mp4' ? 'video' : 'image';
        return axios.post(`https://api.cloudinary.com/v1_1/deobpvcce/${fileType}/upload`, data)
          .then((res) => {
            console.log(res)
            this.setState({
                attachments: [...this.state.attachments, {
                    link: res.data.url,              
                    fileId: res.data.public_id,
                    contentType: res.data.resource_type
                }]
            })

            console.log(this.state)
          })
          .catch((err) => {
            console.error(err)
          })
    }

    handleChange = (value) => {
        console.log(value);
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      onChangeTime = (time) => {
          this.setState({
              date: time.utc()
          })
          console.log(this.state.date);
      }

      onChangeDate = (date) => {
        this.setState({
            date: new Date(date._d)
        })
      }

    disDate = (currentDate) => {
        return currentDate < moment() || currentDate > moment().add(2, 'M');
    }

    disHours = () => {
        const currentHours = moment().format('HH');
        const arr = []
        for(let i = 0; i < currentHours; i++) {
            arr.push(i)
        }
        return arr;
    }

    disMinutes = () => {
        const currentHours = moment().format('hh');
        console.log(currentHours);
        const currentMinutes = moment().format('mm');
        const arr = []
        for(let i = 0; i < currentMinutes; i++) {
            arr.push(i)
        }
        return arr;
    }

    tumbler = (key) => {
        if (key === 'post') {
            this.setState({postArticleTumbler: 'post'});
        } else {
            this.setState({postArticleTumbler: 'article'});
        }
    }

    onFinish = () => {
        //const token = localStorage.getItem('token');
        const template = this.state.template;
        const date = this.state.date;
        const post = {
            providers: { provider: this.state.provider[0], providerId: this.state.providerId[0] },
            uId: localStorage.getItem('uId'),
            title: this.state.title,
            body : {

                text: this.state.postArticleTumbler === 'article' ? draftToHtml(convertToRaw(this.editorState.getCurrentContent())) :
                    this.rawToText(this.state.contentState),
                attachments: this.state.attachments
            }
        }
        return axios.post('http://localhost:4000/main/schedule/new', { post, template, date })
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    }

    render() {
        console.log(this.state);
        const { editorState } = this.state;
        const textHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        console.log(textHtml)
        const text = this.rawToText(this.state.contentState);
        console.log(text);
        
        return (
            <div className="center">
                <div className="post-container">
                    <Form style={{margin: "20px"}}
                    name="posts"
                    size="large"
                    onFinish={this.onFinish}
                    >
                        <Form.Item>
                            <Tabs size="large" onChange={this.tumbler}>
                                <TabPane tab="Post" key="post" disabled={!this.state.template.text}>
                                    <Form.Item>
                                        <Editor
                                        editorClassName="ant-input"
                                        toolbarHidden
                                        toolbar={
                                            {
                                                options: ['inline', 'fontSize', 'fontFamily', 'textAlign', 'link', 'emoji', 'image'],
                                            }
                                        }
                                        hashtag={{
                                            separator: ' ',
                                            trigger: '#',
                                        }}
                                        onContentStateChange={this.onContentStateChange}
                                        />
                                    </Form.Item>
                                </TabPane>
                                <TabPane tab="Article" key="article" disabled={!this.state.template.html}>
                                    <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input title'
                                        }
                                    ]}
                                    >
                                        <Input placeholder="Title" name="title" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Editor
                                        editorClassName="ant-input"
                                        toolbar={
                                            {
                                                options: ['inline', 'fontSize', 'fontFamily', 'textAlign', 'link', 'emoji', 'image'],
                                            }
                                        }
                                        hashtag={{
                                            separator: ' ',
                                            trigger: '#',
                                        }}
                                        editorState={editorState}
                                        onEditorStateChange={this.onEditorStateChange}
                                        />
                                    </Form.Item>
                                </TabPane>
                            </Tabs>
                        </Form.Item>
                        
                        <Form.Item>
                        <Upload customRequest={this.upload} showUploadList={false} beforeUpload={this.beforeUpload}>
                            <Button> 
                                <UploadOutlined /> Upload file
                            </Button>
                        </Upload>
                        {this.state.attachments.length > 0 ? 'file uploaded' : null}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Create Post Now</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.showModal}>Create Delayed Post</Button>
                            <Modal
                            title="Delayed post"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={false}
                            >
                                <Tabs defaultActiveKey="1" type="card">
                                    <TabPane tab="today" key="1">
                                        <p>Enter time of post</p>
                                        <TimePicker 
                                        defaultValue={moment(`${hours}:${minutes}`, format)}
                                        format={format}
                                        onChange={this.onChangeTime}
                                        disabledHours={this.disHours}
                                        disabledMinutes={this.disMinutes} 
                                        />
                                        <Button type="primary" htmlType="submit" onClick={this.onFinish}>Create Post</Button>
                                    </TabPane>
                                    <TabPane tab="later" key="2">
                                        <p>Enter date of post</p>
                                        <DatePicker
                                        format="DD-MM-YYYY HH:mm"
                                        disabledDate={this.disDate}
                                        defaultValue={moment().add(1, 'd')}
                                        showTime={{ defaultValue: moment(`${hours}:${minutes}`, format) }}
                                        onChange={this.onChangeDate}
                                        />
                                        <Button type="primary" htmlType="submit" onClick={this.onFinish}>Create Post</Button>
                                    </TabPane>
                                </Tabs>
                            </Modal>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
