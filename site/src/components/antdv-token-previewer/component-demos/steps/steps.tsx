import type { ComponentDemo } from '../../interface';
import { Steps } from '@antdv/ui';

import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    return () => (
      <Steps
        current={1}
        items={[
          {
            title: 'Finished',
            description: 'This is a description.',
          },
          {
            title: 'In Progress"',
            subTitle: 'Left 00:00:08',
            description: 'This is a description.',
          },
          {
            title: 'Waiting"',
            description: 'This is a description.',
          },
        ]}
      />
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary', 'colorBgContainer'],
  key: 'default',
};

export default componentDemo;
