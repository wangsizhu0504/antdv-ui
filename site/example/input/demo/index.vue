<script>
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Addon from './addon.vue'
  import AllowClear from './allow-clear.vue'
  import AutosizeTextarea from './autosize-textarea.vue'
  import Basic from './basic.vue'
  import borderlessVue from './borderless.vue'
  import Group from './group.vue'
  import PasswordInput from './password-input.vue'
  import Presuffix from './presuffix.vue'
  import SearchInput from './search-input.vue'
  import SearchInputLoading from './search-input-loading.vue'
  import ShowCount from './show-count.vue'
  import Size from './size.vue'
  import statusVue from './status.vue'
  import TextareaResize from './textarea.vue'
  import Tooltip from './tooltip.vue'

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
