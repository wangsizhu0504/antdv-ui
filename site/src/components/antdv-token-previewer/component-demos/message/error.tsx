import type { ComponentDemo } from '../../interface';
import { Button, message } from '@antdv/ui';
import { defineComponent } from 'vue';

const Demo = defineComponent({
  setup() {
    const error = () => {
      message.error('This is an error message');
    };

    return () => <Button onClick={error}>Error</Button>;
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError'],
  key: 'error',
};

export default componentDemo;
