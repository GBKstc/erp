import fetch from 'dva/fetch';

const checkStatus=(response)=>{

    if(response.status>=200 && response.status<=200){

      return response;
    }

    const error=new Error(response.statusText);
    error.response=response;
    throw error;
};

export default async function request({url,...options}) {
    console.log(url);
    options.headers={
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const response=await fetch(url,options);
    checkStatus(response);
    const data=await response.json();

    return data;
}