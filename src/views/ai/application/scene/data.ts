import type { CrudSchema } from '@/hooks/web/useCrudSchemas'

// 表单校验
export const rules = reactive({
  name: [required],
  sort: [required]
})

// CrudSchema https://doc.iocoder.cn/vue3/crud-schema/
const crudSchemas = reactive<CrudSchema[]>([
  {
    label: 'id',
    field: 'id',
    isForm: false
  },

  {
    label: '图标',
    field: 'icon',
    isSearch: false
  },
  {
    label: '标题',
    field: 'name',
    isSearch: false
  },
  {
    label: '应用分类',
    field: 'name',
    isSearch: true,
    dictType: DICT_TYPE.COMMON_STATUS,
    dictClass: 'number',
    form: {
      component: 'SelectV2'
    }
  },
  {
    label: '关键词',
    field: 'keyword',
    isSearch: true,
    isForm: false,
    isTable: false
  },
  {
    label: '排序',
    field: 'sort',
    form: {
      component: 'Editor',
      componentProps: {
        valueHtml: '',
        height: 200
      }
    }
  },
  {
    label: '是否可用',
    field: 'status',
    dictType: DICT_TYPE.COMMON_STATUS,
    dictClass: 'number',
    isSearch: false,
    form: {
      component: 'SelectV2'
    }
  },
  {
    label: '是否支持手机端',
    field: 'status',
    dictType: DICT_TYPE.COMMON_STATUS,
    dictClass: 'number',
    isSearch: false,
    form: {
      component: 'SelectV2'
    }
  },
  {
    label: '是否支持PC',
    field: 'status',
    dictType: DICT_TYPE.COMMON_STATUS,
    dictClass: 'number',
    isSearch: false,
    form: {
      component: 'SelectV2'
    }
  },
  {
    label: '提示模板',
    field: 'status',
    dictType: DICT_TYPE.COMMON_STATUS,
    dictClass: 'number',
    isSearch: false,
    form: {
      component: 'SelectV2'
    }
  },
  {
    label: '操作',
    field: 'action',
    isForm: false
  }
])
export const { allSchemas } = useCrudSchemas(crudSchemas)
