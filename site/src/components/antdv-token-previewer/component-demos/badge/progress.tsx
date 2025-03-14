import type { ComponentDemo } from '../../interface';
import { Badge, Space } from '@antdv/ui';
import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    return () => (
      <Space size="small">
        <Badge dot status="processing" />
        Process
      </Space>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary'],
  key: 'progress',
};

export default componentDemo;
