import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactionDetails: [],
  singleTransactionDetails: [],
  totalTransactionsCount: null,
  singleAccountTransactionDetails: null,
  singleAccountCompletedTransactionsCount: null,
  singleAccountTotalTransactionsCount: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    getSingleTransactionSuccess(state, action) {
      state.singleTransactionDetails = action.payload;
    },

    getSingleAccountTransactionsSuccess(state, action) {
      const { transactions, completed_transactions, totalCount } =
        action.payload;
      // console.log('transactions:', transactions);
      // console.log('completed_transactions:', completed_transactions);
      // console.log('totalCount:', totalCount);
      state.singleAccountTransactionDetails = transactions;
      state.singleAccountCompletedTransactionsCount = completed_transactions;
      state.singleAccountTotalTransactionsCount = totalCount;

      // console.log('TRANSACTION SLICE:', state.singleAccountTransactionDetails);
      // console.log(
      //   'TRANSACTION SLICE:',
      //   state.singleAccountCompletedTransactionsCount
      // );
      // console.log(
      //   'TRANSACTION SLICE:',
      //   state.singleAccountTotalTransactionsCount
      // );
    },

    getTransactionsSuccess(state, action) {
      const transactionDetails = action.payload;
      console.log(transactionDetails.totalCount);

      state.transactionDetails = transactionDetails.transactions;
      state.totalTransactionsCount = transactionDetails.totalCount;
    },

    clearTransactions(state) {
      state.transactionDetails = [];
      state.totalTransactionsCount = null;
      state.singleAccountTransactionDetails = null;
      state.singleTransactionDetails = [];
      state.singleAccountCompletedTransactionsCount = null;
      state.singleAccountTotalTransactionsCount = null;
    },
  },
});

export const {
  getSingleTransactionSuccess,
  clearTransactions,
  getSingleAccountTransactionsSuccess,
  getTransactionsSuccess,
} = transactionSlice.actions;

export default transactionSlice.reducer;
