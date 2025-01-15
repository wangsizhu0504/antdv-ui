<script>
  import { defineComponent, provide } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Basic from './basic.vue';
  import CustomTrigger from './custom-trigger.vue';
  import FixedSider from './fixed-sider.vue';
  import Fixed from './fixed.vue';
  import Responsive from './responsive.vue';
  import Side from './side.vue';
  import TopSide2 from './top-side-2.vue';
  import TopSide from './top-side.vue';
  import Top from './top.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      CustomTrigger,
      Responsive,
      TopSide2,
      TopSide,
      Top,
      FixedSider,
      Fixed,
      Side,
    },
    props: {
      iframeName: String,
    },
    setup(props) {
      provide(
        'iframeDemo',
        !props.iframeName
          ? {
            'fixed-sider': '/iframe/layout/#fixed-sider',
            'fixed-header': '/iframe/layout/#fixed-header',
            'sider': '/iframe/layout/#sider',
          }
          : {},
      );
    },
  // props: {
  //   iframeName: String,
  // },
  // created() {
  //   provide(
  //     'iframeDemo',
  //     !this.iframeName
  //       ? {
  //           'fixed-sider': '/iframe/layout/#fixed-sider',
  //           'fixed-header': '/iframe/layout/#fixed-header',
  //           sider: '/iframe/layout/#sider',
  //         }
  //       : {},
  //   );
  // },
  });
</script>

<template>
  <template v-if="iframeName === 'fixed-sider'">
    <FixedSider />
  </template>
  <template v-else-if="iframeName === 'fixed-header'">
    <Fixed />
  </template>
  <template v-else-if="iframeName === 'sider'">
    <Side />
  </template>
  <demo-sort v-else :cols="1">
    <Basic />
    <Top />
    <TopSide2 />
    <TopSide />
    <Side />
    <CustomTrigger />
    <Responsive />
    <FixedSider />
    <Fixed />
  </demo-sort>
</template>
