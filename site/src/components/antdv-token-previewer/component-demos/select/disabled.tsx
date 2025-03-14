import type { ComponentDemo } from '../../interface';
import { Select } from '@antdv/ui';

import { defineComponent } from 'vue';

import options from './data';

const Demo = defineComponent({
  setup() {
    return () => (
      <Select
        mode="multiple"
        allowClear
        style={{
          width: '100%',
        }}
        disabled
        options={options}
        placeholder="Please select"
        value={['a10', 'c12']}
      />
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgContainerDisabled', 'colorTextDisabled'],
  key: 'disabled',
};

export default componentDemo;
