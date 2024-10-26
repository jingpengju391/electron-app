import { ref } from 'vue'
import { OrderSelectOption } from '@shared'

export const searchNameValue = ref<string>('')
export const searchTypeValue = ref<string>('')
export const searchLevelValue = ref<string>('')
export const searchStatusValue = ref<string>('')

export const searchTypeOption = ref<OrderSelectOption[]>([])
export const searchLevelOption = ref<OrderSelectOption[]>([])
export const searchStatusOption = ref<OrderSelectOption[]>([])