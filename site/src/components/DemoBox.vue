<script lang="ts">
  import type { GlobalConfig } from '@/types'
  import { getCodeSandboxParams } from '@/utils/generateOnlineDemo'
  import { CheckOutlined, CodeSandboxOutlined, SnippetsOutlined } from '@ant-design/icons-vue'
  import { computed, defineComponent, inject, onMounted, ref } from 'vue'
  import packageInfo from '../../../packages/antdv-ui/package.json'
  import { GLOBAL_CONFIG } from '../SymbolKey'

  // import { Modal } from '@antdv/ui';
  export default defineComponent({
    name: 'DemoBox',
    components: {
      CheckOutlined,
      SnippetsOutlined,
      CodeSandboxOutlined,
    },
    props: {
      jsfiddle: Object,
    },
    setup(props) {
      const codeExpand = ref<any>(false)
      const type = ref<any>('TS')
      const copyTooltipVisible = ref<any>(false)
      const copied = ref<any>(false)
      const codeRef = ref<HTMLDivElement>()
      const sectionId = computed(() => {
        const relativePath = props.jsfiddle?.relativePath.replace('components/', '') || ''
        return `${relativePath.split('/').join('-').replace('.vue', '')}`.toLocaleLowerCase()
      })
      const inIframe = inject('inIframe', false)
      const iframeHeight = computed(() => props.jsfiddle?.iframe)

      const addDemosInfo: any = inject('addDemosInfo', () => {})

      const globalConfig = inject<GlobalConfig>(GLOBAL_CONFIG)
      const title = computed(
        () =>
          props.jsfiddle
          && props.jsfiddle.title
          && props.jsfiddle?.title[globalConfig?.isZhCN.value ? 'zh-CN' : 'en-US'],
      )
      const iframeDemoKey = computed(() => {
        return (
          props.jsfiddle
          && props.jsfiddle.title
          && props.jsfiddle?.title['en-US']
          && String(props.jsfiddle?.title['en-US']).split(' ').join('-').toLowerCase()
        )
      })
      const onCopyTooltipVisibleChange = (visible: boolean) => {
        if (visible) {
          copyTooltipVisible.value = visible
          copied.value = false
        } else {
          copyTooltipVisible.value = visible
        }
      }
      const docHtml = computed(() =>
        (props.jsfiddle && props.jsfiddle.docHtml)
          ? (
            props.jsfiddle.docHtml.replace(
              `<h2 id="zh-cn">zh-CN <a class="header-anchor" href="#zh-cn">
          <span aria-hidden="true" class="anchor">#</span>
        </a></h2>`,
              '',
            ).split(`<h2 id="en-us">en-US <a class="header-anchor" href="#en-us">
          <span aria-hidden="true" class="anchor">#</span>
        </a></h2>`)[globalConfig?.isZhCN.value ? 0 : 1] || ''
          ).trim()
          : '',
      )
      const handleCodeExpand = () => {
        codeExpand.value = !codeExpand.value
      }
      const handleCodeCopied = () => {
        copied.value = true
      }
      const handleCodeSandbox = () => {
        const code = codeRef.value!.textContent
        const params = getCodeSandboxParams(code!, {
          title: `${title.value} - @antdv/ui@${packageInfo.version}`,
        })
        const div = document.createElement('div')
        div.style.display = 'none'
        div.innerHTML = `<form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
        <input type="hidden" name="parameters" value="${params}" />
        <input type="submit" value="Open in sandbox" />
      </form>`
        document.body.appendChild(div);
        (div.firstElementChild as HTMLFormElement).submit()
        document.body.removeChild(div)
      }
      const highlightClass = computed(() => {
        return {
          'highlight-wrapper': true,
          'highlight-wrapper-expand': codeExpand.value,
        }
      })
      const iframeDemo = inject('iframeDemo', {})
      onMounted(() => {
        addDemosInfo({
          href: `#${sectionId.value}`,
          title,
        })
      })
      const theme = computed(() => inject('themeMode', { theme: ref<any>('light') }).theme.value)
      return {
        docHtml,
        iframeDemo,
        iframeDemoKey,
        iframeHeight,
        inIframe,
        theme,
        type,
        blocked: globalConfig?.blocked,
        isZhCN: globalConfig?.isZhCN,
        sectionId,
        title,
        codeExpand,
        copyTooltipVisible,
        copied,
        onCopyTooltipVisibleChange,
        handleCodeExpand,
        handleCodeCopied,
        highlightClass,
        sourceCode: decodeURIComponent(escape(window.atob(props.jsfiddle?.sourceCode))),
        jsSourceCode: decodeURIComponent(escape(window.atob(props.jsfiddle?.jsSourceCode))),
        codeRef,
        handleCodeSandbox,
      }
    },
  })
