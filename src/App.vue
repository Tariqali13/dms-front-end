<template>
  <div id="app">
    <DefaultLayout>
      <router-view></router-view>
    </DefaultLayout>
  </div>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';

export default {
  name: 'App',
  components: {
    DefaultLayout,
  },
};
</script>

<style>
/* Add any global styles here */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
}
</style>
