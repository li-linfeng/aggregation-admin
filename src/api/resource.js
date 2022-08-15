import request from '@/utils/request'

export function getResourceList(query) {
  return request({
    url: '/admin/resources',
    method: 'get',
    params:  query 
  })
}

export function editResource(id,data) {
  return request({
    url: `/admin/resource/${id}`,
    method: 'put',
    data
  })
}


export function deleteResource(id) {
    return request({
      url: `/admin/resource/${id}`,
      method: 'delete',
    })
}


export function exportExcel(query) {
    return request({
      url: `/admin/resource/excel`,
      method: 'get',
      params:  query 
    })
}