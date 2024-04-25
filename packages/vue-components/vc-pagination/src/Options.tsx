import { computed, defineComponent, ref } from 'vue'
import { KeyCode, PropTypes } from '@antdv/utils'
import type { EventHandler } from '@antdv/types'
import BaseInputCore from '@antdv/vue-components/vc-input/src/BaseInputCore'

export default defineComponent({
  compatConfig: { MODE: 3 },
  props: {
    disabled: { type: Boolean, default: undefined },
    changeSize: Function,
    quickGo: Function,
    selectComponentClass: PropTypes.any,
    current: Number,
    pageSizeOptions: PropTypes.array.def(['10', '20', '50', '100']),
    pageSize: Number,
    buildOptionText: Function,
    locale: PropTypes.object,
    rootPrefixCls: String,
    selectPrefixCls: String,
    goButton: PropTypes.any,
  },
  setup(props) {
    const goInputText = ref('')
    const validValue = computed(() => {
      return !goInputText.value || Number.isNaN(goInputText.value as any)
        ? undefined
        : Number(goInputText.value)
    })

    const defaultBuildOptionText = (opt) => {
      return `${opt.value} ${props.locale.items_per_page}`
    }
    const handleChange: EventHandler = (e) => {
      const { value } = e.target
      if (goInputText.value === value) return
      goInputText.value = value
    }
    const handleBlur: EventHandler = (e) => {
      const { goButton, quickGo, rootPrefixCls } = props

      if (goButton || goInputText.value === '')
        return

      if (
        e.relatedTarget
        && (e.relatedTarget.className.includes(`${rootPrefixCls}-item-link`)
          || e.relatedTarget.className.includes(`${rootPrefixCls}-item`))
      ) {
        goInputText.value = ''
      } else {
        quickGo(validValue.value)
        goInputText.value = ''
      }
    }
    const go: EventHandler = (e) => {
      if (goInputText.value === '')
        return

      if (e.keyCode === KeyCode.ENTER || e.type === 'click') {
        // https://github.com/vueComponent/ant-design-vue/issues/1316
        props.quickGo(validValue.value)

        goInputText.value = ''
      }
    }

    const pageSizeOptions = computed(() => {
      const { pageSize, pageSizeOptions } = props
      if (pageSizeOptions.some(option => option.toString() === pageSize.toString()))
        return pageSizeOptions

      return pageSizeOptions.concat([pageSize.toString()]).sort((a, b) => {
        const numberA = Number.isNaN(Number(a)) ? 0 : Number(a)

        const numberB = Number.isNaN(Number(b)) ? 0 : Number(b)
        return numberA - numberB
      })
    })

    return () => {
      const {
        rootPrefixCls,
        locale,
        changeSize,
        quickGo,
        goButton,
        selectComponentClass: Select,
        selectPrefixCls,
        pageSize,
        disabled,
      } = props
      const prefixCls = `${rootPrefixCls}-options`
      let changeSelect = null
      let goInput = null
      let gotoButton = null

      if (!changeSize && !quickGo)
        return null

      if (changeSize && Select) {
        const buildOptionText = props.buildOptionText || defaultBuildOptionText
        const options = pageSizeOptions.value.map((opt, i) => {
          return (
            <Select.Option key={i} value={opt}>
              {buildOptionText({ value: opt })}
            </Select.Option>
          )
        })

        changeSelect = (
          <Select
            disabled={disabled}
            prefixCls={selectPrefixCls}
            showSearch={false}
            class={`${prefixCls}-size-changer`}
            optionLabelProp="children"
            value={(pageSize || pageSizeOptions.value[0]).toString()}
            onChange={value => changeSize(Number(value))}
            getPopupContainer={triggerNode => triggerNode.parentNode}
          >
            {options}
          </Select>
        )
      }

      if (quickGo) {
        if (goButton) {
          gotoButton
            = typeof goButton === 'boolean'
              ? (
                <button
                  type="button"
                  onClick={go}
                  onKeyup={go}
                  disabled={disabled}
                  class={`${prefixCls}-quick-jumper-button`}
                >
                  {locale.jump_to_confirm}
                </button>
                )
              : (
                <span onClick={go} onKeyup={go}>
                  {goButton}
                </span>
                )
        }
        goInput = (
          <div class={`${prefixCls}-quick-jumper`}>
            {locale.jump_to}
            <BaseInputCore
              disabled={disabled}
              type="text"
              value={goInputText.value}
              onInput={handleChange}
              onChange={handleChange}
              onKeyup={go}
              onBlur={handleBlur}
            >
            </BaseInputCore>
            {locale.page}
            {gotoButton}
          </div>
        )
      }

      return (
        <li class={`${prefixCls}`}>
          {changeSelect}
          {goInput}
        </li>
      )
    }
  },
})
