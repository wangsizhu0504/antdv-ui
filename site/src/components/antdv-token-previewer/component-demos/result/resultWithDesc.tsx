import type { ComponentDemo } from '../../interface';
import { Result } from '@antdv/ui';

import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    return () => (
      <Result title="Demo示意" subTitle="背景色为 colorFillAlter">
        Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.
      </Result>
    );
  },
});
const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorFillAlter'],
  key: 'resultWithDesc',
};

export default componentDemo;
