<script lang="ts">
  import { defineComponent } from 'vue'
  import CN from '../index.zh-CN.md'
  import US from '../index.en-US.md'
  import Banner from './banner.vue'
  import Basic from './basic.vue'
  import Closable from './closable.vue'
  import CloseText from './close-text.vue'
  import Description from './description.vue'
  import Icon from './icon.vue'
  import Action from './action.vue'
  import Style from './style.vue'
  import SmoothClosed from './smooth-closed.vue'
  import CustomIcon from './custom-icon.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Banner,
      Closable,
      CloseText,
      Description,
      Icon,
      FourStyle: Style, // style 标签报错
      SmoothClosed,
      CustomIcon,
      Action,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <FourStyle />
    <Closable />
    <Description />
    <Icon />
    <CloseText />
    <Banner />
    <CustomIcon />
    <SmoothClosed />
    <Action />
  </demo-sort>
</template>

<style scoped>
[id^='site-example-alert-demo'] .ant-alert {
  margin-bottom: 16px;
}
</style>
