import type { Router } from 'vue-router';
import NProgress from 'nprogress';

export function registerRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    if (to.path !== from.path)
      NProgress.start();

    next();
  });

  router.afterEach((to, from) => {
    if (to.path !== from.path) {
      NProgress.done();
      document.documentElement.scrollTop = 0;
    }
  });
}
