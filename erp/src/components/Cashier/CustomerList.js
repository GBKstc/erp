import React from 'react'
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './CustomerList.less';
import { variable } from "../../utils";

const {
    isEmpty
} = variable;


class CustomerList extends React.Component{
    constructor (props) {
        super(props)
        const {
            customerList,
            isSelect,
        } = props;
        
        this.state = {
            customerList,
            isSelect,
        }
    }

    onClick(serviceid, key){
        this.props.dispatch({ 
            type: 'cashier/getCustomerById',
            payload: {
                serviceid
            }
        });
        this.props.dispatch({ 
            type: 'cashier/selectCustomer',
            payload: {
                key
            }
        });
    }

    render(){
        const customerShow = this.state.customerList.map(
            ({customername,customermobile,servicestatus,serviceid}, key)=>(
                    <Col className={this.state.isSelect[key]?styles.select:styles.card} span={7} offset={1} key={key} onClick={this.onClick.bind(this,serviceid,key)}>
                        <Col span={8} >{customername}</Col>
                        <Col span={8} >{customermobile}</Col>
                        <Col span={8} >{servicestatus=0?"服务中":"服务完成"}</Col>
                    </Col> 
            )
        );
        return (
            <Row type="flex" align="middle" style={{backgroundColor:"rgb(245,245,245)"}}>
                <Col span={24} style={{backgroundColor:"rgb(255,255,255)"}} > 
                    <Row type="flex" align="middle" className={styles.box} >
                        {customerShow}
                    </Row> 
                </Col>
            </Row>
                
        );
    }
}


export default connect(({cashier}) => (cashier))(CustomerList);