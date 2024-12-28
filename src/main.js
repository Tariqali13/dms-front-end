import { createApp } from 'vue';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
// Bootstrap CSS import
import 'bootstrap/dist/css/bootstrap.min.css';
import { setAuthToken } from '@/config';
// Check for token in localStorage and set it on Axios
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token); // Set token in Axios headers
}
const app = createApp(App);
app.config.globalProperties.$moment = moment; // Add moment as a global property

app.use(router).mount('#app');
