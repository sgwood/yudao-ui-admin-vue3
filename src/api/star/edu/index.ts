import request from '@/config/axios'

// 教育-计划 VO
export interface EduPlanVO {
  id: number // 日志主键
  planName: string // 计划名称
  planConfig: string // 配置信息
  status: number // 状态
  description: string // 描述
}

// 教育-计划 API
export const EduPlanApi = {
  // 查询教育-计划分页
  getEduPlanPage: async (params: any) => {
    return await request.get({ url: `/star/edu-plan/page`, params })
  },

  // 查询教育-计划详情
  getEduPlan: async (id: number) => {
    return await request.get({ url: `/star/edu-plan/get?id=` + id })
  },

  // 新增教育-计划
  createEduPlan: async (data: EduPlanVO) => {
    return await request.post({ url: `/star/edu-plan/create`, data })
  },

  // 修改教育-计划
  updateEduPlan: async (data: EduPlanVO) => {
    return await request.put({ url: `/star/edu-plan/update`, data })
  },

  // 删除教育-计划
  deleteEduPlan: async (id: number) => {
    return await request.delete({ url: `/star/edu-plan/delete?id=` + id })
  },

  // 导出教育-计划 Excel
  exportEduPlan: async (params) => {
    return await request.download({ url: `/star/edu-plan/export-excel`, params })
  }
}