<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import AutomaticTokenization from './automatic-tokenization.vue';
  import Basic from './basic.vue';
  import BigData from './big-data.vue';
  import Coordinate from './coordinate.vue';
  import CustomDropdownMenu from './custom-dropdown-menu.vue';
  import fieldNamesVue from './field-names.vue';
  import HideSelected from './hide-selected.vue';
  import LabelInValue from './label-in-value.vue';
  import Multiple from './multiple.vue';
  import Optgroup from './optgroup.vue';
  import OptionLabelProp from './option-label-prop.vue';
  import placementVue from './placement.vue';
  import Responsive from './responsive.vue';
  import SearchBox from './search-box.vue';
  import Search from './search.vue';
  import SelectUsers from './select-users.vue';
  import Size from './size.vue';
  import statusVue from './status.vue';
  import Suffix from './suffix.vue';
  import Tags from './tags.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      PlacementVue: placementVue,
      StatusVue: statusVue,
      FieldNamesVue: fieldNamesVue,
      Basic,
      Size,
      Tags,
      AutomaticTokenization,
      LabelInValue,
      Multiple,
      Coordinate,
      Optgroup,
      SearchBox,
      Search,
      SelectUsers,
      Suffix,
      HideSelected,
      CustomDropdownMenu,
      OptionLabelProp,
      BigData,
      Responsive,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <demo-sort>
    <Basic />
    <Size />
    <Tags />
    <Responsive />
    <AutomaticTokenization />
    <LabelInValue />
    <Multiple />
    <Coordinate />
    <Optgroup />
    <SearchBox />
    <Search />
    <SelectUsers />
    <Suffix />
    <HideSelected />
    <CustomDropdownMenu />
    <OptionLabelProp />
    <BigData />
    <FieldNamesVue />
    <PlacementVue />
    <StatusVue />
  </demo-sort>
</template>

<style>
#components-select-demo .ant-select {
  margin: 0 8px 10px 0;
}
</style>
