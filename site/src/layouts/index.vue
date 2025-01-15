<script lang="ts">
  import type { GlobalConfig } from '@/types'
  import { CloseOutlined, LinkOutlined, MenuOutlined } from '@ant-design/icons-vue'
  import { useWindowScroll } from '@vueuse/core'
  import {
    computed,
    defineComponent,
    inject,
    provide,
    ref,
    watch,
  } from 'vue'
  import { useRoute } from 'vue-router'
  import useMenus from '../hooks/useMenus'
  import { GLOBAL_CONFIG } from '../SymbolKey'
  import Demo from './Demo.vue'
  import LayoutHeader from './header/index.vue'
  import CompactIcon from './icons/Compact'
  import DarkIcon from './icons/Dark'
  import ThemeEditorIcon from './icons/ThemeEditorIcon'
  import ThemeIcon from './icons/ThemeIcon.vue'
  import Menu from './Menu.vue'
  import PrevAndNext from './PrevAndNext.vue'

  // eslint-disable-next-line no-control-regex
  const rControl = /[\u0000-\u001F]/g
  const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g

  export default defineComponent({
    name: 'Layout',
    components: {
      Demo,
      LayoutHeader,
      Menu,
      PrevAndNext,
      CloseOutlined,
      MenuOutlined,
      ThemeIcon,
      ThemeEditorIcon,
      DarkIcon,
      CompactIcon,
      LinkOutlined,
    },
    setup() {
      const { y } = useWindowScroll()
      const visible = ref<any>(false)
      const route = useRoute()
      const globalConfig = inject<GlobalConfig>(GLOBAL_CONFIG)
      const { menus, activeMenuItem, currentMenuIndex, dataSource } = useMenus()

      const demos = ref<any[]>([])

      provide('addDemosInfo', (info: any) => {
        if (!demos.value.find(d => d.href === info.href))
          demos.value.push(info)
      })

      const themeMode = inject('themeMode', {
        theme: ref<any>('light'),
        compactTheme: ref<any>('light'),

        changeTheme: (_key: any) => void 0,

        changeCompactTheme: (_key: any) => void 0,
      })

      watch(
        () => route.path,
        () => {
          demos.value.length = 0
        },
      )

      const isDemo = computed(() => {
        return (
          route.path.indexOf('/components') === 0 && route.path.indexOf('/components/overview') !== 0
        )
      })

      const matchCom = computed(() => {
        return route.matched[route.matched.length - 1]?.components?.default
      })
      const isZhCN = globalConfig?.isZhCN
      const pageData = computed(() =>
        isDemo.value
          ? matchCom.value?.[isZhCN?.value ? 'CN' : 'US']?.pageData
          : (matchCom.value as any)?.pageData,
      )
      const slugifyTitle = (str: string) => {
        return (
          str
            // Remove control characters
            .replace(rControl, '')
            // Replace special characters
            .replace(rSpecial, '-')
            // Remove continuos separators
            .replace(/\-{2,}/g, '-')
            // Remove prefixing and trailing separtors
            .replace(/^\-+|\-+$/g, '')
            // ensure it doesn't start with a number (#121)
            .replace(/^(\d)/, '_$1')
        )
      }
      const headers = computed(() => {
        let tempHeaders = (pageData.value?.headers || []).filter((h: any) => h.level === 2)
        if (isDemo.value) {
          tempHeaders = [...demos.value]

          tempHeaders.push({ title: 'API', href: '#api' })
        }

        return tempHeaders.map(header => ({
          ...header,
          key: header.title,
          title: isZhCN?.value ? header.title : (header.enTitle || header.title),
          href: (header.href || `#${slugifyTitle(header.title)}`).toLocaleLowerCase(),
        }))
      })

      const mainContainerClass = computed(() => {
        return {
          'main-container': true,
          'main-container-component': isDemo.value,
        }
      })
      const handleClickShowButton = () => {
        visible.value = !visible.value
      }
      return {
        themeMode,
        visible,
        isMobile: globalConfig?.isMobile,
        isZhCN,
        mainContainerClass,
        menus,
        currentMenuIndex,
        activeMenuItem,
        headers,
        isDemo,
        matchCom,
        pageData,
        dataSource,
        handleClickShowButton,
        iconStyle: {
          // color: '#fff',
          fontSize: '20px',
        },
        y,
      }
    },
  })
