<script>
  import { defineComponent } from 'vue'
  import CN from '../index.zh-CN.md'
  import US from '../index.en-US.md'
  import Basic from './basic.vue'
  import AutosizeTextarea from './autosize-textarea.vue'
  import Presuffix from './presuffix.vue'
  import SearchInput from './search-input.vue'
  import SearchInputLoading from './search-input-loading.vue'
  import Size from './size.vue'
  import Group from './group.vue'
  import TextareaResize from './textarea.vue'
  import AllowClear from './allow-clear.vue'
  import PasswordInput from './password-input.vue'
  import ShowCount from './show-count.vue'
  import Addon from './addon.vue'
  import Tooltip from './tooltip.vue'
  import borderlessVue from './borderless.vue'
  import statusVue from './status.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      StatusVue: statusVue,
      Basic,
      AutosizeTextarea,
      Presuffix,
      SearchInput,
      SearchInputLoading,
      Size,
      Group,
      TextareaResize,
      Addon,
      Tooltip,
      AllowClear,
      PasswordInput,
      ShowCount,
      BorderlessVue: borderlessVue,
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <AutosizeTextarea />
    <Presuffix />
    <SearchInput />
    <SearchInputLoading />
    <Size />
    <Group />
    <Addon />
    <Tooltip />
    <AllowClear />
    <PasswordInput />
    <ShowCount />
    <TextareaResize />
    <BorderlessVue />
    <StatusVue />
  </demo-sort>
</template>

<style></style>
