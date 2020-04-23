import React from 'react';
import './Posts.css';
import { Form, Input, Button, message, Upload } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';

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
            providerId: null,
        }
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
        const isJpgOrPngOrMp4 = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'video/mp4';
        if (!isJpgOrPngOrMp4) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
          message.error('Image must smaller than 10MB!');
        }
        return isJpgOrPngOrMp4 && isLt2M;
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

    uploadVideo = (event) => {
        console.log(event.file);
        const data = new FormData()
        data.append('file', event.file)
        data.append('upload_preset', 'tnd5cvzb')
        return axios.post('https://api.cloudinary.com/v1_1/deobpvcce/video/upload', data)
          .then((res) => {
            console.log(res)
            this.setState({
              video: res.data.url,
              videoId: res.data.public_id
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

    render() {
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
                    >
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
                            onContentStateChange={this.onContentStateChange}
                            />
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
                            <Button type="primary">Send</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}