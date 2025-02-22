<script lang="ts">
  import type { ThemeConfig } from '@antdv/ui/es/config-provider';
  import { useLocale } from '@/locale';
  import { message } from '@antdv/ui';

  import {
    defineAsyncComponent,
    defineComponent,
    nextTick,
    onMounted,
    ref,
    watch,
  } from 'vue';

  // antd换肤编辑器
  import { enUS, ThemeEditor, zhCN } from '../../components/antdv-token-previewer';

  import Header from '../../layouts/header/index.vue';
  import locales from './locales';

  const ANT_DESIGN_VUE_V4_THEME_EDITOR_THEME = 'ant-design-vue-v4-theme-editor-theme';

  function isObject(target: any) {
    return Object.prototype.toString.call(target) === '[object Object]';
  }

  export default defineComponent({
    name: 'CustomTheme',
    components: {
      Header,
      ThemeEditor,
      JSONEditor: defineAsyncComponent(() => import('./JSONEditor/index.vue')), // 异步组件加载json编辑器
    },
    setup() {
      // 国际化
      const [locale, lang] = useLocale(locales);

      // 换肤
      const theme = ref<ThemeConfig>({});

      const editModelOpen = ref<boolean>(false);
      const editThemeFormatRight = ref<boolean>(true);
      const themeConfigContent = ref<any>({
        text: '{}',
        json: undefined,
      });

      const getTheme = () => {
        const storedConfig = localStorage.getItem(ANT_DESIGN_VUE_V4_THEME_EDITOR_THEME);
        if (storedConfig)
          theme.value = JSON.parse(storedConfig);
      };

      const setTheme = (theme) => {
        localStorage.setItem(ANT_DESIGN_VUE_V4_THEME_EDITOR_THEME, JSON.stringify(theme));
      };

      const editModelClose = () => {
        editModelOpen.value = false;
      };

      const editSave = () => {
        if (!editThemeFormatRight.value) {
          message.error(locale.value.editJsonContentTypeError);
          return;
        }
        const themeConfig = themeConfigContent.value.text
          ? JSON.parse(themeConfigContent.value.text)
          : themeConfigContent.value.json;

        if (!isObject(themeConfig)) {
          message.error(locale.value.editJsonContentTypeError);
          return;
        }
        theme.value = themeConfig;
        editModelClose();
        message.success(locale.value.editSuccessfully);
      };

      const handleSave = () => {
        setTheme(theme.value);
        message.success(locale.value.saveSuccessfully);
      };

      const handleEditConfig = () => {
        editModelOpen.value = true;
      };

      const handleEditConfigChange = (newcontent, _, status) => {
        themeConfigContent.value = newcontent;
        if (
          status.contentErrors
          && Array.isArray(status.contentErrors.validationErrors)
          && status.contentErrors.validationErrors.length === 0
        ) {
          editThemeFormatRight.value = true;
        }
        else {
          editThemeFormatRight.value = false;
        }
      };

      const handleExport = () => {
        const file = new File([JSON.stringify(theme.value, null, 2)], 'Ant Design Vue Theme.json', {
          type: 'text/json; charset=utf-8;',
        });
        const tmpLink = document.createElement('a');
        const objectUrl = URL.createObjectURL(file);

        tmpLink.href = objectUrl;
        tmpLink.download = file.name;
        document.body.appendChild(tmpLink);
        tmpLink.click();

        document.body.removeChild(tmpLink);
        URL.revokeObjectURL(objectUrl);
      };

      const handleThemeChange = (newTheme) => {
        theme.value = newTheme.config;
      };

      nextTick(() => {
        getTheme();
      });

      watch(editModelOpen, (val) => {
        if (!val) {
          themeConfigContent.value = {
            json: theme.value,
            text: undefined,
          } as any;
        }
      });

      watch(theme, (val) => {
        if (!editModelOpen.value) {
          themeConfigContent.value = {
            json: val,
            text: undefined,
          } as any;
        }
      });

      onMounted(() => {
        document.title = `${locale.value.title} - @antdv/ui`;
      });

      return {
        locale,
        lang,

        theme,
        handleThemeChange,

        editModelOpen,
        editThemeFormatRight,
        themeConfigContent,

        editModelClose,
        editSave,

        handleSave,
        handleEditConfig,
        handleEditConfigChange,
        handleExport,

        // 皮肤编辑器的国际化
        zhCN,
        enUS,
      };
    },
  });
</script>

<template>
  <Header />
  <div class="theme-editor">
    <a-config-provider :theme="{ inherit: false }">
      <div class="theme-editor-header">
        <a-typography-title :level="5" :style="{ margin: 0 }">
          {{ locale.title }}
        </a-typography-title>

        <div>
          <a-modal
            v-model:open="editModelOpen"
            :title="locale.editModelTitle"
            :width="600"
            :ok-text="locale.save"
            @ok="editSave"
            @cancel="editModelClose"
          >
            <Suspense>
              <template #fallback>
                <div :style="{ textAlign: 'center', width: '100%', padding: '24px 0' }">
                  <a-spin :tip="locale.initialEditor" />
                </div>
              </template>
              <template #default>
                <JSONEditor
                  :content="themeConfigContent"
                  :on-change="handleEditConfigChange"
                  :main-menu-bar="false"
                />
              </template>
            </Suspense>
          </a-modal>
          <a-button class="theme-editor-header-actions" @click="handleExport">
            {{ locale.export }}
          </a-button>
          <a-button class="theme-editor-header-actions" @click="handleEditConfig">
            {{ locale.edit }}
          </a-button>
          <a-button type="primary" class="theme-editor-header-actions" @click="handleSave">
            {{ locale.save }}
          </a-button>
        </div>
      </div>
      <ThemeEditor
        :theme="{ name: 'Custom Theme', key: 'test', config: theme }"
        :style="{ height: 'calc(100vh - 64px - 56px)' }"
        :locale="lang === 'cn' ? zhCN : enUS"
        @theme-change="handleThemeChange"
      />
    </a-config-provider>
  </div>
</template>

<style lang="less">
.theme-editor {
  &-header {
    display: flex;
    height: 56px;
    align-items: center;
    padding: 0 24px;
    justify-content: space-between;
    border-bottom: 1px solid #f0f0f0;
    box-sizing: border-box;
    &-actions {
      margin-right: 8px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
