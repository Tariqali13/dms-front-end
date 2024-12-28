import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import SendMoney from '../pages/SendMoney.vue';
import Transactions from '../pages/Transactions.vue';
import SignIn from '../pages/SignIn.vue';
import SignUp from '../pages/SignUp.vue';

const routes = [
  { path: '/', redirect: '/signin' },
  { path: '/dashboard', component: Dashboard },
  { path: '/send-money', component: SendMoney },
  { path: '/transactions', component: Transactions },
  { path: '/signin', component: SignIn },
  { path: '/signup', component: SignUp },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
