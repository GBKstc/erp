import { connect } from 'dva';
import { Row, Col } from 'antd';
import {variable} from '../../utils';
import * as styles from "./OpenCardDiscount.less";
import BaseBox from '../BaseBox';

const {isEmpty} = variable;

const OpenCardDiscount = ({ openCardState }) => {
    const cardInfo = isEmpty(openCardState.cardRanksInfoData.card) ? {
        //折扣
        goods_discount : '100',
        project_discount : '100',
        liaocheng_discount : '100',
        prom_discount : '100',

        //赠送金额
        em_give_amount: '0',//医美赠送余额
        sm_give_amount: '0',//生美赠送余额
        goods_give_amount: '0',//物品赠送余额
        project_give_amount: '0',//项目赠送余额
        liaocheng_give_amount: '0',//疗程赠送余额
        prom_give_amount: '0',//促销方案赠送余额
    } : openCardState.cardRanksInfoData.card;
    return (
        <Row>
            <Col span={10}>
                <BaseBox title="折扣（%）">
                    <Row type="flex" justify="space-between">
                        <Col span={5}>
                            <Row>
                                <Col span={24}>
                                    <div className={styles.num}>
                                        {cardInfo.goods_discount}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div className={styles.title}>
                                        物品
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={5} className={styles.borderLine2}>
                            <Row>
                                <Col span={24}>
                                    <div className={styles.num}>
                                        {cardInfo.project_discount}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div className={styles.title}>
                                        项目
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={5} className={styles.borderLine2}>
                            <Row>
                                <Col span={24}>
                                    <div className={styles.num}>
                                        {cardInfo.liaocheng_discount}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div className={styles.title}>
                                        疗程
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={5} className={styles.borderLine2}>
                            <Row>
                                <Col span={24}>
                                    <div className={styles.num}>
                                        {cardInfo.prom_discount}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div className={styles.title}>
                                        方案
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>    
                </BaseBox>
            </Col>
            <Col span={14}>
                <div className={styles.money}>
                    <BaseBox title="赠送金额（元）">
                        <Row type="flex" justify="space-between">
                            <Col span={3}>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.num}>
                                            {cardInfo.sm_give_amount}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.title}>
                                            生美
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={3} className={styles.borderLine}>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.num}>
                                            {cardInfo.em_give_amount}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.title}>
                                            医美
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={3} className={styles.borderLine}>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.num}>
                                            {cardInfo.goods_give_amount}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.title}>
                                            物品
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={3} className={styles.borderLine}>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.num}>
                                            {cardInfo.project_give_amount}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.title}>
                                            项目
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={3} className={styles.borderLine}>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.num}>
                                            {cardInfo.liaocheng_give_amount}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.title}>
                                            疗程
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={3} className={styles.borderLine}>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.num}>
                                            {cardInfo.prom_give_amount}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.title}>
                                            方案
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </BaseBox>
                </div>
                
            </Col>
        </Row>
    )
    
};

export default connect(({cashier}) => (cashier))(OpenCardDiscount);