</script>

<template>
  <LayoutHeader />
  <div v-if="headers.length" class="toc-affix" :style="y > 60 ? 'position:fixed; top: 16px;' : ''">
    <a-anchor style="width: 160px" :items="headers">
      <template #customTitle="item">
        <LinkOutlined v-if="item.target" />
        {{ item.title }}
      </template>
    </a-anchor>
  </div>
  <div class="main-wrapper">
    <a-row>
      <template v-if="isMobile">
        <a-drawer
          key="mobile-menu"
          :closable="false"
          placement="left"
          class="drawer drawer-left"
          :visible="visible"
          wrapper-class-name="drawer-wrapper"
          width="60%"
        >
          <Menu :menus="dataSource" :active-menu-item="activeMenuItem" :is-zh-c-n="isZhCN" />
          <template #handle>
            <div class="drawer-handle" @click="handleClickShowButton">
              <CloseOutlined v-if="visible" :style="iconStyle" />
              <MenuOutlined v-else :style="iconStyle" />
            </div>
          </template>
        </a-drawer>
      </template>
      <template v-else>
        <a-col :xxxl="4" :xxl="4" :xl="5" :lg="6" :md="6" :sm="24" :xs="24" class="main-menu">
          <a-affix>
            <section class="main-menu-inner">
              <Menu :menus="dataSource" :active-menu-item="activeMenuItem" :is-zh-c-n="isZhCN" />
            </section>
          </a-affix>
        </a-col>
      </template>
      <a-col :xxxl="20" :xxl="20" :xl="19" :lg="18" :md="18" :sm="24" :xs="24">
        <section :class="mainContainerClass">
          <Demo v-if="isDemo" :page-data="pageData" :is-zh-c-n="isZhCN!">
            <component :is="matchCom" />
          </Demo>
          <router-view v-else />
        </section>
        <a-float-button-group trigger="click">
          <template #icon>
            <ThemeIcon />
          </template>
          <a-float-button
            :tooltip="$t('app.floatButton.theme-editor')"
            @click="$router.push(isZhCN ? '/theme-editor-cn' : '/theme-editor')"
          >
            <template #icon>
              <ThemeEditorIcon />
            </template>
          </a-float-button>
          <a-float-button
            :tooltip="$t('app.floatButton.dark-theme')"
            :type="themeMode.theme.value === 'dark' ? 'primary' : 'default'"
            @click="themeMode.changeTheme(themeMode.theme.value === 'dark' ? 'light' : 'dark')"
          >
            <template #icon>
              <DarkIcon />
            </template>
          </a-float-button>
          <a-float-button
            :tooltip="$t('app.floatButton.compact-theme')"
            :type="themeMode.compactTheme.value === 'compact' ? 'primary' : 'default'"
            @click="
              themeMode.changeCompactTheme(
                themeMode.compactTheme.value === 'compact' ? '' : 'compact',
              )
            "
          >
            <template #icon>
              <CompactIcon />
            </template>
          </a-float-button>
        </a-float-button-group>
        <PrevAndNext :menus="menus" :current-menu-index="currentMenuIndex" :is-zh-c-n="isZhCN" />
      </a-col>
    </a-row>
  </div>
</template>

<style lang="less" scoped>
.toc-affix :deep(.ant-anchor) {
  font-size: 12px;
  max-width: 110px;

  .ant-anchor-ink::before {
    display: none;
  }
  .ant-anchor-ink-ball {
    display: none;
  }
}

[data-theme='dark'] .toc-affix :deep(.ant-anchor) {
  .ant-anchor-link {
    border-left: 2px solid #303030;
  }
  .ant-anchor-link-active {
    border-left: 2px solid #177ddc;
  }
}
</style>
