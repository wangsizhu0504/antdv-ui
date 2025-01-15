import type { ComponentDemo } from '../../interface';
import { Empty } from '@antdv/ui';

const Demo = () => <Empty />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorTextDisabled'],
  key: 'default',
};

export default componentDemo;
