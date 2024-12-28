<template>
  <div class="p-6 bg-[rgba(28,28,28,0.5)] !rounded-[16px] text-white">
    <h2 class="text-2xl font-bold mb-4">Transaction History</h2>

    <!-- Filters -->
    <div class="row flex items-end mb-4">
      <div class="col-3 flex flex-col gap-1">
        Status
        <select placeholder="Status" v-model="filters.status" class=" p-2 bg-black rounded bg-primary text-white">
          <option v-for="status in transactionsStatuses" :key="status" :value="status">{{ status }}
          </option>
        </select>
      </div>
      <!-- <input v-model="filters.status" type="text" class="p-2 rounded bg-black text-white custom-date-icon"
        placeholder="Status" /> -->
      <div class="col-3 flex flex-col gap-1">
        Start Date
        <input v-model="filters.startDate" type="date" class="p-2 rounded bg-black text-white"
          placeholder="Start Date" />
      </div>
      <div class=" col-3 flex flex-col gap-1">
        End Date
        <input v-model="filters.endDate" type="date" class="p-2 rounded bg-black text-white custom-date-icon"
          placeholder="End Date" />
      </div>
      <button @click="fetchTransactions" :disabled="!filters.status && !filters.startDate && !filters.endDate"
        class="col-1 h-10 w-2 p-2 rounded ml-1 " :style="!filters.status && !filters.startDate && !filters.endDate
          ? 'background-color: gray; cursor: not-allowed;'
          : 'background: linear-gradient(to bottom right, #38a169, #3182ce);'">
        Filter
      </button>
      <button @click="resetFilters" :disabled="!filters.status && !filters.startDate && !filters.endDate"
        class="col-1 h-10 w-2 p-2 rounded ml-1 " :style="!filters.status && !filters.startDate && !filters.endDate
          ? 'background-color: gray; cursor: not-allowed;'
          : 'background: linear-gradient(to bottom right, #38a169, #3182ce);'">
        Reset
      </button>
    </div>

    <!-- Transaction Table -->
    <table v-if="transactions.length" class=" w-full table-auto">
      <thead class="w-full">
        <tr
          class="text-[#878787] text-sm font-medium font-['Inter'] no-underline  border-b border-solid border-grey p-1 rounded">
          <th class="text-left p-2">Transaction ID</th>
          <th class="text-left p-2">Recipient Name</th>
          <th class="text-left p-2">Recipient Wallet</th>
          <th class="text-left p-2">Status</th>
          <th class="text-right p-2">Amount</th>
          <th class="text-right p-2">Fees</th>
          <th class="text-right p-2">Total</th>
          <th class="text-left p-2">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id" class="border-b border-gray-700">
          <td class="p-2">{{ transaction.id }}</td>
          <td class="p-2">{{ transaction.receiver.name }}</td>
          <td class="p-2">{{ transaction.receiverWallet }}</td>
          <td class="p-2">
            <select v-model="transaction.status" @change="updateTransactionStatus(transaction.id, transaction.status)"
              class="bg-black border-none text-white">
              <option v-for="status in transactionsStatuses" :key="status" :value="status">{{ status }}
              </option>
            </select>
          </td>
          <td class="p-2 text-right ">{{ transaction.amount }}</td>
          <td class="p-2 text-right ">{{ transaction.fee }}</td>
          <td class="p-2 text-right ">{{ transaction.total }}</td>
          <td class="p-2 text-right ">{{ new Date(transaction.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="w-full flex justify-center items-center" v-if="!transactions.length">
      No Data Found
    </div>

    <!-- Pagination -->
    <div class="flex justify-between mt-6">
      <button :disabled="page === 1" @click="page-- && fetchTransactions"
        class="px-4 py-2  rounded disabled:text-gray-500 !disabled:text-white  disabled:cursor-not-allowed">
        Previous
      </button>
      <button :disabled="page === totalPages" @click="page++ && fetchTransactions"
        class=" px-4 py-2 rounded disabled:text-gray-500 !disabled:text-white  disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { transactionsStatuses } from '@/constants/transaction-statuses'
import apiClient from "@/config"
export default {
  data() {
    return {
      transactionsStatuses,
      transactions: [],
      filters: {
        status: '',
        startDate: '',
        endDate: '',
      },
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  },
  methods: {
    async fetchTransactions() {
      try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get(`/transactions?page=${this.page}&limit=${this.limit}&status=${this.filters.status}&startDate=${this.filters.startDate}&endDate=${this.filters.endDate}`);
        const data = response.data;
        this.transactions = data.transactions;
        this.totalPages = data.pages;
      } catch (error) {
        alert(error.response.data.message)
      }
    },
    async resetFilters() {
      try {
        this.filters.status = "";
        this.filters.startDate = "";
        this.filters.endDate = "";
        const token = localStorage.getItem('token');
        const response = await apiClient.get(`/transactions?page=${1}&limit=${10}`);
        const data = response.data;
        this.transactions = data.transactions;
        this.totalPages = data.pages;
      } catch (error) {
        alert(error.response.data.message)
      }
    },
    async updateTransactionStatus(id, status) {
      try {
        const token = localStorage.getItem('token');
        const response = await apiClient.patch(`/transactions/${id}/status`, { status: status, });
        if (response) {
          window.alert(response.data.message)
        }
      } catch (error) {
        alert(error.response.data.message)
      }
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in again');
      window.location.href = '/signin';
    } else {
      this.fetchTransactions();
    }
  },
};
</script>
