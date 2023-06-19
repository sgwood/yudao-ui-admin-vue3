import request from '@/config/axios'

export interface ApiAccessLogVO {
  id: number
  traceId: string
  userId: number
  userType: number
  applicationName: string
  requestMethod: string
  requestParams: string
  requestUrl: string
  userIp: string
  userAgent: string
  beginTime: Date
  endTIme: Date
  duration: number
  resultCode: number
  resultMsg: string
  createTime: Date
}

// 查询列表API 问答
export const getAiDataQaPage = (params: PageParam) => {
  return request.get({ url: '/ai/data/qa/page', params })
}
