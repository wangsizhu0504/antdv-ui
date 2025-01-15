<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Async from './async.vue'
  import Basic from './basic.vue'
  import ButtonProps from './button-props.vue'
  import Confirm from './confirm.vue'
  import ConfirmPromise from './confirm-promise.vue'
  import ConfirmRouter from './confirm-router.vue'
  import Footer from './footer.vue'
  import Fullscreen from './fullscreen.vue'
  import HookModal from './hook-modal.vue'
  import Info from './info.vue'
  import Locale from './locale.vue'
  import Manual from './manual.vue'
  import modalRenderVue from './modal-render.vue'
  import Position from './position.vue'
  import Width from './width.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Async,
      CustomFooter: Footer,
      Confirm,
      Info,
      Locale,
      Manual,
      Position,
      ConfirmRouter,
      ConfirmPromise,
      Width,
      ButtonProps,
      Fullscreen,
      ModalRenderVue: modalRenderVue,
      HookModal,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <Async />
    <CustomFooter />
    <Confirm />
    <Info />
    <HookModal />
    <Locale />
    <Manual />
    <Position />
    <ConfirmRouter />
    <ConfirmPromise />
    <Width />
    <ButtonProps />
    <Fullscreen />
    <ModalRenderVue />
  </demo-sort>
</template>

<style>
[id^='site-example-modal-demo'] .ant-btn {
  margin-right: 8px;
}
</style>
