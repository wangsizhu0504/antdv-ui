<script lang="ts" setup>
  import { Form } from '@antdv/ui';

  export type Currency = 'rmb' | 'dollar';

  interface PriceValue {
    number: number;
    currency: Currency;
  }
  const props = defineProps<{ value: PriceValue }>();
  const emit = defineEmits(['update:value']);

  const formItemContext = Form.useInjectFormItemContext();
  function triggerChange(changedValue: { number?: number; currency?: Currency }) {
    emit('update:value', { ...props.value, ...changedValue });
    formItemContext.onFieldChange();
  }
  function onNumberChange(e: InputEvent) {
    const newNumber = Number.parseInt((e.target as any).value || '0', 10);
    triggerChange({ number: newNumber });
  }
  function onCurrencyChange(newCurrency: Currency) {
    triggerChange({ currency: newCurrency });
  }
</script>

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
