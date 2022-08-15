import request from '@/utils/request'

export function getFeedbackList(query) {
  return request({
    url: '/admin/feedbacks',
    method: 'get',
    params:  query 
  })
}

export function replyFeedback(id,data) {
  return request({
    url: `/admin/feedback/${id}/reply`,
    method: 'post',
    data
  })
}


export function deleteFeedback(id) {
    return request({
      url: `/admin/feedback/${id}`,
      method: 'delete',
    })
  }