import request from '@/utils/request'

export function adminHomepage() {
  return request({
    url: '/admin/homepage',
    method: 'get',
  })
}