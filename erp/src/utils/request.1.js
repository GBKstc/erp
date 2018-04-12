import axios from 'axios';
import { message } from 'antd';
import {cpy} from "./variable";
import pathToRegexp from 'path-to-regexp';
import qs from 'qs';
import jsonp from 'jsonp';

axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.post['Referer'] = 'http://localhost:3000/cashier/storeService';
const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
    } = options;

  const cloneData = cpy(data);

  // try {
  //   let domin = ''
  //   if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
  //     [domin] = url.match(/[a-zA-z]+:\/\/[^/]*/)
  //     url = url.slice(domin.length)
  //   }
  //   const match = pathToRegexp.parse(url)
  //   url = pathToRegexp.compile(url)(data)
  //   for (let item of match) {
  //     if (item instanceof Object && item.name in cloneData) {
  //       delete cloneData[item.name]
  //     }
  //   }
  //   url = domin + url
  // } catch (e) {
  //   message.error(e.message)
  // }

  // if (method === 'JSONP') {
  //   return new Promise((resolve, reject) => {
  //     jsonp(url, {
  //       param: `${qs.stringify(data)}&callback`,
  //       name: `jsonp_${new Date().getTime()}`,
  //       timeout: 4000,
  //     }, (error, result) => {
  //       if (error) {
  //         reject(error)
  //       }
  //       resolve({ statusText: 'OK', status: 200, data: result })
  //     })
  //   })
  // }

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
      return axios.post(url, JSON.stringify(cloneData))
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






// export default async function request({ url, method, data}) {
//   //  console.log(url);
//   //  options.headers={
//   //      Accept: 'application/json',
//   //      'Content-Type': 'application/x-www-form-urlencoded'
//   //  }
//   //  const response=await fetch(url,options);
//   url = String(url);
//   let newOptions = {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     method: method,
//     credentials: "include"
//   };
//   let form = '';
//   for (let key in data) {
//     let value = data[key];
//     if (typeof value === 'object' || Array.isArray(value)) {
//       value = JSON.stringify(value);
//     }
//     let item = key + '=' + encodeURIComponent(value);
//     form = form.length == 0 ? form + item : form + '&' + item;
//   }
//   newOptions.body = form;
//   return fetch(url, newOptions)
//     .then(response => {
//       if (response.status != 200) {
//         message.error('请求错误!');
//         throw 'post error';
//       } else {
//         return response.json();
//       }
//     })
//     .then(json => {
//       if (json.error == '1' || json.code == '1') {
//         // message.error(json.msg);
//         throw 'post error';
//       } else {
//         return json.data;
//       }
//     });
   

//    return await response.json();
// }
