import {
  request,
  config,
  variable
} from '../utils'

const {
  api
} = config
const {
  get_customer_list,
  get_customerById
} = api

export function getCustomerList() {
  let param = {
    departmentid:15,
    type:0
  }
  return request({
    url: get_customer_list,
    method: 'post',
    data:param
  })
}

export function getCustomerById(params) {
  console.log(params);
  return request({
    url: get_customerById,
    method: 'post',
    data: params,
  })
}

// export function query (params) {
//   return request({
//     url: user.replace('/:id', ''),
//     method: 'get',
//     data: params,
//   })
// }
