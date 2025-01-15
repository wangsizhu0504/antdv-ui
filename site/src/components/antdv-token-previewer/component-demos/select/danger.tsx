import type { ComponentDemo } from '../../interface';
import { Select } from '@antdv/ui';

import { defineComponent } from 'vue';

import options from './data';

function handleChange(value: any) {
  console.log(`selected ${value}`);
}

const Demo = defineComponent({
  setup() {
    return () => (
      <Select
        mode="multiple"
        allowClear
        style={{
          width: '100%',
        }}
        status="error"
        options={options}
        placeholder="Please select"
        value={['a10', 'c12']}
        onChange={handleChange}
      />
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError', 'colorErrorOutline', 'colorErrorBorder', 'colorErrorHover'],
  key: 'danger',
};

export default componentDemo;