</script>

<template>
  <template v-if="inIframe">
    <div :id="sectionId">
      <slot />
    </div>
  </template>
  <section v-else :id="sectionId" class="code-box">
    <section class="code-box-demo">
      <template v-if="iframeDemo[iframeDemoKey]">
        <div class="browser-mockup with-url">
          <iframe :src="iframeDemo[iframeDemoKey]" :height="iframeHeight" />
        </div>
      </template>
      <template v-else>
        <slot />
      </template>
    </section>
    <section class="code-box-meta markdown">
      <div class="code-box-title">
        <a :href="`#${sectionId}`">{{ title }}</a>
      </div>
      <div class="code-box-description" v-html="docHtml" />
      <div class="code-box-actions">
        <a-tooltip :title="$t('app.demo.codesandbox')">
          <CodeSandboxOutlined
            class="code-box-code-copy code-box-code-action"
            @click="handleCodeSandbox"
          />
        </a-tooltip>
        <span
          class="code-expand-icon code-box-code-action"
          style="width: auto"
        >
          {{ type }}
        </span>
        <a-tooltip
          v-if="!blocked"
          :title="$t(`app.demo.${copied ? 'copied' : 'copy'}`)"
          :open="copyTooltipVisible"
          @open-change="onCopyTooltipVisibleChange"
        >
          <component
            :is="copied && copyTooltipVisible ? 'CheckOutlined' : 'SnippetsOutlined'"
            key="copy"
            v-clipboard:copy="type === 'TS' ? sourceCode : jsSourceCode"
            v-clipboard:success="handleCodeCopied"
            class="code-box-code-copy code-box-code-action"
          />
        </a-tooltip>
        <a-tooltip v-else :title="$t('app.demo.copy')">
          <SnippetsOutlined class="code-box-code-copy code-box-code-action" />
        </a-tooltip>
        <a-tooltip :title="$t(`app.demo.code.${codeExpand ? 'hide' : 'show'}`)">
          <span class="code-expand-icon code-box-code-action">
            <img
              alt="expand code"
              :src="
                theme === 'dark'
                  ? 'https://gw.alipayobjects.com/zos/antfincdn/btT3qDZn1U/wSAkBuJFbdxsosKKpqyq.svg'
                  : 'https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg'
              "
              :class="codeExpand ? 'code-expand-icon-hide' : 'code-expand-icon-show'"
              @click="handleCodeExpand"
            />
            <img
              alt="expand code"
              :src="
                theme === 'dark'
                  ? 'https://gw.alipayobjects.com/zos/antfincdn/CjZPwcKUG3/OpROPHYqWmrMDBFMZtKF.svg'
                  : 'https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg'
              "
              :class="codeExpand ? 'code-expand-icon-show' : 'code-expand-icon-hide'"
              @click="handleCodeExpand"
            />
          </span>
        </a-tooltip>
      </div>
    </section>
    <section :class="highlightClass">
      <div ref="codeRef" class="highlight">
        <slot v-if="type === 'TS'" name="htmlCode" />
        <slot v-else name="jsVersionHtml" />
      </div>
    </section>
  </section>
</template>

<style></style>
