<script lang="ts">

  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Ajax from './ajax.vue'
  import Basic from './basic.vue'
  import Bordered from './bordered.vue'
  import ColspanRowspan from './colspan-rowspan.vue'
  import CustomFilterPanel from './custom-filter-panel.vue'
  import EditCell from './edit-cell.vue'
  import EditRow from './edit-row.vue'
  import Ellipsis from './ellipsis.vue'
  import Expand from './expand.vue'
  import ExpandChildren from './expand-children.vue'
  import filterInTreeVue from './filter-in-tree.vue'
  import filterSearchVue from './filter-search.vue'
  import FixedColumns from './fixed-columns.vue'
  import FixedColumnsHeader from './fixed-columns-header.vue'
  import FixedHeader from './fixed-header.vue'
  import GroupingColumns from './grouping-columns.vue'
  import Head from './head.vue'
  import MultipleSorter from './multiple-sorter.vue'
  import NestedTable from './nested-table.vue'
  import ResetFilter from './reset-filter.vue'
  import ResizableColumn from './resizable-column.vue'
  import Responsive from './responsive.vue'
  import RowSelection from './row-selection.vue'
  import RowSelectionAndOperation from './row-selection-and-operation.vue'
  import RowSelectionCustom from './row-selection-custom.vue'
  import Size from './size.vue'
  import Sticky from './sticky.vue'
  import Stripe from './stripe.vue'
  import Summary from './summary.vue'
  import TemplateCom from './template.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      FilterInTreeVue: filterInTreeVue,
      FilterSearchVue: filterSearchVue,
      Basic,
      Ellipsis,
      Ajax,
      Bordered,
      ColspanRowspan,
      CustomFilterPanel,
      EditCell,
      EditRow,
      ExpandChildren,
      Expand,
      FixedColumnsHeader,
      FixedColumns,
      FixedHeader,
      GroupingColumns,
      Head,
      NestedTable,
      ResetFilter,
      RowSelectionAndOperation,
      RowSelectionCustom,
      RowSelection,
      Size,
      TemplateCom,
      Stripe,
      MultipleSorter,
      Summary,
      Sticky,
      ResizableColumn,
      Responsive,
    },
  })
</script>

<template>
  <demo-sort :cols="1">
    <Basic />
    <Ajax />
    <Bordered />
    <Ellipsis />
    <ColspanRowspan />
    <EditCell />
    <EditRow />
    <ExpandChildren />
    <Expand />
    <FixedColumnsHeader />
    <FixedColumns />
    <FixedHeader />
    <GroupingColumns />
    <MultipleSorter />
    <NestedTable />
    <Head />
    <CustomFilterPanel />
    <ResetFilter />
    <FilterSearchVue />
    <FilterInTreeVue />
    <RowSelectionAndOperation />
    <RowSelectionCustom />
    <RowSelection />
    <Sticky />
    <ResizableColumn />
    <Size />
    <Stripe />
    <Summary />
    <Responsive />
    <TemplateCom />
  </demo-sort>
</template>
