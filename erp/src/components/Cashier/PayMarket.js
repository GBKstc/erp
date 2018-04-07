import React from "react";
import { connect } from 'dva';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import { variable } from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';
import BaseUI from '../BaseUI';

const {DynamicFieldSet} = BaseUI;

const { isEmpty } = variable;

const FormItem = Form.Item;

class PayMarket extends React.Component{
  constructor (props){
    super(props)
    console.log(props);
    this.state={
      showIntroduce:false
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);

  }
  onChange(value){
    console.log(value);
  }
  onClick(){
    this.setState({
      showIntroduce:true
    })
  }
  render() {
    const opation = [
      {
        key:'a',
        value:'a'
      },{
        key:'b',
        value:'b'
      },{
        key:'c',
        value:'c'
      }
    ];
    return (
      <BaseBox >
        <Row>
          <Form layout='vertical' style={{ width: '100%' }}>
            <Col span={6}>
              <FormItem
                label="销售部门:"
              >
                <Input
                  type="text"

                  value={"aaa"}
                  style={{ width: '65%', marginRight: '3%' }}
                />
                <Select
                  value={"1%"}
                  style={{ width: '32%' }}

                >
                  <Option value="1%">1%</Option>
                  <Option value="2%">2%</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={6}>
              <DynamicFieldSet onChange={this.onChange} title="销售顾问:" options={opation}/>
            </Col>
            <Col span={6}>
              <DynamicFieldSet onChange={this.onChange} title="销售美容师:" options={opation}/>
            </Col>
          </Form>
        </Row>
        {this.state.showIntroduce?(
          <Row>
            <Form layout='vertical' style={{ width: '100%' }}>
              <Col span={6}>
                <FormItem
                  label="介绍部门:"
                >
                  <Input
                    type="text"

                    value={"aaa"}
                    style={{ width: '65%', marginRight: '3%' }}
                  />
                  <Select
                    value={"1%"}
                    style={{ width: '32%' }}

                  >
                    <Option value="1%">1%</Option>
                    <Option value="2%">2%</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={6}>
                <DynamicFieldSet onChange={this.onChange} title="介绍顾问:" options={opation}/>
              </Col>
              <Col span={6}>
                <DynamicFieldSet onChange={this.onChange} title="介绍美容师:" options={opation}/>
              </Col>
            </Form>
          </Row>
        ):(
          <Row>
            <Col offset={1}>
              <Button type="primary" onClick={this.onClick}>添加介绍部门</Button>
            </Col>
          </Row>
        )}



      </BaseBox>
    )
  }
};

export default connect(({ cashier }) => (cashier))(PayMarket);
