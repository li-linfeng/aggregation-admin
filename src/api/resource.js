import request from '@/utils/request'

export function getResourceList(query) {
  return request({
    url: '/admin/resources',
    method: 'get',
    params:  query 
  })
}

export function switchStatus(id) {
  return request({
    url: `/admin/resources/${id}/switch`,
    method: 'patch',
  })
}



export function exportExcel(query) {
    return request({
      url: `/admin/resources/excel`,
      method: 'get',
      params:  query 
    })
}