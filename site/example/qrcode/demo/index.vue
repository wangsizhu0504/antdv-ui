<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Base from './base.vue';
  import CustomColor from './customColor.vue';
  import CustomSize from './customSize.vue';
  import CustomType from './customType.vue';
  import Download from './download.vue';
  import ErrorLevel from './errorLevel.vue';
  import Icon from './icon.vue';
  import Popover from './popover.vue';
  import Status from './status.vue';

  export default defineComponent({
    components: {
      Base,
      Icon,
      Status,
      CustomSize,
      CustomColor,
      Download,
      ErrorLevel,
      Popover,
      CustomType,
    },
    category: 'Components',
    subtitle: '二维码',
    type: 'Data Display',
    title: 'QRCode',
    CN,
    US,
  });
</script>

<template>
  <demo-sort>
    <Base />
    <Icon />
    <Status />
    <CustomType />
    <CustomSize />
    <CustomColor />
    <Download />
    <ErrorLevel />
    <Popover />
  </demo-sort>
</template>
