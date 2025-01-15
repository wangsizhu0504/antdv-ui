<script lang="ts">
  import { defineComponent, provide } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import BackTop from './back-top.vue'
  import Badge from './badge.vue'
  import Basic from './basic.vue'
  import Description from './description.vue'
  import group from './group.vue'
  import GroupMenu from './group-menu.vue'
  import Shape from './shape.vue'
  import Tooltip from './tooltip.vue'
  import Type from './type.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Type,
      Shape,
      Description,
      Tooltip,
      Group: group,
      GroupMenu,
      BackTop,
      Badge,
    },
    props: {
      iframeName: String,
    },
    setup(props) {
      provide(
        'iframeDemo',
        !props.iframeName
          ? {
            'type': '/iframe/float-button/#type',
            'basic-usage': '/iframe/float-button/#basic-usage',
            'shape': '/iframe/float-button/#shape',
            'description': '/iframe/float-button/#description',
            'floatbutton-with-tooltip': '/iframe/float-button/#floatbutton-with-tooltip',
            'floatbutton-group': '/iframe/float-button/#floatbutton-group',
            'menu-mode': '/iframe/float-button/#menu-mode',
            'backtop': '/iframe/float-button/#backtop',
            'badge': '/iframe/float-button/#badge',
          }
          : {},
      )
    },
  })
</script>

<template>
  <template v-if="iframeName === 'basic-usage'">
    <Basic/>
  </template>
  <template v-else-if="iframeName === 'type'">
    <Type/>
  </template>
  <template v-else-if="iframeName === 'shape'">
    <Shape/>
  </template>
  <template v-else-if="iframeName === 'description'">
    <Description/>
  </template>
  <template v-else-if="iframeName === 'floatbutton-with-tooltip'">
    <Tooltip/>
  </template>
  <template v-else-if="iframeName === 'floatbutton-group'">
    <Group/>
  </template>
  <template v-else-if="iframeName === 'menu-mode'">
    <GroupMenu/>
  </template>
  <template v-else-if="iframeName === 'backtop'">
    <BackTop/>
  </template>
  <template v-else-if="iframeName === 'badge'">
    <Badge/>
  </template>
  <demo-sort v-else>
    <Basic/>
    <Type/>
    <Shape/>
    <Description/>
    <Tooltip/>
    <Group/>
    <GroupMenu/>
    <BackTop/>
    <Badge/>
  </demo-sort>
</template>
