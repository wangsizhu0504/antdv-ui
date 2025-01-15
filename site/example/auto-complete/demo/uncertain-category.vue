<docs>
---
order: 5
title:
  zh-CN: 查询模式 - 不确定类目
  en-US: Lookup-Patterns - Uncertain Category
---

## zh-CN

查询模式 - 不确定类目。

## en-US

Lookup-Patterns - Uncertain Category.
</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  interface Option {
    query: string;
    category: string;
    value: string;
    count: number;
  }
  const value = ref<any>('');
  const dataSource = ref<Option[]>([]);
  function onSelect(value: string) {
    console.log('onSelect', value);
  }

  function getRandomInt(max: number, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function searchResult(query: string): Option[] {
    return new Array(getRandomInt(5))
      .join('.')
      .split('.')
      .map((_item, idx) => ({
        query,
        category: `${query}${idx}`,
        value: `${query}${idx}`,
        count: getRandomInt(200, 100),
      }));
  }
  function handleSearch(val: string) {
    dataSource.value = val ? searchResult(val) : [];
  }
</script>

<template>
  <div class="global-search-wrapper" style="width: 300px">
    <a-auto-complete
      v-model:value="value"
      :dropdown-match-select-width="252"
      style="width: 300px"
      :options="dataSource"
      @select="onSelect"
      @search="handleSearch"
    >
      <template #option="item">
        <div style="display: flex; justify-content: space-between">
          <span>
            Found {{ item.query }} on
            <a
              :href="`https://s.taobao.com/search?q=${item.query}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ item.category }}
            </a>
          </span>
          <span>{{ item.count }} results</span>
        </div>
      </template>
      <a-input-search size="large" placeholder="input here" enter-button/>
    </a-auto-complete>
  </div>
</template>
