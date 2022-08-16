import request from '@/utils/request'

export function getFeedbackList(query) {
  return request({
    url: '/admin/feedbacks',
    method: 'get',
    params:  query 
  })
}


export function deleteFeedback(id) {
    return request({
      url: `/admin/feedbacks/${id}`,
      method: 'delete',
    })
  }