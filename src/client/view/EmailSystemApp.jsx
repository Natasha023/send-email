import React, { Component } from 'react';
import axios from 'axios';
import './EmailSystemApp.css';
import { Form, Col, Row, Input, Button, Card, message, Spin} from 'antd';
const FormItem = Form.Item;

class EmailSystemForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      ccVisible: false,
      bccVisible: false
    }
  }

  handleSubmit(event){
    event.preventDefault();
    let hasError = false;
    this.props.form.validateFields(
      (err) => {
        if (err) {
          hasError = true;
        }
      },
    );
    if (hasError) {
      return;
    }
    const data = this.props.form.getFieldsValue();
    this.setState({
      loading: true
    });
    const payload = {
      to: data.to, 
      from: data.from,
      subject: data.subject,
      text: data.text,
      cc: data.CCs,
      bcc: data.BCCs
    }
    axios.post('http://localhost:4200/sendEmail', payload)
    .then(res => 
      {
        const msg = res.data;
        this.props.form.resetFields();
        message.success(msg);
        this.setState({
          loading: false,
        });
      }).catch(err => {
        if (err.response) {
          message.error( err.response.data, 6);
        } 
        this.setState({
          loading: false,
        });
    })
  }

  add = (label) => {
    const { form } = this.props;
     
    if(label==='CCs'){
      this.setState({
        ccVisible: true
      })
    } else {
      this.setState({
        bccVisible: true
      })
    }
    // can use data-binding to get
     const keys = form.getFieldValue('keys');
     const nextKeys = keys.concat(label);

    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }
  
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    getFieldDecorator('text', { initialValue: '' });
    const keys = getFieldValue('keys');
    const emailPattern = new RegExp(/^(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*;\s*|\s*$))*$/i);
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...formItemLayout}
          label={k}
          required={false}
          key={k}
        >
          {getFieldDecorator(`${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              pattern: emailPattern, message: 'The input is not valid E-mail!',
            },],
          })(
            <Input className="input-size"   />
          )}
        </FormItem>
      );
    });
    return (
        <div className="App">
       
        <Card title="Send Mail" className="card-style">
        <Spin spinning={this.state.loading}>
                <Row type="flex" justify="space-around">
                  <Form layout="vert" onSubmit={this.handleSubmit.bind(this)}>
                      <FormItem label="From:"  {...formItemLayout}>
                        {getFieldDecorator('from', {
                            rules: [{
                              type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                              required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                        <Input className="input-size" placeholder='Sender'/>
                      )}
                      </FormItem>
                      <FormItem label="To:" {...formItemLayout} extra="Input multiple recipients seperate by ';'.">
                        <Row gutter={8}>
                          <Col span={18}>
                          {getFieldDecorator('to', {
                                rules: [{
                                  pattern: emailPattern, message: 'The input is not valid E-mail!',
                                }, {
                                  required: true, message: 'Please input your E-mail!',
                                }],
                            })(
                            <Input className="input-size"  placeholder='Recipients'/>
                            )}
                        </Col>
                        <Col span={6}>
                        <Button className="btn-cc" size="small" onClick={()=> { this.add('CCs')}} disabled={this.state.ccVisible}>Cc</Button><Button className="btn-cc" size="small" onClick={()=> { this.add('BCCs')}} disabled={this.state.bccVisible}>Bcc</Button>
                        </Col>
                        </Row>
                      </FormItem>
                      {formItems}
                      <FormItem label="Subject" {...formItemLayout}>
                        {getFieldDecorator('subject', {
                            rules: [{
                              required: true, min: '1', message: 'Please input your subject!',
                            }],
                        })(
                        <Input className="input-size"  placeholder='Subject'/>
                      )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('text', {
                            rules: [{
                              required: true, min: '1', message: 'Message cannot be empty!'
                            }],
                        })(
                        <textarea className="textarea-size"/>
                      )}
                      </FormItem>
                <p>
                <Button type='primary' size="large" htmlType='submit'> Send</Button>
                </p>
              </Form>
            </Row>
          </Spin>
        </Card> 
  </div>
         
    );
  }
}

const EmailSystemApp = Form.create()(EmailSystemForm);

export default EmailSystemApp;
