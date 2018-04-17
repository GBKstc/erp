import React from "react";
import { connect } from 'dva';
import { Row, Col, Form, Input, Button, Select, InputNumber } from 'antd';
import { variable ,config,request} from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';
import BaseUI from '../BaseUI';
const Option = Select.Option;


const {DynamicFieldSet} = BaseUI;

const { isEmpty,cpy } = variable;
const { api } = config;

const FormItem = Form.Item;

class PayMarket extends React.Component{
  constructor (props){
    super(props)
    console.log(props);
    const {
      logininfo, marketInfo
    } = props;
    const {
        showIntroduce,
        //销售部门美容师和顾问选项
        saleStaffList,
        //介绍部门选项
        introduceList,
        //介绍部门美容师和顾问选项
        introduceStaffList,
        depart_info,
        //销售顾问
        sale_ad_info,
        saleAdInfo,
        //销售美容师
        sale_beauty_info,
        saleBeautyInfo,
        //介绍顾问
        introduce_ad_info,
        introduceAdInfo,
        //介绍美容师
        introduce_beauty_info,
        introduceBeautyInfo,
  } = marketInfo;
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setNewChange = this.setNewChange.bind(this);
    this.departInfoSaleChange = this.departInfoSaleChange.bind(this);
    this.saleAdInfoChange = this.saleAdInfoChange.bind(this);
    this.saleBeautyInfoChange = this.saleBeautyInfoChange.bind(this);
    this.findDepStroeList = this.findDepStroeList.bind(this);
    this.findDepStroeStaff = this.findDepStroeStaff.bind(this);
    this.departInfoIntroduceChange = this.departInfoIntroduceChange.bind(this);
    this.departInfoIntroduceProportion = this.departInfoIntroduceProportion.bind(this);
    this.introduceAdInfoChange = this.introduceAdInfoChange.bind(this);
    this.introduceBeautyInfoChange = this.introduceBeautyInfoChange.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.state={
      showIntroduce:showIntroduce,

      //销售部门美容师和顾问选项
      saleStaffList:saleStaffList,
      //介绍部门选项
      introduceList:introduceList,
      //介绍部门美容师和顾问选项
      introduceStaffList:introduceStaffList,
      depart_info:{
        sale:logininfo.departid,
        sale_proportion:depart_info.sale_proportion,
        introduce:depart_info.introduce,
        introduce_proportion:depart_info.introduce_proportion,
      },
      // depart_info:{
      //   sale: logininfo.companyid, //销售部门ID
      //   sale_proportion: 100, //销售部门提成比例
      //   introduce: null, //介绍部门ID
      //   introduce_proportion: null //介绍部门提成比例
      // },
      //销售顾问
      sale_ad_info: sale_ad_info,
      saleAdInfo:saleAdInfo,
      //销售美容师
      sale_beauty_info:sale_beauty_info,
      saleBeautyInfo:saleBeautyInfo,
      //介绍顾问
      introduce_ad_info:introduce_ad_info,
      introduceAdInfo:introduceAdInfo,
      //介绍美容师
      introduce_beauty_info:introduce_beauty_info,
      introduceBeautyInfo:introduceBeautyInfo,
      departInfoHelp:null,
    };


  }

  componentWillMount(){
    //获取介绍部门

    //获取销售店员
    this.findDepStroeStaff("sale",this.props.logininfo.departid);
  }

  onChange(key,value){

    let { ...State } = this.state;
    let newData = {};

    switch (key) {
      //更改销售部门占比
      case "departInfoSale":
        newData = this.departInfoSaleChange(value);
        break;
      //更改销售顾问信息
      case "sale_ad_info":
        newData = this.saleAdInfoChange(value);
        break;
      //更改销售美容师信息
      case "sale_beauty_info":
        newData = this.saleBeautyInfoChange(value);
        break;
      //更改介绍部门
      case "departInfoIntroduce":
        newData = this.departInfoIntroduceChange(value);
        break;
      //更改介绍部门占比
      case "departInfoIntroduceProportion":
        newData = this.departInfoIntroduceProportion(value);
        break;
      //更改介绍顾问信息
      case "introduce_ad_info":
        newData = this.introduceAdInfoChange(value);
        break;
      //更改介绍美容师信息
      case "introduce_beauty_info":
        newData = this.introduceBeautyInfoChange(value);
        break;
    }
    this.setNewChange(newData);
  }

