import type { ComponentDemo } from '../../interface';
import { Alert, Space } from '@antdv/ui';
import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    return () => (
      <Space direction="vertical">
        <Alert message="Warning" type="warning" showIcon closable />
        <Alert
          message="Warning"
          description="This is a warning notice about copywriting."
          type="warning"
          showIcon
          closable
        />
      </Space>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorWarning', 'colorWarningBorder', 'colorWarningBg'],
  key: 'warning',
};

export default componentDemo;
