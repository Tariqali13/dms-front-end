<template>
  <div>
    <h2 class="text-lg font-bold mb-4">My Wallets</h2>
    <ul>
      <li
        v-for="(wallet, idx) in wallets"
        :key="idx"
        class="mb-2 flex justify-between items-center"
      >
        <span class="flex items-center">
          <span
            class="inline-block h-4 w-4 rounded-full"
            :class="wallet.iconColor"
          ></span>
          <span class="ml-2">{{ wallet.name }}</span>
        </span>
        <span>{{ wallet.balance }}</span>
      </li>
    </ul>
    <button
      class="mt-4 px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
    >
      Add New Wallet
    </button>
  </div>
</template>

<script>
export default {
  name: "WalletList",
  data() {
    return {
      wallets: [
        { name: "Wallet 1", balance: "$400", iconColor: "bg-orange-500" },
        { name: "Wallet 2", balance: "$200", iconColor: "bg-gray-300" },
        { name: "Wallet 3", balance: "$700", iconColor: "bg-blue-400" },
      ],
    };
  },
};
</script>

<style scoped>
/* Example styling. Adjust as needed. */
</style>
