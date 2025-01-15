import type { ComponentDemo } from '../../interface';
import { CheckCircleFilled } from '@ant-design/icons-vue';
import { Input, theme } from '@antdv/ui';
import { defineComponent } from 'vue';

function onChange() {}

const Demo = defineComponent({
  setup() {
    const { token } = theme.useToken();

    return () => {
      return (
        <Input
          defaultValue={'I\'m the content'}
          suffix={<CheckCircleFilled style={{ color: token.value.colorSuccess }} />}
          onChange={onChange}
        />
      );
    };
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorSuccess'],
  key: 'warning',
};

export default componentDemo;
