import type { ComponentDemo } from '../../interface';
import { Calendar } from '@antdv/ui';

const Demo = () => <Calendar />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary', 'colorPrimaryHover', 'colorBgContainer'],
  key: 'default',
};

export default componentDemo;
