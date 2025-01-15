import type { ComponentDemo } from '../../interface'
import { Anchor } from '@antdv/ui'

const { Link } = Anchor
function Demo() {
  return (
    <div style={{ padding: '12px' }}>
      <Anchor>
        <Link href="#" title="Basic demo" />
        <Link href="#site-example-anchor-demo-static" title="Static demo" />
        <Link href="#api" title="API">
          <Link href="#Anchor-Props" title="Anchor Props" />
          <Link href="#Link-Props" title="Link Props" />
        </Link>
      </Anchor>
    </div>
  )
}

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary', 'colorSplit', 'colorBgContainer'],
  key: 'anchor',
}

export default componentDemo
