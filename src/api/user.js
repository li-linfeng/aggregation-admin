import request from '@/utils/request'

export function getUserList(query) {
  return request({
    url: '/admin/users',
    method: 'get',
    params:  query 
  })
}


export function switchStatus(id) {
  return request({
    url:  `/admin/users/${id}/switch`,
    method: 'patch',
  })
}


export function addTime(id, data) {
  return request({
    url:  `/admin/users/${id}/add_time`,
    method: 'post',
    data
  })
}

export function exportUser(query) {
  return request({
    url:  `/admin/users/export`,
    method: 'get',
    params:  query ,
    responseType: "blob",
  })
}