<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-bold">Expense vs Incoming</h2>
      <button class="text-sm text-gray-400 hover:text-gray-200">More</button>
    </div>

    <!-- For the sake of demonstration, we'll show a mock chart 
         But you can integrate an actual chart library like Chart.js -->
    <div class="h-64 bg-gray-700 flex items-center justify-center rounded">
      <p class="text-gray-300">[Chart Placeholder]</p>
    </div>

    <!-- Example of a custom legend or date labels (optional) -->
    <div class="mt-4 text-sm flex justify-around text-gray-300">
      <div>19 May</div>
      <div>20 May</div>
      <div>21 May</div>
      <div>22 May</div>
      <div>23 May</div>
      <div>24 May</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChartCard",
};
</script>

<style scoped>
/* Adjust as needed */
</style>
