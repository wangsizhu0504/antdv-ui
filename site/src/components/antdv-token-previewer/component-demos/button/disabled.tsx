import type { ComponentDemo } from '../../interface';
import { Button, Space } from '@antdv/ui';
import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    return () => (
      <Space>
        <Button disabled type="primary">
          Primary
        </Button>
        <Button disabled>Default</Button>
        <Button disabled type="dashed">
          Dashed
        </Button>
        <br />
        <Button disabled type="text">
          Text
        </Button>
        <Button disabled ghost>
          Ghost
        </Button>
        <Button disabled type="link">
          Link
        </Button>
      </Space>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorTextDisabled', 'colorBgContainerDisabled'],
  key: 'disabled',
};

export default componentDemo;
