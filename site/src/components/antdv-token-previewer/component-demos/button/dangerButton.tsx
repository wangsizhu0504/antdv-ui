import type { ComponentDemo } from '../../interface';
import { Button, Space } from '@antdv/ui';
import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    return () => (
      <Space>
        <Button type="primary" danger>
          primary
        </Button>
        <Button type="default" danger>
          default
        </Button>
        <Button type="text" danger>
          text
        </Button>
        {/* <Button ghost danger> */}
        {/*  ghost */}
        {/* </Button> */}
        <Button type="link" danger>
          link
        </Button>
      </Space>
    );
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: [
    'colorError',
    'colorErrorActive',
    'colorErrorHover',
    'colorErrorBorder',
    'colorErrorOutline',
  ],
  key: 'danger',
};

export default componentDemo;
