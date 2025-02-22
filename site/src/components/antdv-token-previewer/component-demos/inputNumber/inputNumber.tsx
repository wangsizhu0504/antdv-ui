import type { ComponentDemo } from '../../interface';
import { InputNumber } from '@antdv/ui';
import { defineComponent } from 'vue';

function onChange() {}
const Demo = defineComponent({
  setup() {
    return () => <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />;
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: [
    'colorPrimaryBorder',
    'controlOutline',
    'colorPrimaryHover',
    'colorPrimary',
    'colorBgContainer',
  ],
  key: 'default',
};

export default componentDemo;
