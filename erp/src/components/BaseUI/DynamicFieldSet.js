import { Form, Input, Icon, Button, InputNumber, Row, Select ,message } from 'antd';
import { connect } from 'dva';
import React from 'react'
import {variable} from "../../utils"
const FormItem = Form.Item;
const Option = Select.Option;
const { isEmpty } = variable;

const helpInfo = {
  "same":"不能选同一个人",
  "name":"请选择名称",
  "total":"比例总和不为100%,请修改",
  "zero":"比例不能为0"

};
class DynamicFieldSet extends React.Component{

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.add = this.add.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.verifyFrom = this.verifyFrom.bind(this);
    this.setNewChange = this.setNewChange.bind(this);
    this.state = {
      formValue:[
        {
          name:"",
          value:100,
        }
      ],
      help:"",
    };
  }




  onChange(index,key,value){
    let {formValue,help} = this.state;
    formValue[index][key] = value;
    let newState = Object.assign({},{formValue},{help});
    this.setNewChange(newState);
  }

  add(){
    let {formValue,help} = this.state;
    formValue.push(
      {
        name:"",
        value:0
      }
    );
    let newState = Object.assign({},{formValue,help});
    this.setNewChange(newState);

  }

  delete(index){
    let {formValue,help} = this.state;
    formValue.splice(index,1);
    let newState = Object.assign({},{formValue,help});
    this.setNewChange(newState);
  }

  onBlur(){

  }

  verifyFrom(newState){
    let { formValue, help} = newState;
    let allName = "";
    let allNum = 0;
    let info = "";
    for(let i=0;i<formValue.length;i++){

      if(formValue[i].value==0){
        info = helpInfo.zero;
      }
      if(allName.indexOf(formValue[i].name)>-1){
        info = helpInfo.same;
      }
      allName = allName + formValue[i].name;
      allNum = allNum + formValue[i].value;
    }

    if(allNum!=100){
      info = helpInfo.total
    }
    help = info;
    return Object.assign({},{formValue,help});
  }

  setNewChange(newState){
    let State = this.verifyFrom(newState);
    this.setState({
      ...State
    });
    if(this.props.onChange){
      this.props.onChange(State);
    }

  }
  render() {
    const {options} = this.props;
    //const options = [
    //  {
    //    key:'a',
    //    value:'a',
    //  },
    //  {
    //    key:'b',
    //    value:'b',
    //  },
    //  {
    //    key:'c',
    //    value:'c',
    //  }
    //];

    const children = isEmpty(options)?null:
      options.map((item,index)=>(
        <Option key={item.key}>{item.value}</Option>
      ));

    const formItems = this.state.formValue.map((k, index) => {
      let {value,name} = k;
      return (
          <Row key={index}>
            <Select
              placeholder="请选择"
              optionFilterProp="children"
              style={{ width: '65%', marginRight: '3%'}}
              value={name}
              onChange={this.onChange.bind(this,index,"name")}
              onBlur={this.onBlur}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {children}
            </Select>
            <InputNumber
              value={value}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              onChange={this.onChange.bind(this,index,"value")}
              onBlur={this.onBlur}
            />
            {
              index===0?
                <Icon type="plus-circle-o" onClick={this.add}/>:
                <Icon type="minus-circle-o" onClick={this.delete.bind(this,index)}/>
            }
          </Row>




      );
    });
    return (
      <Form>
        <FormItem
          label={`${this.props.title}:`}
          help={this.state.help}
        >
        {formItems}
        </FormItem>
      </Form>
    );
  }
};
export default connect()(DynamicFieldSet);
