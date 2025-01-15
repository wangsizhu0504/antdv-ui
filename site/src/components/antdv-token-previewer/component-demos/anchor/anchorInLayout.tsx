import type { ComponentDemo } from '../../interface';
import { Anchor, theme } from '@antdv/ui';
import { defineComponent } from 'vue';

const { Link } = Anchor;
const Demo = defineComponent({
  setup() {
    const { token } = theme.useToken();

    return () => {
      return (
        <div style={{ background: token.value.colorBorderSecondary, padding: '12px' }}>
          <Anchor>
            <Link href="#site-example-anchor-demo-basic" title="Basic demo" />
            <Link href="#site-example-anchor-demo-static" title="Static demo" />
            <Link href="#api" title="API">
              <Link href="#Anchor-Props" title="Anchor Props" />
              <Link href="#Link-Props" title="Link Props" />
            </Link>
          </Anchor>
        </div>
      );
    };
  },
});

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorSplit'],
  key: 'anchorInLayout',
};

export default componentDemo;
