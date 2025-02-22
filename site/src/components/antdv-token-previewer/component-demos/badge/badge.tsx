import type { ComponentDemo } from '../../interface';
import { ClockCircleFilled } from '@ant-design/icons-vue';
import { Avatar, Badge, Space, theme } from '@antdv/ui';
import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    const { token } = theme.useToken();

    return () => (
      <Space size="large">
        <Badge count={5}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge count={0} showZero>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge count={<ClockCircleFilled style={{ color: token.value.colorError }} />}>
          <Avatar shape="square" size="large" />
        </Badge>
      </Space>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError', 'colorBorderBg', 'colorBgContainer'],
  key: 'badge',
};

export default componentDemo;