  onClick(){
    this.setNewChange({showIntroduce:true});
    this.findDepStroeList();
  }

  onBlur(){
    const {depart_info, showIntroduce} = this.state;
    // depart_info:{
    //   sale: logininfo.companyid, //销售部门ID
    //   sale_proportion: 100, //销售部门提成比例
    //   introduce: null, //介绍部门ID
    //   introduce_proportion: null //介绍部门提成比例
    // },
    let departInfoHelp = "";
    //有推荐部门
    if(isEmpty(depart_info.introduce)){
      if(depart_info.sale_proportion!=100){
        departInfoHelp =  "销售部门比例不对";
      }
    }else{
      if((depart_info.introduce_proportion+depart_info.sale_proportion)!==100){
        departInfoHelp =  "销售部门加介绍部门比例和不为100";
      }
      if(depart_info.sale==depart_info.introduce){
        departInfoHelp =  "销售部门不能作为介绍部门";
      }
    }
    this.setNewChange({
      departInfoHelp
    })
  }

  departInfoSaleChange(value) {
    /**
     * depart_info:{
        sale: logininfo.companyid, //销售部门ID
        sale_proportion: 100, //销售部门提成比例
        introduce: null, //介绍部门ID
        introduce_proportion: null //介绍部门提成比例
      },
     */
    let { depart_info } = this.state;
    depart_info.sale_proportion = value;
    return { depart_info };
  }

  departInfoIntroduceChange(value){

    let { depart_info, introduce_ad_info, introduce_beauty_info  } = this.state;
    depart_info.introduce = value;
    if(isEmpty(value)){
      depart_info.introduce_proportion = 0;
      introduce_ad_info={
        "introduce": undefined,
        "introduce_proportion": null
      };
      introduce_beauty_info={
        "introduce": undefined,
        "introduce_proportion": null
      };
    }else{
      //获取介绍店员
      this.findDepStroeStaff("introduce",value);
    }


    return {depart_info,introduce_ad_info,introduce_beauty_info};
  }

  departInfoIntroduceProportion(value){
    let { depart_info } = this.state;
    depart_info.introduce_proportion = value;
    return depart_info;
  }

  saleAdInfoChange(value){
    let {saleAdInfo} = this.state;
    let sale_ad_info = [];
    saleAdInfo = cpy(value);
    value = value.formValue;

    for(let i=0;i<value.length;i++){
      let newInfo = {};
      newInfo.sale = value[i].name;
      newInfo.sale_proportion = value[i].value;
      sale_ad_info.push(newInfo);
    }
    return {sale_ad_info,saleAdInfo};
  }

  saleBeautyInfoChange(value){
    let {saleBeautyInfo} = this.state;
    let sale_beauty_info = [];
    saleBeautyInfo = cpy(value);
    value = value.formValue;
    for(let i=0;i<value.length;i++){
      let newInfo = {};
      newInfo.sale = value[i].name;
      newInfo.sale_proportion = value[i].value;
      sale_beauty_info.push(newInfo);
    }
    return {sale_beauty_info, saleBeautyInfo};
  }

  introduceAdInfoChange(value){
    let {introduceAdInfo} = this.state;
    let introduce_beauty_info = [];
    introduceAdInfo = cpy(value);
    value = value.formValue;
    for(let i=0;i<value.length;i++){
      let newInfo = {};
      newInfo.sale = value[i].name;
      newInfo.sale_proportion = value[i].value;
      introduce_beauty_info.push(newInfo);
    }
    return {introduce_beauty_info,introduceAdInfo};
  }

  introduceBeautyInfoChange(value){
    let {introduceBeautyInfo} = this.state;
    let introduce_beauty_info = [];
    introduceBeautyInfo = cpy(value);
    value = value.formValue;
    for(let i=0;i<value.length;i++){
      let newInfo = {};
      newInfo.sale = value[i].name;
      newInfo.sale_proportion = value[i].value;
      introduce_beauty_info.push(newInfo);
    }
    return {introduce_beauty_info,introduceBeautyInfo};
  }

  setNewChange(newData) {
    let { ...State } = this.state;
    let newState = Object.assign({}, State, newData);
    this.setState({
      ...newState
    });
    if (this.props.onChange) {
      this.props.onChange(newState);
    }

  }

