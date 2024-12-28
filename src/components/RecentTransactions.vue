<template>
  <div>
    <h2 class="text-lg font-bold mb-4">Recent Transactions</h2>
    <table class="table-auto w-full text-gray-300">
      <thead>
        <tr class="text-left border-b border-gray-600">
          <th class="py-2">Name</th>
          <th class="py-2">Balance</th>
          <th class="py-2">Date</th>
          <th class="py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(transaction, index) in transactions"
          :key="index"
          class="border-b border-gray-800"
        >
          <td class="py-2">{{ transaction.name }}</td>
          <td class="py-2">{{ transaction.balance }}</td>
          <td class="py-2">{{ transaction.date }}</td>
          <td class="py-2">
            <span
              :class="[
                'inline-block px-2 py-1 rounded text-xs',
                transaction.status === 'Inbound' ? 'bg-green-600' : 'bg-orange-600'
              ]"
            >
              {{ transaction.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "RecentTransactions",
  data() {
    return {
      transactions: [
        {
          name: "Eric",
          balance: "$1000",
          date: "12/12/2024",
          status: "Inbound",
        },
        {
          name: "Mohammed",
          balance: "220 SAR",
          date: "14/02/2024",
          status: "Outbound",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Customize table or status label if desired */
</style>
