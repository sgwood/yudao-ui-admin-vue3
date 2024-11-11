<template>
  <ContentWrap>
    <div @click="toDocument" class="mt-12">bilibili</div>
    <div @click="toDocument" class="mt-12">微信</div>
    <div @click="toDocument" class="mt-12 mb-15 cursor-wait">动画短片</div>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap />

  <!-- 表单弹窗：添加/修改 -->
  <EduPlanForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { EduPlanApi, EduPlanVO } from '@/api/star/edu'
import EduPlanForm from './EduPlanForm.vue'

/** 教育-计划 列表 */
defineOptions({ name: 'EduPlan' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<EduPlanVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  planName: undefined,
  createTime: [],
  status: undefined
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

const { push } = useRouter()

const toProfile = async () => {
  push('/user/profile')
}
const toDocument = () => {
  window.open(
    'https://www.bilibili.com/video/BV1aQ4y1r7qX?spm_id_from=333.880.my_history.page.click'
  )
}
/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await EduPlanApi.getEduPlanPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await EduPlanApi.deleteEduPlan(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await EduPlanApi.exportEduPlan(queryParams)
    download.excel(data, '教育-计划.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
