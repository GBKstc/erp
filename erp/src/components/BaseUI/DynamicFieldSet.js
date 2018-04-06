import { Form, Input, Icon, Button, InputNumber,Row  } from 'antd';
import { connect } from 'dva';
import React from 'react'
const FormItem = Form.Item;

class DynamicFieldSet extends React.Component{

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.add = this.add.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.state = {
      formValue:[
        {
          name:"aa",
          value:50,
        }
      ],
    };

  }

  componentWillMount(){

  }

  onChange(index,e){
    let {formValue} = this.state;
    if(Object.prototype.toString.call(e)==="[object Number]"){
      formValue[index].value = e;
    }else if(Object.prototype.toString.call(e)==="[object Object]"){
      formValue[index].name = e.target.value;
    }else{
      return ;
    }
    this.setState({
      formValue
    });
    if(this.props.onChange){
      this.props.onChange(formValue);
    }
  }

  add(){
    let {formValue} = this.state;
    formValue.push(
      {
        name:null,
        value:0
      }
    )
    this.setState({
      formValue
    })
    this.onBlur();
  }

  delete(index){
    let {formValue} = this.state;
    formValue.splice(index,1);
    this.setState({
      formValue
    })
    this.onBlur();
  }

  onBlur(){
    let {formValue} = this.state;
    let num = 0;
    for(let i=0;i<formValue.length;i++){
      if(!formValue[i].name){
        this.setState({
          help:"请输入名称",
          validateStatus:"error"
        });
        return ;
      }
      num = num + formValue[i].value;
    }
    if(num!==100){
      this.setState({
        help:"比例总和不为100%,请修改",
        validateStatus:"error"
      });
      return ;
    }
    this.setState({
      help:null,
      validateStatus:"success",

    })

  }

  render() {

    const formItems = this.state.formValue.map((k, index) => {
      let {value,name} = k;
      return (
          <Row key={index}>
            <Input
              type="text"
              value={name}
              style={{ width: '65%', marginRight: '3%' }}
              onChange={this.onChange.bind(this,index)}
              onBlur={this.onBlur}
            />
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
          validateStatus={this.state.validateStatus}
          help={this.state.help}
        >
        {formItems}
        </FormItem>
      </Form>
    );
  }
};
export default connect()(DynamicFieldSet);
