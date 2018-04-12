import { Form, Input, Icon, Button, InputNumber, Row, Select  } from 'antd';
import { connect } from 'dva';
import React from 'react'
import {variable} from "../../utils"
const FormItem = Form.Item;
const Option = Select.Option;
const { isEmpty } = variable;
class DynamicFieldSet extends React.Component{

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.add = this.add.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.state = {
      formValue:[
        {
          name:undefined,
          value:100,
        }
      ],
      help:null,
    };
    this.formData=[];
  }

  componentWillReceiveProps (newProps){
    let formValue = [
      {
        name:undefined,
        value:100,
      }];
  }



  onChange(index,e){
    let {formValue,help} = this.state;
    if(Object.prototype.toString.call(e)==="[object Number]"){
      formValue[index].value = e;
    }else if(Object.prototype.toString.call(e)==="[object String]"){
      help = "";
      for(let i=0;i<formValue.length;i++){
        if(formValue[i].name == e){
          help = "不能选同一个人";
          break;
        }
      }
      formValue[index].name = e;

    }else{
      return ;
    }
    this.formData = formValue;
    let newState = Object.assign({},{formValue},{help});
    console.log(newState);
    this.setState({
      formValue,
      help
    });
    if(this.props.onChange){
      this.props.onChange(newState);
    }
  }

  add(){
    let {formValue} = this.state;
    formValue.push(
      {
        name:undefined,
        value:0
      }
    );
    this.setState({
      formValue
    });
    this.formData = formValue;
    this.onBlur();
  }

  delete(index){
    let {formValue} = this.state;
    formValue.splice(index,1);
    this.setState({
      formValue
    });
    this.formData = formValue;
    this.onBlur();
  }

  onBlur(){
    let formValue = this.formData;
    let num = 0;
    for(let i=0;i<formValue.length;i++){
      if(!formValue[i].name){
        this.setState({
          help:"请选择名称",
        });
        let newState = Object.assign({},formValue,{help:"请选择名称"});
        if(this.props.onChange){
          this.props.onChange(newState);
        }
        return ;
      }
      num = num + formValue[i].value;
    }
    if(num!==100){
      this.setState({
        help:"比例总和不为100%,请修改",
      });
      let newState = Object.assign({},{formValue},{help:"比例总和不为100%,请修改"});
      if(this.props.onChange){
        this.props.onChange(newState);
      }
      return ;
    }

    this.setState({
      help:"",
    });
    let newState = Object.assign({},formValue,{help:""});
    if(this.props.onChange){
      this.props.onChange(newState);
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
              onChange={this.onChange.bind(this,index)}
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
              onChange={this.onChange.bind(this,index)}
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
