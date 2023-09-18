import { Route, Router } from '@vaadin/router';

import './pages/autofill-form.js';
import './pages/autofill-success.js';

const routes: Route[] = [
  {
    path: '',
    component: 'autofill-form',
  },
  {
    path: 'success',
    component: 'autofill-success',
  },
];

export const router = new Router(null);
router.setRoutes(routes);
