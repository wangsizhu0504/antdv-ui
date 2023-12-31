// base rc-mentions .6.2
import {
  computed,
  defineComponent,
  nextTick,
  onUpdated,
  provide,
  reactive,
  ref,
  toRef,
  watchEffect,
  withDirectives,
} from 'vue'
import { omit } from '../../_utils/omit'

import { initDefaultProps } from '../../_utils/vue'
import antInputDirective from '../../_utils/antInputDirective'
import KeyCode from '../../_utils/keyCode'
import { classNames } from '../../_utils/dom'
import MentionsContextKey from './MentionsContext'
import { innerMentionsProps } from './props'
import KeywordTrigger from './KeywordTrigger'
import {
  filterOption as defaultFilterOption,
  validateSearch as defaultValidateSearch,
  getBeforeSelectionText,
  getLastMeasureIndex,
  replaceWithMeasure,
  setInputSelection,
} from './util'
import type { EventHandler } from '../../_utils/types'
import type { MentionOptionProps } from './props'
import type { CSSProperties } from 'vue'

function noop() {}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'InnerMentions',
  inheritAttrs: false,
  props: initDefaultProps(innerMentionsProps, {
    prefix: '@',
    split: ' ',
    rows: 1,
    validateSearch: defaultValidateSearch,
    filterOption: (() => defaultFilterOption) as any,
  }),
  emits: ['change', 'select', 'search', 'focus', 'blur', 'pressenter'],
  setup(props, { emit, attrs, expose, slots }) {
    const measure = ref(null)
    const textarea = ref(null)
    const focusId = ref()
    const state = reactive({
      value: props.value || '',
      measuring: false,
      measureLocation: 0,
      measureText: null,
      measurePrefix: '',
      activeIndex: 0,
      isFocus: false,
    })

    watchEffect(() => {
      state.value = props.value
    })

    const triggerChange = (val: string) => {
      emit('change', val)
    }

    const onChange: EventHandler = ({ target: { value, composing }, isComposing }) => {
      if (isComposing || composing) return
      triggerChange(value)
    }

    const startMeasure = (measureText: string, measurePrefix: string, measureLocation: number) => {
      Object.assign(state, {
        measuring: true,
        measureText,
        measurePrefix,
        measureLocation,
        activeIndex: 0,
      })
    }
    const stopMeasure = (callback?: () => void) => {
      Object.assign(state, {
        measuring: false,
        measureLocation: 0,
        measureText: null,
      })
      callback?.()
    }
    const selectOption = (option: MentionOptionProps) => {
      const { split } = props
      const { value: mentionValue = '' } = option
      const { text, selectionLocation } = replaceWithMeasure(state.value, {
        measureLocation: state.measureLocation,
        targetText: mentionValue,
        prefix: state.measurePrefix,
        selectionStart: textarea.value.selectionStart,
        split,
      })
      triggerChange(text)
      stopMeasure(() => {
        // We need restore the selection position
        setInputSelection(textarea.value, selectionLocation)
      })

      emit('select', option, state.measurePrefix)
    }

    const getOptions = (measureText?: string) => {
      const targetMeasureText = measureText || state.measureText || ''
      const { filterOption } = props
      const list = props.options.filter((option: MentionOptionProps) => {
        /** Return all result if `filterOption` is false. */
        if (!!filterOption === false)
          return true

        return (filterOption as Function)(targetMeasureText, option)
      })
      return list
    }

    const options = computed(() => {
      return getOptions()
    })

    const onKeyDown = (event: KeyboardEvent) => {
      const { which } = event
      // Skip if not measuring
      if (!state.measuring)
        return

      if (which === KeyCode.UP || which === KeyCode.DOWN) {
        // Control arrow function
        const optionLen = options.value.length
        const offset = which === KeyCode.UP ? -1 : 1
        const newActiveIndex = (state.activeIndex + offset + optionLen) % optionLen
        state.activeIndex = newActiveIndex
        event.preventDefault()
      } else if (which === KeyCode.ESC) {
        stopMeasure()
      } else if (which === KeyCode.ENTER) {
        // Measure hit
        event.preventDefault()
        if (!options.value.length) {
          stopMeasure()
          return
        }
        const option = options.value[state.activeIndex]
        selectOption(option)
      }
    }

    const onKeyUp = (event: KeyboardEvent) => {
      const { key, which } = event
      const { measureText: prevMeasureText, measuring } = state
      const { prefix, validateSearch } = props
      const target = event.target as HTMLTextAreaElement
      if ((target as any).composing)
        return

      const selectionStartText = getBeforeSelectionText(target)
      const { location: measureIndex, prefix: measurePrefix } = getLastMeasureIndex(
        selectionStartText,
        prefix,
      )

      // Skip if match the white key list
      if ([KeyCode.ESC, KeyCode.UP, KeyCode.DOWN, KeyCode.ENTER].includes(which))
        return

      if (measureIndex !== -1) {
        const measureText = selectionStartText.slice(measureIndex + measurePrefix.length)
        const validateMeasure = validateSearch(measureText, props)
        const matchOption = !!getOptions(measureText).length

        if (validateMeasure) {
          if (
            key === measurePrefix
            || key === 'Shift'
            || measuring
            || (measureText !== prevMeasureText && matchOption)
          )
            startMeasure(measureText, measurePrefix, measureIndex)
        } else if (measuring) {
          // Stop if measureText is invalidate
          stopMeasure()
        }

        /**
         * We will trigger `onSearch` to developer since they may use for async update.
         * If met `space` means user finished searching.
         */
        if (validateMeasure)
          emit('search', measureText, measurePrefix)
      } else if (measuring) {
        stopMeasure()
      }
    }
    const onPressEnter = (event) => {
      if (!state.measuring)
        emit('pressenter', event)
    }
    const onFocus = (event: Event) => {
      clearTimeout(focusId.value)
      const { isFocus } = state
      if (!isFocus && event)
        emit('focus', event)

      state.isFocus = true
    }
    const onBlur = (event: Event) => {
      focusId.value = setTimeout(() => {
        state.isFocus = false
        stopMeasure()
        emit('blur', event)
      }, 100)
    }
    const onInputFocus = (event: Event) => {
      onFocus(event)
    }
    const onInputBlur = (event: Event) => {
      onBlur(event)
    }

    const setActiveIndex = (activeIndex: number) => {
      state.activeIndex = activeIndex
    }

    const focus = () => {
      textarea.value.focus()
    }
    const blur = () => {
      textarea.value.blur()
    }
    expose({ blur, focus })
    provide(MentionsContextKey, {
      activeIndex: toRef(state, 'activeIndex'),
      setActiveIndex,
      selectOption,
      onFocus,
      onBlur,
      loading: toRef(props, 'loading'),
    })
    onUpdated(() => {
      nextTick(() => {
        if (state.measuring)
          measure.value.scrollTop = textarea.value.scrollTop
      })
    })
    return () => {
      const { measureLocation, measurePrefix, measuring } = state
      const { prefixCls, placement, transitionName, getPopupContainer, direction, ...restProps }
        = props

      const { class: className, style, ...otherAttrs } = attrs

      const inputProps = omit(restProps, [
        'value',
        'prefix',
        'split',
        'validateSearch',
        'filterOption',
        'options',
        'loading',
      ])

      const textareaProps = {
        ...inputProps,
        ...otherAttrs,
        onChange: noop,
        onSelect: noop,
        value: state.value,
        onInput: onChange,
        onBlur: onInputBlur,
        onKeydown: onKeyDown,
        onKeyup: onKeyUp,
        onFocus: onInputFocus,
        onPressenter: onPressEnter,
      }
      return (
        <div class={classNames(prefixCls, className)} style={style as CSSProperties}>
          {withDirectives(<textarea ref={textarea} {...textareaProps} />, [[antInputDirective]])}
          {measuring && (
            <div ref={measure} class={`${prefixCls}-measure`}>
              {state.value.slice(0, measureLocation)}
              <KeywordTrigger
                prefixCls={prefixCls}
                transitionName={transitionName}
                dropdownClassName={props.dropdownClassName}
                placement={placement}
                options={measuring ? options.value : []}
                visible
                direction={direction}
                getPopupContainer={getPopupContainer}
                v-slots={{ notFoundContent: slots.notFoundContent, option: slots.option }}
              >
                <span>{measurePrefix}</span>
              </KeywordTrigger>
              {state.value.slice(measureLocation + measurePrefix.length)}
            </div>
          )}
        </div>
      )
    }
  },
})
