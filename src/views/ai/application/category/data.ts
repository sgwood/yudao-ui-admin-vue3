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
    label: '标题',
    field: 'name',
    isSearch: true
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
    isSearch: true,
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
