import type { ComponentDemo } from '../../interface';
import { Radio } from '@antdv/ui';

const Demo = () => <Radio checked>Radio</Radio>;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary', 'controlOutline', 'colorBgContainer'],
  key: 'default',
};

export default componentDemo;
