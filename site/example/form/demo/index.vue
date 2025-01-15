<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import advancedSearchVue from './advanced-search.vue'
  import Basic from './basic.vue'
  import CustomValidation from './custom-validation.vue'
  import CustomizedFormControls from './customized-form-controls.vue'
  import Disabled from './disabled.vue'
  import DynamicFormItem from './dynamic-form-item.vue'
  import dynamicFormItemsVue from './dynamic-form-items.vue'
  import dynamicFormItemsComplexVue from './dynamic-form-items-complex.vue'
  import dynamicRuleVue from './dynamic-rule.vue'
  import formContextVue from './form-context.vue'
  import formInModalVue from './form-in-modal.vue'
  import HorizontalLogin from './horizontal-login.vue'
  import inlineLoginVue from './inline-login.vue'
  import LabelWidth from './label-width.vue'
  import Layout from './layout.vue'
  import NestedForm from './nest-messages.vue'
  import normalLoginVue from './normal-login.vue'

  import timeRelatedControlsVue from './time-related-controls.vue'
  import validationVue from './validation.vue'

  // import Validation from './validation.vue';
  import UseFormBasic from './useForm-basic.vue'
  import UseFormMerge from './useForm-merge.vue'
  import UseFormNested from './useForm-nested.vue'
  import UseFormTrigger from './useForm-trigger.vue'
  import validateOtherVue from './validate-other.vue'
  import validateStaticVue from './validate-static.vue'

  export default defineComponent({
    US,
    CN,
    components: {
      ValidateStaticVue: validateStaticVue,
      TimeRelatedControlsVue: timeRelatedControlsVue,
      ValidateOtherVue: validateOtherVue,
      Basic,
      CustomValidation,
      Disabled,
      DynamicFormItem,
      HorizontalLogin,
      NestedForm,
      Layout,
      ValidationVue: validationVue,
      UseFormBasic,
      UseFormNested,
      UseFormTrigger,
      UseFormMerge,
      LabelWidth,
      CustomizedFormControls,
      AdvancedSearchVue: advancedSearchVue,
      DynamicFormItemsComplexVue: dynamicFormItemsComplexVue,
      DynamicFormItemsVue: dynamicFormItemsVue,
      DynamicRuleVue: dynamicRuleVue,
      FormContextVue: formContextVue,
      FormInModalVue: formInModalVue,
      InlineLoginVue: inlineLoginVue,
      NormalLoginVue: normalLoginVue,
    },
  })
</script>

<template>
  <demo-sort :cols="1">
    <Basic />
    <LabelWidth />
    <HorizontalLogin />
    <Layout />
    <Disabled />
    <InlineLoginVue />
    <NormalLoginVue />
    <ValidationVue />
    <CustomValidation />
    <DynamicFormItem />
    <NestedForm />
    <CustomizedFormControls />
    <AdvancedSearchVue />
    <DynamicFormItemsComplexVue />
    <DynamicFormItemsVue />
    <DynamicRuleVue />
    <FormContextVue />
    <FormInModalVue />
    <TimeRelatedControlsVue />
    <ValidateOtherVue />
    <ValidateStaticVue />
    <UseFormBasic />
    <UseFormNested />
    <UseFormTrigger />
    <UseFormMerge />
  </demo-sort>
</template>

<style>
.code-box-demo .ant-form:not(.ant-form-inline):not(.ant-form-vertical) {
  max-width: 600px;
}

.markdown.api-container table td:nth-of-type(4) {
  white-space: nowrap;
  word-wrap: break-word;
}
</style>
