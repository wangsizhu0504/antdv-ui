<template>
  <span>
    <a-input type="text" :value="value.number" style="width: 100px" @change="onNumberChange" />
    <a-select
      :value="value.currency"
      style="width: 80px; margin: 0 8px"
      :options="[
        { value: 'rmb', label: 'RMB' },
        { value: 'dollar', label: 'Dollar' },
      ]"
      @change="onCurrencyChange"
    />
  </span>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { Form } from '@antdv/ui'

export type Currency = 'rmb' | 'dollar'

interface PriceValue {
  number: number
  currency: Currency
}
const props = defineProps<{ value: PriceValue }>()
const emit = defineEmits(['update:value'])

const formItemContext = Form.useInjectFormItemContext()
const triggerChange = (changedValue: { number?: number; currency?: Currency }) => {
  emit('update:value', { ...props.value, ...changedValue })
  formItemContext.onFieldChange()
}
const onNumberChange = (e: InputEvent) => {
  const newNumber = Number.parseInt((e.target as any).value || '0', 10)
  triggerChange({ number: newNumber })
}
const onCurrencyChange = (newCurrency: Currency) => {
  triggerChange({ currency: newCurrency })
}
</script>
