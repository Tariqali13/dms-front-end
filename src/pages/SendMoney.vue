<template>
  <div class="text-white p-10 bg-[rgba(28,28,28,0.5)] !rounded-[16px]">
    <h2 class="text-2xl font-semibold mb-6">Send Money</h2>
    <form @submit.prevent="validateAndSendMoney" class="p-8 rounded-lg w-96">
      <!-- Sender Wallet -->
      <div class="mb-4">
        <label class="block text-sm mb-2">Sender Wallet - Name (Number)</label>
        <select v-model="senderWallet" class="w-full p-2 rounded bg-black text-white">
          <option value="" disabled>Select a Sender Wallet</option>
          <option v-for="wallet in filteredSenderWallets" :key="wallet.walletNumber" :value="wallet.walletNumber">
            {{ wallet.name }} ({{ wallet.walletNumber }})
          </option>
        </select>
        <p v-if="validationErrors.senderWallet" class="text-red-500 text-sm">{{ validationErrors.senderWallet }}</p>
      </div>

      <!-- Receiver Wallet -->
      <div class="mb-4">
        <label class="block text-sm mb-2">Recipient Wallet - Name (Number)</label>
        <select v-model="receiverWallet" @change="fetchReceiverName" class="w-full p-2 rounded bg-black text-white">
          <option value="" disabled>Select a Recipient Wallet</option>
          <option v-for="wallet in filteredReceiverWallets" :key="wallet.walletNumber" :value="wallet.walletNumber">
            {{ wallet.name }} ({{ wallet.walletNumber }})
          </option>
        </select>
        <p v-if="validationErrors.receiverWallet" class="text-red-500 text-sm">{{ validationErrors.receiverWallet }}</p>
      </div>

      <!-- Amount -->
      <div class="mb-4">
        <label class="block text-sm mb-2">Amount</label>
        <input v-model="amount" type="number" class="w-full p-2 rounded bg-black text-white"
          placeholder="Enter Amount" />
        <p v-if="validationErrors.amount" class="text-red-500 text-sm">{{ validationErrors.amount }}</p>
      </div>

      <!-- Currency -->
      <div class="mb-6">
        <label class="block text-sm mb-2">Receiver Wallet Currency</label>
        <input v-model="currency" type="text" disabled class="w-full p-2 rounded bg-grey text-white" />
      </div>

      <!-- Submit Button -->
      <button type="submit" class="w-full bg-gradient-to-br from-green-500 to-blue-700 text-white py-2 px-4 rounded">
        Send Money
      </button>
    </form>
  </div>
</template>

<script>
import appClient from '@/config'
export default {
  data() {
    return {
      senderWallet: '',
      receiverWallet: '',
      receiverName: '',
      currency: '',
      amount: 0,
      senderWallets: [],
      allWallets: [], // All wallets in the system
      validationErrors: {
        senderWallet: '',
        receiverWallet: '',
        amount: '',
      },
    };
  },
  watch: {
    senderWallet(value) {
      if (!value) {
        this.validationErrors.senderWallet = 'Sender Wallet is required.';
      } else {
        this.validationErrors.senderWallet = '';
      }
    },
    receiverWallet(value) {
      if (!value) {
        this.validationErrors.receiverWallet = 'Sender Wallet is required.';
      } else {
        this.validationErrors.receiverWallet = '';
      }
    },
    amount(value) {
      if (!value) {
        this.validationErrors.amount = 'Amount is required, Should be greater 0';
      } else {
        this.validationErrors.amount = '';
      }
    },
  },
  computed: {
    filteredReceiverWallets() {
      return this.allWallets.filter(
        (wallet) => wallet.walletNumber !== this.senderWallet
      );
    },
    filteredSenderWallets() {
      return this.senderWallets.filter(
        (wallet) => wallet.walletNumber !== this.receiverWallet
      );
    },
  },
  async mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in again');
      window.location.href = '/signin';
    } else {
      await this.fetchWallets();
    }
  },
  methods: {
    async fetchWallets() {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      try {
        const userWalletsResponse = await appClient.get(`/wallet/${userId}`);
        const allWalletsResponse = await appClient.get(`/wallet/all`);
        this.senderWallets = userWalletsResponse.data;
        this.allWallets = allWalletsResponse.data;
      } catch (error) {
        window.alert(error.response.data.message)
      }
    },
    async fetchReceiverName() {
      const selectedWallet = this.allWallets.find(
        (wallet) => wallet.walletNumber === this.receiverWallet
      );
      this.receiverName = selectedWallet ? selectedWallet.name : '';
      this.currency = selectedWallet ? selectedWallet.currency : '';
    },
    validateAndSendMoney() {
      this.validationErrors = {
        senderWallet: '',
        receiverWallet: '',
        amount: '',
      };

      let isValid = true;

      if (!this.senderWallet) {
        this.validationErrors.senderWallet = 'Sender Wallet is required.';
        isValid = false;
      }
      if (!this.receiverWallet) {
        this.validationErrors.receiverWallet = 'Recipient Wallet is required.';
        isValid = false;
      }
      if (!this.amount) {
        this.validationErrors.amount = 'Amount is required.';
        isValid = false;
      } else if (isNaN(this.amount) || this.amount <= 0) {
        this.validationErrors.amount = 'Amount must be a positive number.';
        isValid = false;
      }

      if (isValid) {
        this.sendMoney();
      }
    },
    async sendMoney() {
      const token = localStorage.getItem('token');
      try {
        const response = await appClient.post(
          '/transactions/send',
          {
            senderWallet: this.senderWallet,
            receiverWallet: this.receiverWallet,
            amount: this.amount,
          }
        );
        alert('Money sent successfully');
        this.senderWallet = "";
        this.receiverWallet = "";
        this.amount = 0;
        this.currency = "";
        this.fetchWallets(); // Refresh wallet balances
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
.bg-primary {
  background-color: #0c0c0c;
}

.bg-secondary {
  background-color: #1c1c1c;
}

.bg-accent {
  background-color: #48a54c;
}
</style>
