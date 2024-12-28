Dashboard vue

<template>
  <!-- Outer container: main background #0C0C0C -->
  <!-- Main content area -->
  <main class="!ml-[1px] row w-full flex justify-between item-center bg-transparent">
    <div
      class="col-8 flex flex-col gap-[30px] !pl-[45px] !pr-[22px] !pt-[43px] !pb-[21px] !rounded-[16px] bg-[rgba(28,28,28,0.5)]">
      <div class="row flex flex-wrap justify-between items-center  w-full">
        <ValueCard :card_title="firstCardTitle" :card_value="availableBalance" :card_image="firstCardImage" />
        <ValueCard :card_title="secondCardTitle" :card_value="incomingThisMonth" :card_image="SecondCardImage" />
        <ValueCard :card_title="thirdCardTitle" :card_value="expenseThisMonth" :card_image="firstCardImage" />
      </div>
      <div class="flex h-[439px] w-full p-4 w-full ">
        <div class="w-full rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-200">Line</span>
            <a href="#" class="text-sm text-gray-300 hover:underline">MORE</a>
          </div>
          <div class="h-full w-full">
            <canvas id="myChart"></canvas>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3 flex !rounded-[16px] flex-col justify-between  bg-[rgba(28,28,28,0.5)] !p-[30px] mr-[30px]">
      <div class="flex w-full flex-col gap-[20px]">
        <span class="text-lg font-medium font-['Inter']">My Wallets</span>
        <div class="flex flex-col gap-[21px]">
          <span v-for="wallet in wallets" :key="wallet.id">
            <WalletCard :wallet_name="wallet.name" :wallet_value="wallet.balance" :wallet_color="firstWalletCardColor"
              :wallet_currency="wallet.currency" />
          </span>
        </div>
      </div>
      <button @click="showAddWalletModal = true"
        class="bg-[#2B2B2B] rounded-xl flex justify-center items-center py-[10px] px-[51px] text-base font-medium font-['Inter']">
        Add New Wallet
      </button>
    </div>
    <div
      class="col-8 !mt-[30px] flex !pt-[29px] !pl-[41px] !pb-[33px] !pr-[76px]  !rounded-[16px] bg-[rgba(28,28,28,0.5)]">
      <div class="flex w-full flex-col gap-[22px] overflow-x-scroll ">
        <span class="text-lg font-medium font-['Inter']">Recent Transactions</span>
        <table class="w-full table-auto">
          <thead>
            <tr class="text-[#878787] text-sm font-medium font-['Inter'] no-underline">
              <th class="text-left py-2 pr-4 pl-2">Name</th>
              <th class="text-left py-2 pr-4">Balance</th>
              <th class="text-left py-2 pr-4">Date</th>
              <th class="text-left py-2 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in recentTransactions" :key="transaction.id" class="border-b border-gray-600">
              <td class="mt-2 py-3 pr-4 flex items-center justify-start space-x-2">
                <div
                  :class="`flex justify-center items-center w-[31px] h-[31px] rounded-full ${transaction.status === 'Inbound' ? 'bg-green-400' : 'bg-orange-500'}`">
                  <img src="/svg-icons/user-icon.svg" style="width: 14px; height: 14px;" />
                </div>
                <span>{{ transaction.receiverObj.name }}</span>
              </td>
              <td class="py-3 pr-4">{{ getCurrencySymbol(transaction.receiver_currency) }} {{ transaction.amount }}</td>
              <td class="py-3 pr-4">{{ formatDate(transaction.createdAt) }}</td>
              <td class="py-3 pr-4">
                <span :class="{
                  'bg-green-600 text-white': transaction.status.includes('Inbound'),
                  'bg-orange-600 text-white': transaction.status.includes('Outbound'),
                }" class="inline-block text-xs px-2 py-1 rounded">
                  {{ transaction.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Add Wallet Modal -->
    <div v-if="showAddWalletModal" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div class="p-6 rounded-lg bg-[rgba(28,28,28,1)] w-96">
        <h3 class="text-xl font-semibold mb-4">Add New Wallet</h3>

        <div class="mb-4">
          <label class="block text-sm mb-2">Wallet Name</label>
          <input v-model="newWalletName" type="text" class="w-full p-2 rounded bg-black text-white" />
          <p v-if="validationErrors.name" class="text-red-500 text-sm">{{ validationErrors.name }}</p>
        </div>

        <div class="mb-4">
          <label class="block text-sm mb-2">Wallet Number</label>
          <input v-model="newWalletNumber" type="text" class="w-full p-2 rounded bg-black text-white" />
          <p v-if="validationErrors.number" class="text-red-500 text-sm">{{ validationErrors.number }}</p>
        </div>

        <div class="mb-4">
          <label class="block text-sm mb-2">Currency</label>
          <select v-model="newWalletCurrency" class="w-full p-2 bg-black rounded text-white">
            <option v-for="currency in currencies" :key="currency.id" :value="currency.code">{{ currency.code }}
            </option>
          </select>
          <p v-if="validationErrors.currency" class="text-red-500 text-sm">{{ validationErrors.currency }}</p>
        </div>

        <div class="mb-4">
          <label class="block text-sm mb-2">Initial Balance</label>
          <input v-model="newWalletBalance" type="number" class="w-full p-2 rounded bg-black text-white" />
          <p v-if="validationErrors.balance" class="text-red-500 text-sm">{{ validationErrors.balance }}</p>
        </div>

        <div class="flex justify-end space-x-4">
          <button class="bg-gray-700 text-white py-2 px-4 rounded" @click="cancelAddWallet">Cancel</button>
          <button class="bg-gradient-to-br from-green-500 to-blue-700 text-white py-2 px-4 rounded"
            @click="validateAndAddWallet">
            Add Wallet
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import ValueCard from '@/components/dashboard/value-cards.vue';
import WalletCard from '@/components/dashboard/wallet-cards.vue';
import { currencies } from '@/constants/currencies';  // Adjust the path according to your project structure
import moment from 'moment';
import appClient from '@/config'
import { jwtDecode } from 'jwt-decode';

export default {
  components: {
    ValueCard,
    WalletCard,
  },
  data() {
    return {
      currencies,
      firstCardTitle: "Available Balance",
      secondCardTitle: "Incoming This Month",
      thirdCardTitle: "Expense This Month",
      firstCardImage: '/svg-icons/money-icon.svg',
      SecondCardImage: '/svg-icons/income-icon.svg',
      firstWalletCardColor: '#F7931A',
      availableBalance: 0,
      incomingThisMonth: 0,
      expenseThisMonth: 0,
      wallets: [],
      recentTransactions: [],
      showAddWalletModal: false,
      newWalletNumber: '',
      newWalletCurrency: 'USD',
      newWalletName: '',
      newWalletBalance: 0,
      chartData: [],
      validationErrors: {
        name: '',
        number: '',
        currency: '',
        balance: '',
      },
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    let isAdmin = false;
    if (token) {
      const decodedToken = jwtDecode(token);
      isAdmin = decodedToken.role == 'admin' || decodedToken.role == 'Admin';
    }
    if (!token) {
      alert('Please log in again');
      window.location.href = '/signin';
    } else if (isAdmin) {
      window.location.href = '/transactions';
    } else {
      this.fetchWallets();
      this.fetchRecentTransactions();
    }
  },
  methods: {
    getCurrencySymbol(currencyCode) {
      const currency = this.currencies.find((c) => c.code === currencyCode);
      return currency ? currency.symbol : ''; // Return symbol if found, else empty string
    },
    formatDate(date, format = 'YYYY-MM-DD') {
      return moment(date).format(format);
    },
    async fetchWallets() {
      try {
        const userId = localStorage.getItem('userId'); // Replace with logged-in user ID
        const response = await appClient.get(`/wallet/${userId}`);
        const walletsData = response.data;
        this.wallets = walletsData;
        // Calculate total available balance
        this.availableBalance = walletsData.reduce(
          (total, wallet) => total + wallet.balance,
          0
        );
      } catch (error) {
        alert(error?.response?.data?.message);
        this.availableBalance = 0;
      }
    },
    async fetchRecentTransactions() {
      try {
        const userId = localStorage.getItem('userId'); // Replace with logged-in user ID
        const response = await appClient.get(`/transactions/overview`);
        const data = response.data;
        this.recentTransactions = data.recentTransactions;
        this.incomingThisMonth = data.totalIncome;
        this.expenseThisMonth = data.totalExpense;
        this.chartData = data.activityChart;
        this.renderChart();
      } catch (error) {
        alert(error?.response?.data?.message);
        this.incomingThisMonth = 0;
        this.expenseThisMonth = 0;
      }
    },
    validateAndAddWallet() {
      this.validationErrors = {
        name: '',
        number: '',
        currency: '',
        balance: '',
      };
      let isValid = true;

      if (!this.newWalletName) {
        this.validationErrors.name = 'Wallet Name is required.';
        isValid = false;
      }
      if (!this.newWalletNumber) {
        this.validationErrors.number = 'Wallet Number is required.';
        isValid = false;
      }
      if (!this.newWalletCurrency) {
        this.validationErrors.currency = 'Currency is required.';
        isValid = false;
      }
      if (!this.newWalletBalance) {
        this.validationErrors.balance = 'Initial Balance is required.';
        isValid = false;
      } else if (isNaN(this.newWalletBalance) || this.newWalletBalance < 0) {
        this.validationErrors.balance = 'Initial Balance must be a positive number.';
        isValid = false;
      }

      if (isValid) {
        this.addWallet();
      }
    },
    async addWallet() {
      try {
        const userId = localStorage.getItem('userId'); // Replace with logged-in user ID
        const response = await appClient.post('/wallet/create', {
          userId,
          name: this.newWalletName,
          walletNumber: this.newWalletNumber, // Ensure this matches the backend's key
          balance: this.newWalletBalance, // Ensure this matches the backend's key
          currency: this.newWalletCurrency,
        });
        const newWallet = response.data;
        // Add wallet to the local list
        this.wallets.push(newWallet);
        this.availableBalance += newWallet.balance;

        // Close modal and reset form
        this.showAddWalletModal = false;
        this.newWalletNumber = '';
        this.newWalletBalance = 0;
        this.newWalletName = '';
        this.newWalletCurrency = 'USD';

        alert('Wallet added successfully');
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    renderChart() {
      const ctx = document.getElementById('myChart');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.chartData?.labels || [],
          datasets: [
            {
              label: 'Expense',
              data: this.chartData?.expenses || [],
              borderColor: '#64CAFF',
              backgroundColor: 'rgba(100,202,255,0.10)',
              tension: 0.3,
              fill: true,
            },
            {
              label: 'Incoming',
              data: this.chartData?.incomes || [],
              borderColor: '#5FF098',
              backgroundColor: 'rgba(95,240,152,0.10)',
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: '#FFF' },
              grid: { color: 'rgba(255,255,255,0.1)' },
            },
            x: {
              ticks: { color: '#FFF' },
              grid: { display: false },
            },
          },
          plugins: {
            legend: {
              labels: { color: '#FFF' },
            },
          },
        },
      });
    },
    cancelAddWallet() {
      this.showAddWalletModal = false;
      this.newWalletName = '';
      this.newWalletNumber = '';
      this.newWalletCurrency = 'USD';
      this.newWalletBalance = 0;
      this.validationErrors = {
        name: '',
        number: '',
        currency: '',
        balance: '',
      };
    },
  },
};
</script>
