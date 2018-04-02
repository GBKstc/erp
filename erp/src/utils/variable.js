
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

module.exports = {
    isEmpty,
    isEqual,
    json_decode,
    json_decode_arr,
    format_str,
    unformat_str,
    cpy
}


