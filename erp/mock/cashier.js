const Mock = require('mockjs');

let db = Mock.mock({
  'data|3-6': [{
    id: '@id',
    name: '@name',
    'age|18-32': 1
  }]
});


let customerList = [{
  "customerid": 88824,
  "customermobile": "13867443111",
  "customername": "钟丽菁",
  "customercode": "88824",
  "cardno": "H001794x",
  "serviceid": 63324,
  "servicestatus": 0
}, {
  "customerid": 193475,
  "customermobile": "13868113383",
  "customername": "庞凯",
  "customercode": "193475",
  "cardno": "m001908",
  "serviceid": 63387,
  "servicestatus": 0
}, {
  "customerid": 47557,
  "customermobile": "13758222879",
  "customername": "夏晓群",
  "customercode": "47557",
  "cardno": "g000925x",
  "serviceid": 63437,
  "servicestatus": 0
}, {
  "customerid": 46607,
  "customermobile": "18857882556",
  "customername": "徐航",
  "customercode": "46607",
  "cardno": "g000563",
  "serviceid": 63442,
  "servicestatus": 0
}, {
  "customerid": 47835,
  "customermobile": "13958079520",
  "customername": "A杨虹",
  "customercode": "47835",
  "cardno": "g000915X",
  "serviceid": 63448,
  "servicestatus": 0
}, {
  "customerid": 47587,
  "customermobile": "13588826929",
  "customername": "谭洁",
  "customercode": "47587",
  "cardno": "F000864",
  "serviceid": 63536,
  "servicestatus": 0
}, {
  "customerid": 47543,
  "customermobile": "13858010699",
  "customername": "A陆岩（备）",
  "customercode": "47543",
  "cardno": "026773",
  "serviceid": 63581,
  "servicestatus": 0
}, {
  "customerid": 268593,
  "customermobile": "15967563906",
  "customername": "小六",
  "customercode": "gkb000037",
  "cardno": "ASB0020",
  "serviceid": 64000,
  "servicestatus": 0
}, {
  "customerid": 10000010,
  "customermobile": "15868158503",
  "customername": "高炳快",
  "customercode": "gkb000023",
  "cardno": "G0147852",
  "serviceid": 64108,
  "servicestatus": 0
}];
let customerDetalis = {
  "serviceid": 63581,
  "customerid": "@id",
  "customercode": "47543",
  "customername": '@name',
  "customermobile": "13858010699",
  "servicecode": "20171227000330",
  "servicestarttime": "2017-12-27 13:10:31",
  "departid": 15,
  "departname": "黄龙店",
  "cardid": 3297,
  "cardno": "026773",
  "cardrankid": 43,
  "cardrankname": "静*钻石卡",
  "servicestatus": 0,
  "ordertype": 1,
  "ordertime": "2017-12-27 13:10:13",
  "roomname": " 藏红花（1号房）"
};


let customerListData = Mock.mock({
  'data': customerList
});
let customerDetalisData = Mock.mock({
  'data': customerDetalis
});

module.exports = {
  [`POST /cashier/customer/service/unfinish`](req, res) {

    res.status(200).json(customerListData);
  },
  [`POST /cashier/customer/service/get`](req, res) {

    res.status(200).json(customerDetalisData);
  },

}
