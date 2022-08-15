import request from '@/utils/request'

export function getUserList(query) {
  return request({
    url: '/admin/users',
    method: 'get',
    params:  query 
  })
}
