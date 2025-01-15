<script>
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Basic from './basic.vue';
  import ChangeOnSelect from './change-on-select.vue';
  import CustomRender from './custom-render.vue';
  import CustomTrigger from './custom-trigger.vue';
  import DisabledOption from './disabled-option.vue';
  import FieldsName from './fields-name.vue';
  import Hover from './hover.vue';
  import Lazy from './lazy.vue';
  import multipleVue from './multiple.vue';
  import Search from './search.vue';
  import Size from './size.vue';
  import Suffix from './suffix.vue';
  import tagRender from './tagRender.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      ChangeOnSelect,
      CustomRender,
      CustomTrigger,
      DisabledOption,
      Hover,
      Lazy,
      Search,
      Size,
      FieldsName,
      Suffix,
      MultipleVue: multipleVue,
      TagRender: tagRender,
    },
  });
</script>

<template>
  <demo-sort>
    <Basic />
    <CustomTrigger />
    <Hover />
    <DisabledOption />
    <ChangeOnSelect />
    <Size />
    <CustomRender />
    <Search />
    <Lazy />
    <FieldsName />
    <Suffix />
    <MultipleVue />
    <TagRender />
  </demo-sort>
</template>

<style>
#site-example-cascader-demo .ant-cascader-picker {
  width: 300px;
}
</style>
