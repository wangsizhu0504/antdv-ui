import type { ComponentDemo } from '../../interface';
import { Tag } from '@antdv/ui';

const { CheckableTag } = Tag;

function Checkable() {
  return (
    <div>
      <CheckableTag checked>Error</CheckableTag>
      <CheckableTag checked={false}>Error</CheckableTag>
    </div>
  );
}

const componentDemo: ComponentDemo = {
  demo: <Checkable />,
  tokens: ['colorPrimary', 'colorPrimaryHover', 'colorPrimaryActive'],
  key: 'multiTags',
};

export default componentDemo;
