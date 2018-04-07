import axios from 'axios';
import { message } from 'antd';
import {cpy} from "./variable";
import pathToRegexp from 'path-to-regexp';

const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
    } = options;

  const cloneData = cpy(data);

  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      [domin] = url.match(/[a-zA-z]+:\/\/[^/]*/)
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    message.error(e.message)
  }


  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      })
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      })
    case 'post':
      return axios.post(url, cloneData)
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request (options) {

  return fetch(options).then((response) => {
    const { statusText, status } = response;
    let data = response.data;
    if (data instanceof Array) {
      data = {
        list: data,
      }
    }
    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    })
  }).catch((error) => {
    const { response } = error;
    let msg;
    let statusCode;
    if (response && response instanceof Object) {
      const { data, statusText } = response;
      statusCode = response.status;
      msg = data.message || statusText
    } else {
      statusCode = 600;
      msg = error.message || 'Network Error'
    }

    /* eslint-disable */
    return Promise.reject({ success: false, statusCode, message: msg })
  })
}


//import fetch from 'dva/fetch';
//
//const checkStatus=(response)=>{
//
//    if(response.status>=200 && response.status<=200){
//
//      return response;
//    }
//
//    const error=new Error(response.statusText);
//    error.response=response;
//    throw error;
//};
//
//export default async function request({url,...options}) {
//    console.log(url);
//    options.headers={
//        Accept: 'application/json',
//        'Content-Type': 'application/x-www-form-urlencoded'
//    }
//    const response=await fetch(url,options);
//    checkStatus(response);
//    const data=await response.json();
//
//    return data;
//}
