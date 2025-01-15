import Antd from '@antdv/ui';
import { createApp, version as vueVersion } from 'vue';
import App from './App.vue';
import { registGlobalComponents } from './components';

import clipboard from './directives/clipboard';
import { setupI18n } from './locale';
import { registerRouter } from './router';
import { registerRouterGuard } from './router/guard';
import './main.less';
import 'nprogress/nprogress.css';

function consoleTool(title: string, value: string) {
  console.log(
    `%c ${title} %c ${value} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    'background:transparent',
  );
}
function bootstrapApp() {
  consoleTool('vue version', vueVersion);
  consoleTool('ant design vue version', Antd.version);
  const app = createApp(App);

  // 路由
  const router = registerRouter(app);
  registerRouterGuard(router);
  // 国际化
  setupI18n(app);
  // 全局组件
  registGlobalComponents(app);

  app.use(clipboard);
  app.use(Antd);
  app.mount('#app');
}

bootstrapApp();
