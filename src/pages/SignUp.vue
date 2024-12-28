<template>
  <div class="flex items-center justify-center h-screen">
    <div class="bg-[rgba(28,28,28,1)] p-8 rounded-lg shadow-lg max-w-md w-full text-white">
      <h1 class="text-2xl font-bold mb-6">Sign Up</h1>
      <form @submit.prevent="register">
        <!-- Name Field -->
        <div class="mb-4">
          <label class="block text-sm mb-2">Name</label>
          <input v-model="name" type="text" class="w-full p-2 bg-black rounded" />
          <p v-if="errors.name" class="text-red-500 text-sm mt-2">{{ errors.name }}</p>
        </div>

        <!-- Email Field -->
        <div class="mb-4">
          <label class="block text-sm mb-2">Email</label>
          <input v-model="email" type="email" class="w-full p-2 bg-black rounded" />
          <p v-if="errors.email" class="text-red-500 text-sm mt-2">{{ errors.email }}</p>
        </div>

        <!-- Password Field -->
        <div class="mb-4">
          <label class="block text-sm mb-2">Password</label>
          <input v-model="password" type="password" class="w-full p-2 bg-black rounded" />
          <p v-if="errors.password" class="text-red-500 text-sm mt-2">{{ errors.password }}</p>
        </div>

        <!-- Confirm Password Field -->
        <div class="mb-6">
          <label class="block text-sm mb-2">Confirm Password</label>
          <input v-model="confirmPassword" type="password" class="w-full p-2 bg-black rounded" />
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-2">{{ errors.confirmPassword }}</p>
        </div>

        <button class="bg-gradient-to-br from-green-500 to-blue-700 w-full py-2 rounded" :disabled="isSubmitting">
          Sign Up
        </button>
        <p @click="navigateTo('/signin')" class="mt-4 text-[pink] cursor-pointer">Sign In here.</p>
      </form>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
import apiClient from "@/config"
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      isSubmitting: false,
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async register() {
      // Clear existing errors
      this.errors = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      };

      // Validate fields
      if (!this.name) {
        this.errors.name = 'Name is required.';
      }

      if (!this.email) {
        this.errors.email = 'Email is required.';
      } else if (!this.isValidEmail(this.email)) {
        this.errors.email = 'Please enter a valid email address.';
      }

      if (!this.password) {
        this.errors.password = 'Password is required.';
      } else if (this.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters long.';
      }

      if (!this.confirmPassword) {
        this.errors.confirmPassword = 'Please confirm your password.';
      } else if (this.password !== this.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match.';
      }

      // Check if there are any errors
      if (Object.values(this.errors).some((error) => error)) {
        return;
      }

      // Proceed with registration if no errors
      try {
        this.isSubmitting = true; // Disable button during submission
        const response = await apiClient.post('/auth/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        });
        alert('Sign up successful!');
        this.$router.push('/signin');
      } catch (error) {
        alert(error.response.data.message);
      } finally {
        this.isSubmitting = false; // Re-enable button after submission
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  },
};
</script>
