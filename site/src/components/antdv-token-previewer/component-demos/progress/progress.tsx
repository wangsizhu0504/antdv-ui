import type { ComponentDemo } from '../../interface';
import { Progress } from '@antdv/ui';

import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    return () => (
      <>
        <Progress percent={30} />
        <Progress percent={50} status="active" />
        <Progress percent={70} status="exception" />
        <Progress percent={100} />
        <Progress percent={50} showInfo={false} />
        <Progress steps={8} />
      </>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorFillSecondary', 'colorText', 'colorBgContainer'],
  key: 'default',
};

export default componentDemo;
