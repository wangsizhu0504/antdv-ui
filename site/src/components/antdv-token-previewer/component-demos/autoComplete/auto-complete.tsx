import type { ComponentDemo } from '../../interface'
import { AutoComplete } from '@antdv/ui'
import { defineComponent, ref } from 'vue'

function mockVal(str: string, repeat = 1) {
  return {
    value: str.repeat(repeat),
  }
}

const Demo = defineComponent({
  setup() {
    const value = ref<any>('')
    const options = ref<Array<{ value: string }>>([])
    const onSearch = (searchText: string) => {
      options.value = !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    }
    const onSelect = (data: string) => {
      console.log('onSelect', data)
    }
    const onChange = (data: string) => {
      value.value = data
    }

    return () => {
      return (
        <>
          {' '}
          <AutoComplete
            options={options.value}
            style={{ width: 200 }}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder="input here"
          />
          {' '}
          <br />
          {' '}
          <br />
          {' '}
          <AutoComplete
            value={value.value}
            options={options.value}
            style={{ width: 200 }}
            onSelect={onSelect}
            onSearch={onSearch}
            onChange={onChange}
            placeholder="control mode"
          />
          {' '}
        </>
      )
    }
  },
})

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: [],
  key: 'autoComplete',
}

export default componentDemo
