import type { ComponentDemo } from '../../interface';

import { Cascader } from '@antdv/ui';
import options from './data';

const Demo = (props: any) => <Cascader options={options} {...props} placeholder="Please select" />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgContainer', 'colorPrimary'],
  key: 'default',
};

export default componentDemo;
