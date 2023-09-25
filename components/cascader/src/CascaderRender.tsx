import { computed, defineComponent, ref, toRef, toRefs, watchEffect } from 'vue'
import { omit } from '../../_utils/omit'
import { useId, useMergedState } from '../../hooks'
import { conductCheck } from '../../_internal/tree/utils/conductUtil'
import { BaseSelect } from '../../_internal/select'
import { warning } from '../../_utils/log'
import { initDefaultProps } from '../../_utils/vue'
import useMaxLevel from '../../_internal/tree/useMaxLevel'
import { fillFieldNames, toPathKey, toPathKeys } from './utils/commonUtil'
import useEntities from './hooks/useEntities'
import useSearchConfig from './hooks/useSearchConfig'
import useSearchOptions from './hooks/useSearchOptions'
import useMissingValues from './hooks/useMissingValues'
import { formatStrategyValues, toPathOptions } from './utils/treeUtil'
import useDisplayValues from './hooks/useDisplayValues'
import { useProvideCascader } from './context'
import OptionList from './OptionList'
import { innerCascaderProps } from './props'
import type { SingleValueType, ValueType } from './interface'
import type { Key } from '../../_utils/types'
import type { DisplayValueType } from '../../_internal/select/BaseSelect'
import type { BaseSelectProps, BaseSelectRef } from '../../_internal/select'
import type { CSSProperties, Ref } from 'vue'

export type CascaderRef = Omit<BaseSelectRef, 'scrollTo'>

function isMultipleValue(value: ValueType): value is SingleValueType[] {
  return Array.isArray(value) && Array.isArray(value[0])
}

