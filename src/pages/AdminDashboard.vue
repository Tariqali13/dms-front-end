<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <div>
      <h3>All Transactions</h3>
      <ul>
        <li v-for="transaction in transactions" :key="transaction.id">
          {{ transaction.date }} - {{ transaction.senderId }} - {{ transaction.recipientWallet }} - {{ transaction.amount }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transactions: [],
    };
  },
  async created() {
    const response = await fetch('http://localhost:3000/transaction/all', {
      headers: {
        Authorization: `Bearer ${this.$store.state.token}`,
      },
    });
    this.transactions = await response.json();
  },
};
</script>