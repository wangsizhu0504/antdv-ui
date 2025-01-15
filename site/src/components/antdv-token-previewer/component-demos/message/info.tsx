import type { ComponentDemo } from '../../interface';
import { Button, message } from '@antdv/ui';
import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    const info = () => {
      message.info('This is an info message');
    };

    return () => <Button onClick={info}>Info</Button>;
  },
});
const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorInfo'],
  key: 'info',
};

export default componentDemo;