function toRawValues(value: ValueType): SingleValueType[] {
  if (!value)
    return []

  if (isMultipleValue(value))
    return value

  return (value.length === 0 ? [] : [value]).map(val => (Array.isArray(val) ? val : [val]))
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'InnerCascader',
  inheritAttrs: false,
  props: initDefaultProps(innerCascaderProps(), {}),
  setup(props, { attrs, expose, slots }) {
    const mergedId = useId(toRef(props, 'id'))
    const multiple = computed(() => !!props.checkable)

    // =========================== Values ===========================
    const [rawValues, setRawValues] = useMergedState<ValueType, Ref<SingleValueType[]>>(
      props.defaultValue,
      {
        value: computed(() => props.value),
        postState: toRawValues,
      },
    )

    // ========================= FieldNames =========================
    const mergedFieldNames = computed(() => fillFieldNames(props.fieldNames))

    // =========================== Option ===========================
    const mergedOptions = computed(() => props.options || [])

    // Only used in multiple mode, this fn will not call in single mode
    const pathKeyEntities = useEntities(mergedOptions, mergedFieldNames)

    /** Convert path key back to value format */
    const getValueByKeyPath = (pathKeys: Key[]): SingleValueType[] => {
      const keyPathEntities = pathKeyEntities.value

      return pathKeys.map((pathKey) => {
        const { nodes } = keyPathEntities[pathKey]

        return nodes.map(node => node[mergedFieldNames.value.value])
      })
    }

    // =========================== Search ===========================
    const [mergedSearchValue, setSearchValue] = useMergedState('', {
      value: computed(() => props.searchValue),
      postState: search => search || '',
    })

    const onInternalSearch: BaseSelectProps['onSearch'] = (searchText, info) => {
      setSearchValue(searchText)

      if (info.source !== 'blur' && props.onSearch)
        props.onSearch(searchText)
    }

    const { showSearch: mergedShowSearch, searchConfig: mergedSearchConfig } = useSearchConfig(
      toRef(props, 'showSearch'),
    )

    const searchOptions = useSearchOptions(
      mergedSearchValue,
      mergedOptions,
      mergedFieldNames,
      computed(() => props.dropdownPrefixCls || props.prefixCls),
      mergedSearchConfig,
      toRef(props, 'changeOnSelect'),
    )

    // =========================== Values ===========================
    const missingValuesInfo = useMissingValues(mergedOptions, mergedFieldNames, rawValues)

    // Fill `rawValues` with checked conduction values
    const [checkedValues, halfCheckedValues, missingCheckedValues] = [
      ref<SingleValueType[]>([]),
      ref<SingleValueType[]>([]),
      ref<SingleValueType[]>([]),
    ]

    const { maxLevel, levelEntities } = useMaxLevel(pathKeyEntities)
    watchEffect(() => {
      const [existValues, missingValues] = missingValuesInfo.value

      if (!multiple.value || !rawValues.value.length) {
        [checkedValues.value, halfCheckedValues.value, missingCheckedValues.value] = [
          existValues,
          [],
          missingValues,
        ]
        return
      }

      const keyPathValues = toPathKeys(existValues)
      const keyPathEntities = pathKeyEntities.value

      const { checkedKeys, halfCheckedKeys } = conductCheck(
        keyPathValues,
        true,
        keyPathEntities,
        maxLevel.value,
        levelEntities.value,
      );

      // Convert key back to value cells
      [checkedValues.value, halfCheckedValues.value, missingCheckedValues.value] = [
        getValueByKeyPath(checkedKeys),
        getValueByKeyPath(halfCheckedKeys),
        missingValues,
      ]
    })

    const deDuplicatedValues = computed(() => {
      const checkedKeys = toPathKeys(checkedValues.value)
      const deduplicateKeys = formatStrategyValues(
        checkedKeys,
        pathKeyEntities.value,
        props.showCheckedStrategy,
      )
      return [...missingCheckedValues.value, ...getValueByKeyPath(deduplicateKeys)]
    })

    const displayValues = useDisplayValues(
      deDuplicatedValues,
      mergedOptions,
      mergedFieldNames,
      multiple,
      toRef(props, 'displayRender'),
    )

    // =========================== Change ===========================
    const triggerChange = (nextValues: ValueType) => {
      setRawValues(nextValues)

      // Save perf if no need trigger event
      if (props.onChange) {
        const nextRawValues = toRawValues(nextValues)

        const valueOptions = nextRawValues.map(valueCells =>
          toPathOptions(valueCells, mergedOptions.value, mergedFieldNames.value).map(
            valueOpt => valueOpt.option,
          ),
        )

        const triggerValues = multiple.value ? nextRawValues : nextRawValues[0]
        const triggerOptions = multiple.value ? valueOptions : valueOptions[0]

        props.onChange(triggerValues, triggerOptions)
      }
    }

    // =========================== Select ===========================
    const onInternalSelect = (valuePath: SingleValueType) => {
      setSearchValue('')
      if (!multiple.value) {
        triggerChange(valuePath)
      } else {
        // Prepare conduct required info
        const pathKey = toPathKey(valuePath)
        const checkedPathKeys = toPathKeys(checkedValues.value)
        const halfCheckedPathKeys = toPathKeys(halfCheckedValues.value)

        const existInChecked = checkedPathKeys.includes(pathKey)
        const existInMissing = missingCheckedValues.value.some(
          valueCells => toPathKey(valueCells) === pathKey,
        )

        // Do update
        let nextCheckedValues = checkedValues.value
        let nextMissingValues = missingCheckedValues.value

        if (existInMissing && !existInChecked) {
          // Missing value only do filter
          nextMissingValues = missingCheckedValues.value.filter(
            valueCells => toPathKey(valueCells) !== pathKey,
          )
        } else {
          // Update checked key first
          const nextRawCheckedKeys = existInChecked
            ? checkedPathKeys.filter(key => key !== pathKey)
            : [...checkedPathKeys, pathKey]

          // Conduction by selected or not
          let checkedKeys: Key[]
          if (existInChecked) {
            ({ checkedKeys } = conductCheck(
              nextRawCheckedKeys,
              { checked: false, halfCheckedKeys: halfCheckedPathKeys },
              pathKeyEntities.value,
              maxLevel.value,
              levelEntities.value,
            ))
          } else {
            ({ checkedKeys } = conductCheck(
              nextRawCheckedKeys,
              true,
              pathKeyEntities.value,
              maxLevel.value,
              levelEntities.value,
            ))
          }

          // Roll up to parent level keys
          const deDuplicatedKeys = formatStrategyValues(
            checkedKeys,
            pathKeyEntities.value,
            props.showCheckedStrategy,
          )
          nextCheckedValues = getValueByKeyPath(deDuplicatedKeys)
        }

        triggerChange([...nextMissingValues, ...nextCheckedValues])
      }
    }

    // Display Value change logic
    const onDisplayValuesChange: BaseSelectProps['onDisplayValuesChange'] = (_, info) => {
      if (info.type === 'clear') {
        triggerChange([])
        return
      }

      // Cascader do not support `add` type. Only support `remove`
      const { valueCells } = info.values[0] as DisplayValueType & { valueCells: SingleValueType }
      onInternalSelect(valueCells)
    }

    // ============================ Open ============================
    if (process.env.NODE_ENV !== 'production') {
      watchEffect(() => {
        warning(
          !props.onPopupVisibleChange,
          'Cascader',
          '`popupVisibleChange` is deprecated. Please use `dropdownVisibleChange` instead.',
        )
        warning(
          props.popupVisible === undefined,
          'Cascader',
          '`popupVisible` is deprecated. Please use `open` instead.',
        )
        warning(
          props.popupClassName === undefined,
          'Cascader',
          '`popupClassName` is deprecated. Please use `dropdownClassName` instead.',
        )
        warning(
          props.popupPlacement === undefined,
          'Cascader',
          '`popupPlacement` is deprecated. Please use `placement` instead.',
        )
        warning(
          props.popupStyle === undefined,
          'Cascader',
          '`popupStyle` is deprecated. Please use `dropdownStyle` instead.',
        )
      })
    }

    const mergedOpen = computed(() => (props.open !== undefined ? props.open : props.popupVisible))

    const mergedDropdownClassName = computed(() => props.dropdownClassName || props.popupClassName)

    const mergedDropdownStyle = computed(() => props.dropdownStyle || props.popupStyle || {})

    const mergedPlacement = computed(() => props.placement || props.popupPlacement)

    const onInternalDropdownVisibleChange = (nextVisible: boolean) => {
      props.onDropdownVisibleChange?.(nextVisible)
      props.onPopupVisibleChange?.(nextVisible)
    }
    const {
      changeOnSelect,
      checkable,
      dropdownPrefixCls,
      loadData,
      expandTrigger,
      expandIcon,
      loadingIcon,
      dropdownMenuColumnStyle,
      customSlots,
    } = toRefs(props)
    useProvideCascader({
      options: mergedOptions,
      fieldNames: mergedFieldNames,
      values: checkedValues,
      halfValues: halfCheckedValues,
      changeOnSelect,
      onSelect: onInternalSelect,
      checkable,
      searchOptions,
      dropdownPrefixCls,
      loadData,
      expandTrigger,
      expandIcon,
      loadingIcon,
      dropdownMenuColumnStyle,
      customSlots,
    })
    const selectRef = ref<BaseSelectRef>()

    expose({
      focus() {
        selectRef.value?.focus()
      },
      blur() {
        selectRef.value?.blur()
      },
      scrollTo(arg) {
        selectRef.value?.scrollTo(arg)
      },
    } as BaseSelectRef)

    const pickProps = computed(() => {
      return omit(props, [
        'id',
        'prefixCls',
        'fieldNames',

        // Value
        'defaultValue',
        'value',
        'changeOnSelect',
        'onChange',
        'displayRender',
        'checkable',

        // Search
        'searchValue',
        'onSearch',
        'showSearch',

        // Trigger
        'expandTrigger',

        // Options
        'options',
        'dropdownPrefixCls',
        'loadData',

        // Open
        'popupVisible',
        'open',

        'popupClassName',
        'dropdownClassName',
        'dropdownMenuColumnStyle',

        'popupPlacement',
        'placement',

        'onDropdownVisibleChange',
        'onPopupVisibleChange',

        // Icon
        'expandIcon',
        'loadingIcon',
        'customSlots',

        'showCheckedStrategy',
        // Children
        'children',
      ])
    })
    return () => {
      const emptyOptions = !(mergedSearchValue.value ? searchOptions.value : mergedOptions.value)
        .length
      const { dropdownMatchSelectWidth = false } = props
      const dropdownStyle: CSSProperties
        // Search to match width
        = (mergedSearchValue.value && mergedSearchConfig.value.matchInputWidth)
        // Empty keep the width
        || emptyOptions
          ? {}
          : {
              minWidth: 'auto',
            }
      return (
        <BaseSelect
          {...pickProps.value}
          {...attrs}
          // MISC
          ref={selectRef}
          id={mergedId}
          prefixCls={props.prefixCls}
          dropdownMatchSelectWidth={dropdownMatchSelectWidth}
          dropdownStyle={{ ...mergedDropdownStyle.value, ...dropdownStyle }}
          // Value
          displayValues={displayValues.value}
          onDisplayValuesChange={onDisplayValuesChange}
          mode={multiple.value ? 'multiple' : undefined}
          // Search
          searchValue={mergedSearchValue.value}
          onSearch={onInternalSearch}
          showSearch={mergedShowSearch.value}
          // Options
          OptionList={OptionList}
          emptyOptions={emptyOptions}
          // Open
          open={mergedOpen.value}
          dropdownClassName={mergedDropdownClassName.value}
          placement={mergedPlacement.value}
          onDropdownVisibleChange={onInternalDropdownVisibleChange}
          // Children
          getRawInputElement={() => slots.default?.()}
          v-slots={slots}
        />
      )
    }
  },
})
