<script lang="ts">
  import { SearchOutlined } from '@ant-design/icons-vue'
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'SearchBox',
    components: {
      SearchOutlined,
    },
    props: ['isZhCN', 'responsive'],
    emits: ['triggerFocus'],
    setup(props, { emit }) {
      const inputRef = ref<any>()
      const focused = ref<any>(false)
      function triggerFocus(focus: boolean) {
        focused.value = focus
        emit('triggerFocus', focus)
      }
      return {
        inputRef,
        focused,
        triggerFocus,
        searchPlaceholder: props.isZhCN ? '搜索文档' : 'Search Docs',
      }
    },
  })
</script>

<template>
  <div id="search-box" :class="{ 'narrow-mode': responsive, 'focused': !!focused }">
    <SearchOutlined />
    <a-input
      ref="inputRef"
      :placeholder="searchPlaceholder"
      @focus="triggerFocus(true)"
      @blue="triggerFocus(false)"
    />
  </div>
</template>
