<script lang="ts">
  import { defineComponent } from 'vue'
  import CN from '../index.zh-CN.md'
  import US from '../index.en-US.md'
  import Basic from './basic.vue'
  import Hook from './hook.vue'
  import Duratioin from './duration.vue'
  import WithIcon from './with-icon.vue'
  import CustomIcon from './custom-icon.vue'
  import WithBtn from './with-btn.vue'
  import CustomStyle from './custom-style.vue'
  import Placement from './placement.vue'
  import Update from './update.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Duratioin,
      WithIcon,
      CustomIcon,
      WithBtn,
      CustomStyle,
      Placement,
      Update,
      Hook,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <demo-sort>
    <Hook />
    <Basic />
    <Duratioin />
    <WithIcon />
    <CustomIcon />
    <WithBtn />
    <CustomStyle />
    <Placement />
    <Update />
  </demo-sort>
</template>

<style>
[id^='components-notification-demo-'] .ant-btn {
  margin-right: 8px;
}
</style>