  findDepStroeList(){
    let object = {
      url: api.findDepStroe,
      method: 'post',
    };
    request(object)
        .then(({ data }) => {
          //let introduceList = [];
          // if(!isEmpty(data)){
          //   for(let i=0;i<data.entitys.length;i++){
          //     introduceList.push({
          //       key:data[i].id,
          //       value:data[i].name,
          //     });
          //   }
          // }
          let newData = {
            introduceList:data,
          };

          this.setNewChange(newData);
        })
  }

  findDepStroeStaff(key,departmentId){

    let object = {
      url: api.findDepStroeStaff,
      method: 'post',
      data:{
        // department_id: logininfo.departid,
        department_id: departmentId,
        del: "n",
        pageNum: 1,
        pageSize: 999,
      }
    };
    request(object)
      .then(({ data }) => {
        let newList = [];
        let newData = {};
        if(!isEmpty(data)&&!isEmpty(data.entitys)){
          for(let i=0;i<data.entitys.length;i++){
            newList.push({
              key:data.entitys[i].id,
              value:data.entitys[i].username,
            });
          }
        }
        if(key=="sale"){
          newData = {
            saleStaffList:newList,
          };
        }else{
          newData = {
            introduceStaffList:newList,
          };
        }

        console.log(data);
        this.setNewChange(newData);
      })
  }

  render() {
    const {introduceList} = this.state;
    const introduceOpation = introduceList.map((item,index)=>(
      <Option value={item.id} key={item.id}>{item.name}</Option>
    ));
    return (
      <BaseBox title="添加部门">
        <Row>
          <Form layout='vertical' style={{ width: '100%' }}>
            <Col span={6}>
              <FormItem
                label="销售部门:"
                help={this.state.departInfoHelp}
              >
                <Row>
                  <Col span={12}>
                    <Input
                      type="text"
                      disabled={true}
                      value={this.props.logininfo.departname}
                    />
                  </Col>
                  <Col span={8} style={{marginLeft:"10px"}}>
                    <InputNumber
                      value={this.state.depart_info.sale_proportion}
                      min={0}
                      max={100}
                      formatter={value => `${value}%`}
                      parser={value => value.replace('%', '')}
                      onChange={this.onChange.bind(this, "departInfoSale")}
                      onBlur={this.onBlur}
                    />
                  </Col>
                  <Col span={4}></Col>
                </Row>
              </FormItem>
            </Col>
            <Col span={6}>
              <DynamicFieldSet onChange={this.onChange.bind(this,"sale_ad_info")} title="销售顾问:" options={this.state.saleStaffList} dynamicFieldSetState={this.state.saleAdInfo}/>
            </Col>
            <Col span={6}>
              <DynamicFieldSet onChange={this.onChange.bind(this, "sale_beauty_info")} title="销售美容师:" options={this.state.saleStaffList} dynamicFieldSetState={this.state.saleBeautyInfo}/>
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
                  <Row>
                    <Col span={12}>
                      <Select
                        value={this.state.depart_info.introduce}
                        onChange={this.onChange.bind(this,"departInfoIntroduce")}
                        allowClear={true}
                      >
                        {introduceOpation}
                      </Select>
                    </Col>
                    <Col span={8} style={{marginLeft:"10px"}}>
                      <InputNumber
                        value={this.state.depart_info.introduce_proportion}
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        onChange={this.onChange.bind(this,'departInfoIntroduceProportion')}
                        onBlur={this.onBlur}
                      />
                    </Col>
                    <Col span={4}></Col>
                  </Row>
                </FormItem>
              </Col>
              <Col span={6}>
                <DynamicFieldSet onChange={this.onChange.bind(this,'introduce_ad_info')} title="介绍顾问:" options={this.state.introduceStaffList} dynamicFieldSetState={this.state.introduceAdInfo}/>
              </Col>
              <Col span={6}>
                <DynamicFieldSet onChange={this.onChange.bind(this,'introduce_beauty_info')} title="介绍美容师:" options={this.state.introduceStaffList} dynamicFieldSetState={this.state.introduceBeautyInfo}/>
              </Col>
            </Form>
          </Row>
        ):(
          <Row>
            <Col>
              <Button type="primary" onClick={this.onClick}>添加介绍部门</Button>
            </Col>
          </Row>
        )}
      </BaseBox>
    )
  }
};

export default connect(({ cashier }) => (cashier))(PayMarket);
