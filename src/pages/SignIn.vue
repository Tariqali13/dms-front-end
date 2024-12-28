<template>
  <div class="flex items-center justify-center h-screen bg-transparent">
    <div class="bg-[rgba(28,28,28,1)] p-8 rounded-lg shadow-lg max-w-md w-full text-white">
      <h1 class="text-2xl font-bold mb-6">Sign In</h1>
      <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-sm mb-2">Email</label>
          <input v-model="email" type="email" class="w-full p-2 bg-black rounded"
            :class="{ 'border border-red-500': emailError }" />
          <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
        </div>
        <div class="mb-6">
          <label class="block text-sm mb-2">Password</label>
          <input v-model="password" type="password" class="w-full p-2 bg-black rounded"
            :class="{ 'border border-red-500': passwordError }" />
          <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
        </div>
        <button :disabled="!isFormValid"
          class="bg-gradient-to-br from-green-500 to-blue-700 w-full py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed">
          Sign In
        </button>
        <p @click="navigateTo('/signup')" class="mt-4 text-[pink]  cursor-pointer">Sign Up here.</p>
      </form>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
import appClient, { setAuthToken } from '@/config'
export default {
  async mounted() {
    const token = localStorage.getItem('token');
    let isAdmin = false;
    if (token) {
      const decodedToken = jwtDecode(token);
      isAdmin = decodedToken.role == 'admin' || decodedToken.role == 'Admin';
    }
    if (token && !isAdmin) {
      alert('Already Logged In');
      window.location.href = '/dashboard';
    }
    if (token && isAdmin) {
      alert('Already Logged In');
      window.location.href = '/transactions';
    }
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      emailError: '',
      passwordError: '',
    };
  },
  computed: {
    isFormValid() {
      return !this.emailError && !this.passwordError && this.email && this.password;
    },
  },
  watch: {
    email(value) {
      if (!value) {
        this.emailError = 'Email is required';
      } else if (!this.isValidEmail(value)) {
        this.emailError = 'Invalid email address';
      } else {
        this.emailError = '';
        this.errorMessage = '';
      }
    },
    password(value) {
      if (!value) {
        this.passwordError = 'Password is required';
      } else {
        this.passwordError = '';
        this.errorMessage = '';
      }
    },
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async login() {
      // Check validation before making API request
      if (!this.email || !this.password) {
        this.errorMessage = 'Please fill out all fields';
        return;
      }
      try {
        const response = await appClient.post('/auth/signin', {
          email: this.email, password: this.password,
        });
        const token = response.data.accessToken
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id; // Assuming the token contains an `id` field
        const userName = decodedToken.name; // Assuming the token contains a `name` field
        setAuthToken(token)
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
        window.alert("Sign In successfully")
        const isAdmin = decodedToken.role == 'admin' || decodedToken.role == 'Admin';
        if (!isAdmin) {
          this.$router.push('/dashboard');

        } else {
          this.$router.push('/transactions');
        }
      } catch (error) {
        this.errorMessage = error?.response?.data?.message;
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  },
};
</script>

<style scoped>
/* Add necessary styles for error highlighting */
</style>
