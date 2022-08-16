import request from '@/utils/request'

export function getResourceList(query) {
  return request({
    url: '/admin/resources',
    method: 'get',
    params:  query 
  })
}

export function switchResource(id,data) {
  return request({
    url: `/admin/resources/${id}/switch`,
    method: 'patch',
  })
}


export function deleteResource(id) {
    return request({
      url: `/admin/resources/${id}`,
      method: 'delete',
    })
}


export function exportResource(query) {
    return request({
      url: `/admin/resources/export`,
      method: 'get',
      params:  query ,
      responseType: "blob",
    })
}