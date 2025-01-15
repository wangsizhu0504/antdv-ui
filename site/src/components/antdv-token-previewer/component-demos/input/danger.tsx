import type { ComponentDemo } from '../../interface';
import { Input } from '@antdv/ui';
import { defineComponent } from 'vue';

function onChange() {}

const Demo = defineComponent({
  setup() {
    return () => <Input status="error" defaultValue="hello" onChange={onChange} />;
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError', 'colorErrorOutline', 'colorErrorBorder', 'colorErrorHover'],
  key: 'danger',
};

export default componentDemo;
