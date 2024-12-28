<template>
  <div class="flex gap-[34px] text-white h-[100vh] px-10" :class="darkThemeClass">
    <div class="w-full absolute flex justify-between bg-black left-0 h-[100vh]">
      <div class="flex justify-center">
        <img src="/svg-icons/right-square.svg" alt="My SVG Icon" />
      </div>
      <img src="/svg-icons/left-square.svg" alt="My SVG Icon" />
    </div>

    <!-- Sidebar -->
    <aside v-if="!isAuthPage" class="bg-transparent flex flex-col z-10 mb-[80px]">
      <div class="my-[19px] flex items-center justify-start bg-transparent">
        <!-- Logo -->
        <img src="/svg-icons/dms-logo.svg" alt="My SVG Icon" />
      </div>

      <nav>
        <ul class="m-0 p-0">
          <li v-if="!isAdminLogin" class="mb-2">
            <button @click="navigateTo('/dashboard')" :class="getMenuClass('/dashboard')">
              <img src="/svg-icons/dashboard-menu.svg" alt="My SVG Icon" />
              Dashboard
            </button>
          </li>
          <li v-if="!isAdminLogin" class="mb-2">
            <button @click="navigateTo('/send-money')" :class="getMenuClass('/send-money')">
              <img src="/svg-icons/send-money-menu.svg" alt="My SVG Icon" />
              Send Money
            </button>
          </li>
          <li class="mb-2">
            <button @click="navigateTo('/transactions')" :class="getMenuClass('/transactions')">
              <img src="/svg-icons/transactions-menu.svg" alt="My SVG Icon" />
              Transactions
            </button>
          </li>
        </ul>
      </nav>

      <div class="mt-auto">
        <button @click="handleLogout"
          class="no-underline text-white flex items-center gap-[19px] py-3 pl-[25px] pr-[71px] text-lg font-medium font-['Inter'] rounded-2xl">
          <img src="/svg-icons/logout-icon.svg" alt="My SVG Icon" />
          Log Out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex w-full flex-col gap-[45px] z-10 mb-[45px] bg-transparent overflow-y-scroll overflow-x-hidden">
      <!-- Top Bar / Header -->
      <header v-if="!isAuthPage" class="pt-[53px] flex justify-between items-center bg-transparent">
        <h1 class="text-2xl font-semibold font-['Inter']">
          Welcome Back, {{ userName }}
        </h1>
        <div class="text-lg font-medium text-white font-['Roboto'] mr-4 flex justify-center gap-3">
          {{ userName }} <img src="/svg-icons/user-icon.svg" alt="My SVG Icon" />
        </div>
      </header>

      <!-- Render children via slot -->
      <slot />
    </div>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
import appClient from '@/config';
export default {
  data() {
    return {
      userName: localStorage.getItem('userName'),
      role: 'user',
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      this.role = decodedToken.role
    }
  },
  name: 'DefaultLayout',
  computed: {
    darkThemeClass() {
      return 'bg-black';
    },
    currentRoute() {
      return this.$route.path; // Get the current route path
    },
    isAuthPage() {
      // Check if the current route is sign-in or sign-up
      return this.currentRoute === '/signin' || this.currentRoute === '/signup';
    },
    isAdminLogin() {
      // Check if the current route is sign-in or sign-up
      return this.role == 'admin' || this.role == 'Admin';
    },
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    getMenuClass(route) {
      return this.currentRoute === route
        ? 'w-max no-underline text-white flex items-center gap-[19px] py-3 pl-[25px] pr-[71px] text-lg font-medium font-[Inter] bg-gradient-to-br from-green-500 to-blue-700 rounded-2xl'
        : 'w-max no-underline text-white flex items-center gap-[19px] py-3 pl-[25px] pr-[71px] text-lg font-medium font-[Inter] rounded-2xl';
    },
    async handleLogout() {
      try {
        await appClient.post('/auth/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        this.$router.push('/signin');
      } catch (error) {
        alert('Failed to log out.');
      }
    },
  },
};
</script>
