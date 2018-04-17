
/**一些基本的函数**/

function isEmpty(o){
    if(o == null || o == undefined)
        return true;
    switch (typeof o){
        case "boolean":
            return false;
        case "object":
            for (let t in o)
                return false;
            return true;
        case "array":
        case "string":
            return o.length <= 0;
        case "number":
            return o.toString().length <= 0;
        case "function":
            return false;
    }
    return true;
}

/**
 * 判断两个变量是否相同
 * @returns {boolean}
 */
function isEqual(a, b) {
    if(isEmpty(a) && isEmpty(b))
        return true;
    if(isEmpty(a) || isEmpty(b))
        return false;
    switch (typeof a){
        case "object":
            if(count(a) != count(b))
                return false;
            for(let i in a){
                if(!isEqual(a[i], b[i]))
                    return false;
            }
            return true;
        default:
            return a === b;
    }
}

/**json解析函数**/
function json_decode(str){
    let res = {};
    try{
        res = JSON.parse(str);
    }catch(e){}
    return res;
}

function json_decode_arr(str){
    let res = [];
    try{
        res = JSON.parse(str);
    }catch(e){}
    return res;
}

/**字符串格式化函数**/
/**
 *去格式化字符串，去掉所有的空格和换行符
 * @param str
 * @return str
 */
function format_str(str){
    str = str.replace(/\s/g, "");
    str = str.replace(/[\n]/g,"")
    str = str.replace(/[\r]/g,"")
    return str
}

/**
 *格式化字符串，加上空格和换行符
 * @param str
 * @return str
 */
function unformat_str(str){
    var curLevel = 0;
    var res = ''
    for(var i in str){
        if(str[i] == '{'){
            res += '{\n';
            curLevel += 1;
            for(var j = 0; j < curLevel*8; j++){
                res += ' ';
            }
        }else if(str[i] == '}'){
            res += '\n'
            curLevel = curLevel - 1;
            for(var j = 0; j < curLevel*8; j++){
                res += ' ';
            }
            res += '}'
        }else if(str[i] == ','){
            res += ',\n'
            for(var j = 0; j < curLevel*8; j++){
                res += ' ';
            }
        }else{
            res += str[i]
        }
    }
    return res
}

/**对象和数组相关的函数**/
/**
 * 深度拷贝, 防止因直接赋值引起的地址相同问题
 * @returns {*}
 */
function cpy(o){
    let res = {};
    switch(typeof o){
        case "object":
            //判断o是否是react组件对象， 如果是 直接赋值
            if(!isEmpty(o) && o["$$typeof"] == Symbol.for('react.element')) {
                res = o;
                break;
            }
            if(Object.prototype.toString.call(o) === '[object Array]')
                res = [];
            for(let i in o){
                res[i] = cpy(o[i]);
            }
            break;
        default: res = o; break;
    }
    return res;
}

// /**
//  * 删除对象内空属性
//  * @returns {*}
//  */
// const removeEmpty = (obj) =>
//   Object.entries(obj).forEach(([key, val]) => {
//     if (val && typeof val === 'object') removeEmpty(val)
//     else if (val == null) delete obj[key]
//   });

// /**
//  * 求数组重复值
//  * @returns {*}
//  */
function intersect () {  //集合取交集
  var result = new Array();
  var obj = {};
  for (var i = 0; i < arguments.length; i++) {
    for (var j = 0; j < arguments[i].length; j++) {
      var str = arguments[i][j];
      if (!obj[str]) {
        obj[str] = 1;
      }
      else {
        obj[str]++;
        if (obj[str] == arguments.length)
        {
          result.push(str);
        }
      }//end else
    }//end for j
  }//end for i
  return result;
}

/**cookic**/
/**
 * 设置cookic
 *
 */
function SetCookie(name, value)//两个参数，一个是cookie的名子，一个是值
{
    let Days = 300; //此 cookie 将被保存 30 天
    let exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
/**
 * 获取cookic
 *
 */
function getCookie(name)//取cookies函数
{
    let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return (arr[2]); return null;

}
/**
 * 数字转字体
 */
function money2Big (money, simple = true) {
    let cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
    if (simple) {
        cnNums = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
    }
    let cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
    if (simple) {
        cnIntRadice = new Array("", "十", "百", "千");
    }
    let cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
    let cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
    let cnInteger = "整"; //整数金额时后面跟的字符
    let cnIntLast = "元"; //整型完以后的单位
    let maxNum = 999999999999999.9999; //最大处理的数字
    let IntegerNum; //金额整数部分
    let DecimalNum; //金额小数部分
    let ChineseStr = ""; //输出的中文金额字符串
    let parts; //分离金额后用的数组，预定义
    if (money == "") {
        return "";
    }
    money = parseFloat(money);
    if (money >= maxNum) {
        alert('超出最大处理数字');
        return "";
    }
    if (money == 0) {
        ChineseStr = cnNums[0] + cnIntLast + cnInteger;
        return ChineseStr;
    }
    money = money.toString(); //转换为字符串
    if (money.indexOf(".") == -1) {
        IntegerNum = money;
        DecimalNum = '';
    } else {
        parts = money.split(".");
        IntegerNum = parts[0];
        DecimalNum = parts[1].substr(0, 4);
    }
    if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
        let zeroCount = 0;
        let IntLen = IntegerNum.length;
        for (let i = 0; i < IntLen; i++) {
            let n = IntegerNum.substr(i, 1);
            let p = IntLen - i - 1;
            let q = p / 4;
            let m = p % 4;
            if (n == "0") {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    ChineseStr += cnNums[0];
                }
                zeroCount = 0; //归零
                ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
                ChineseStr += cnIntUnits[q];
            }
        }
        ChineseStr += cnIntLast;
        //整型部分处理完毕
    }
    if (DecimalNum != '') { //小数部分
        let decLen = DecimalNum.length;
        for (let i = 0; i < decLen; i++) {
            let n = DecimalNum.substr(i, 1);
            if (n != '0') {
                ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (ChineseStr == '') {
        ChineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (DecimalNum == '') {
        ChineseStr += cnInteger;
    }
    return ChineseStr;
};
module.exports = {
    isEmpty,
    isEqual,
    json_decode,
    json_decode_arr,
    format_str,
    unformat_str,
    cpy,
   // removeEmpty,
    money2Big,

    SetCookie,
    getCookie

}


