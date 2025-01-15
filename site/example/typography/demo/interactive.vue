<docs>
---
order: 3
title:
  zh-CN: 可交互
  en-US: Interactive
---

## zh-CN

提供可编辑和可复制等额外的交互能力。

## en-US

Provide additional interactive capacity of editable and copyable.
</docs>

<script lang="ts" setup>
  import { CheckOutlined, HighlightOutlined, SmileFilled, SmileOutlined } from '@ant-design/icons-vue'
  import { ref, watch } from 'vue'

  const editableStr = ref<any>('This is an editable text.')
  watch(editableStr, () => {
    console.log('editableStr', editableStr.value)
  })
  const chooseTrigger = ref<Array<'icon' | 'text'>>(['icon'])

  function radioToState(input: string): Array<'icon' | 'text'> {
    switch (input) {
      case 'text':
        return ['text']
      case 'both':
        return ['icon', 'text']
      case 'icon':
      default:
        return ['icon']
    }
  }

  function stateToRadio() {
    if (chooseTrigger.value.includes('text')) {
      return chooseTrigger.value.includes('icon') ? 'both' : 'text'
    }
    return 'icon'
  }
  const customIconStr = ref<any>('Custom Edit icon and replace tooltip text.')
  const hideTooltipStr = ref<any>('Hide Edit tooltip.')
  const lengthLimitedStr = ref<any>('This is an editable text with limited length.')
  const clickTriggerStr = ref<any>('Text or icon as trigger - click to start editing.')
  const customEnterIconStr = ref<any>('Editable text with a custom enter icon in edit field.')
  const noEnterIconStr = ref<any>('Editable text with no enter icon in edit field.')
</script>

<template>
  <a-typography-paragraph v-model:content="editableStr" editable />
  <a-typography-paragraph v-model:content="customIconStr" editable>
    <template #editableIcon><HighlightOutlined /></template>
    <template #editableTooltip>click to edit text</template>
  </a-typography-paragraph>
  Trigger edit with:&nbsp;&nbsp;
  <a-radio-group
    :value="stateToRadio()"
    @change="e => (chooseTrigger = radioToState(e.target.value))"
  >
    <a-radio value="icon">icon</a-radio>
    <a-radio value="text">text</a-radio>
    <a-radio value="both">both</a-radio>
  </a-radio-group>
  <a-typography-paragraph
    v-model:content="clickTriggerStr"
    :editable="{ triggerType: chooseTrigger }"
  >
    <template #editableTooltip>click to edit text</template>
  </a-typography-paragraph>
  <a-typography-paragraph v-model:content="customEnterIconStr" editable>
    <template #editableIcon><HighlightOutlined /></template>
    <template #editableTooltip>click to edit text</template>
    <template #editableEnterIcon="{ className }">
      <CheckOutlined :class="className" />
    </template>
  </a-typography-paragraph>
  <a-typography-paragraph v-model:content="noEnterIconStr" editable>
    <template #editableIcon><HighlightOutlined /></template>
    <template #editableTooltip>click to edit text</template>
    <template #editableEnterIcon>{{ null }}</template>
  </a-typography-paragraph>
  <a-typography-paragraph v-model:content="hideTooltipStr" :editable="{ tooltip: false }" />
  <a-typography-paragraph
    v-model:content="lengthLimitedStr"
    :editable="{ maxlength: 50, autoSize: { maxRows: 5, minRows: 3 } }"
  />

  <a-typography-paragraph copyable>This is a copyable text.</a-typography-paragraph>
  <a-typography-paragraph :copyable="{ text: 'Hello, Ant Design!' }">
    Replace copy text.
  </a-typography-paragraph>
  <a-typography-paragraph copyable content="Custom Copy icon and replace tooltips text.">
    <template #copyableIcon="{ copied }">
      <SmileOutlined v-if="!copied" key="copy-icon" />
      <SmileFilled v-else key="copied-icon" />
    </template>
    <template #copyableTooltip="{ copied }">
      <span v-if="!copied" key="copy-tooltip">click here</span>
      <span v-else key="copied-tooltip">you clicked!!</span>
    </template>
  </a-typography-paragraph>
  <a-typography-paragraph :copyable="{ tooltip: false }">
    Hide Copy tooltips.
  </a-typography-paragraph>
</template>
