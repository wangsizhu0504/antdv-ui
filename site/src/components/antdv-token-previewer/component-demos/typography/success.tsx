import type { ComponentDemo } from '../../interface';
import { Typography } from '@antdv/ui';
import { defineComponent } from 'vue';

const { Title, Text } = Typography;

const Demo = defineComponent({
  setup() {
    return () => (
      <div>
        <Title type="success" level={4}>
          Success Title
        </Title>
        <Text type="success">success Text</Text>
      </div>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorSuccess'],
  key: 'success',
};

export default componentDemo;
