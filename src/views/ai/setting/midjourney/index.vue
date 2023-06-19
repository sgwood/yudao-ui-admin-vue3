<template>
  <ContentWrap title="微信APP开发信息">
    <div class="mb-10px">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="180px">
        <el-form-item label="微信APP2 appId" prop="appId">
          <el-input v-model="formData.appId" placeholder="请输入微信开放平台appId" />
        </el-form-item>
        <el-form-item label="微信APP appSecret" prop="appSecret">
          <el-input v-model="formData.appSecret" placeholder="请输入微信开放平台appSecret" />
        </el-form-item>
      </el-form>
    </div>
  </ContentWrap>
  <el-button type="primary" @click="submitForm" class="mt-10px ml-150px">确 定</el-button>
</template>
<script setup lang="ts" name="WechatApp">
// import * as ConfigApi from '@/api/infra/config'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formData = ref({
  id: undefined,
  appId: '',
  appSecret: ''
})
const formRules = reactive({
  appId: [{ required: true, message: '微信开放平台appId不能为空', trigger: 'blur' }],
  appSecret: [{ required: true, message: '微信开放平台appSecret不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  if (!formRef) return
  const valid = await formRef.value.validate()
  if (!valid) return
  // 提交请求
  formLoading.value = true
  try {
    //const data = formData.value as ConfigApi.ConfigVO
    // await ConfigApi.updateConfig(data)
    message.success(t('common.updateSuccess'))

    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 页面加载 */
const init = async () => {
  formLoading.value = true
  try {
    //formData.value = await ConfigApi.getConfig(0)
  } finally {
    formLoading.value = false
  }
}

/** 初始化 */
onMounted(async () => {
  await init()
})
</script>
