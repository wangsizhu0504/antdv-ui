import type { ComponentDemo } from '../../interface';
import { Progress } from '@antdv/ui';

import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    return () => (
      <>
        <Progress percent={30} />
        <Progress percent={50} status="active" />
        <Progress percent={70} type="dashboard" />
        <Progress percent={80} type="circle" />
        <Progress steps={8} percent={30} />
      </>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorInfo'],
  key: 'info',
};

export default componentDemo;
