
import fetch from 'dva/fetch';
import { cpy, isEmpty } from "./variable";
import {message} from "antd";
import qs from 'qs';



//const APIV1 = 'http://localhost/cashier';
//const APIV1 = 'http://192.168.18.17/cashier';
let APIV1 = 'http://192.168.18.163:8384';
let APIV2 = 'http://192.168.18.163:8484';
//const APIV1 = '/cashier';


export default function request({ url, data, method="post"}) {
  let newOptions ={};
  if(url.indexOf('localhost')>0){
    url = String(url);
    newOptions = {
      headers: {
        // Accept: 'application/json',
        //'Content-Type': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: method.toLowerCase(),
      mode:'cors',
      credentials:'include',
      withCredentials:true,
      body:qs.stringify(data)
    };
  } else if(url.indexOf('erp-set')>0){
    url = APIV2+String(url);
    newOptions = {
      headers: {
        // Accept: 'application/json',
        //'Content-Type': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: method.toLowerCase(),
      mode:'cors',
      credentials:'include',
      withCredentials:true,
      body:qs.stringify(data)
    };
  }else{
    url = APIV1+String(url);
    newOptions = {
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json'
        //'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: method.toLowerCase(),
      mode:'cors',
      credentials:'include',
      withCredentials:true,
      body:isEmpty(data)?"{}":JSON.stringify(data)
    };
  }
  // url = APIV1+String(url);
  // let newOptions = {
  //   headers: {
  //     // Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //     //'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   method: method.toLowerCase(),
  //   mode:'cors',
  //   credentials:'include',
  //   withCredentials:true,
  //   body:JSON.stringify(data)
  // };
  return fetch(url, newOptions)
    .then(response=>{
      if (response.status >= 200 && response.status < 300) {

        let res = response.json();

        return res;
      }
      message.error('请求错误!');
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    })
    .then(json=>json)
    // .then(json=>{
    //   if (json.status!=200) {
    //     message.error('请求错误 错误码:'+json.status);
    //     const error = new Error(json.msg);
    //     error.response = response;
    //     throw error;
    //   } else {
    //     return json.data;
    //   }
    // })
}