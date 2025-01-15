import type { ComponentDemo } from '../../interface';
import { Input } from '@antdv/ui';

const Demo = () => <Input placeholder="Basic usage" />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary', 'colorPrimaryHover', 'controlOutline', 'colorBgContainer'],
  key: 'default',
};

export default componentDemo;
