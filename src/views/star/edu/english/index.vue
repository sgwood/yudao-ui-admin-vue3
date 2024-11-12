<template>
  <ContentWrap>
    <div @click="toWordLevel31" class="mt-12">三年级上册单词和课文视频</div>
    <div @click="toWordLevel311" class="mt-12">三年级上册单词课文知识点全攻略</div>
    <el-divider />
    <div @click="toWordLevel32" class="mt-12">三年级下册单词和课文视频</div>
    <div @click="toWordLevel321" class="mt-12">三年级下册单词课文知识点全攻略</div>
    <el-divider />
    <div @click="toWordLevel41" class="mt-12">四年级上册单词和课文视频</div>
    <div @click="toWordLevel411" class="mt-12">四年级上册知识点全攻略</div>
    <el-divider />
    <div @click="toWordLevel42" class="mt-12">四年级下册单词和课文视频</div>
    <div @click="toWordLevel421" class="mt-12">四年级下册知识点全攻略</div>
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

const toWordLevel31 = async () => {
  window.open('https://www.bilibili.com/video/BV1vv4y1J7Ym')
}

const toWordLevel311 = async () => {
  window.open('https://www.bilibili.com/video/BV1Nq4y1d7P6')
}

const toWordLevel32 = async () => {
  window.open('https://www.bilibili.com/video/BV1rc411h7GY/')
}

const toWordLevel321 = async () => {
  window.open('https://www.bilibili.com/video/BV1rF411z79z')
}

const toWordLevel41 = () => {
  window.open('https://www.bilibili.com/video/BV12K4y1r7Bt/')
}

const toWordLevel411 = () => {
  window.open('https://www.bilibili.com/video/BV1134y1U7VG')
}

const toWordLevel42 = () => {
  window.open('https://www.bilibili.com/video/BV1uV411o7G8/')
}
const toWordLevel421 = () => {
  window.open('https://www.bilibili.com/video/BV1eU4y1K7Ge')
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
