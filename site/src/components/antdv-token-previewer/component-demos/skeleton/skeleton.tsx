import type { ComponentDemo } from '../../interface';

import { Skeleton } from '@antdv/ui';

const Demo = () => <Skeleton active />;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorFillContent', 'colorTextPlaceholder'],
  key: 'default',
};

export default componentDemo;
