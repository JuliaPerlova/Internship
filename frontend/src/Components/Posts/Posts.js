import React from 'react';
import './Posts.css';
import { Form, Input, Button, message, Upload } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const { TextArea } = Input;

export default class Posts extends React.Component {

    state = {
        editorState: EditorState.createEmpty(),
        title: null,
        text: null,
        attachments: [],
        providerId: []
    }

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        const body = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        console.log(body)
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
                            />
                        </Form.Item>
                        <Form.Item>
                        <Upload customRequest={this.uploadFile} showUploadList={false} beforeUpload={this.beforeUpload}>
                            <Button> 
                                <UploadOutlined /> add picture
                            </Button>
                        </Upload>
                        <img src={this.state.avatar}/>
                        </Form.Item>
                        <Form.Item>
                        <Upload customRequest={this.uploadFile} showUploadList={false} beforeUpload={this.beforeUpload}>
                            <Button> 
                                <UploadOutlined /> add video
                            </Button>
                        </Upload>
                        <img src={this.state.avatar}/>
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