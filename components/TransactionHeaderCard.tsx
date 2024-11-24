import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { TransactionType, TransactionObject } from '@/constants/types';

// type CreditOptionsType = {
//   accountInfo: {
//     accounts: {
//       id: string;
//       user_id: string;
//       account_number: string;
//       balance: string;
//       is_default: boolean;
//       created_at: string;
//       updated_at: string;
//     };
//   };
//   selectedAccountNumber: string;
//   singleAccountCompletedTransactionsCount: number;
//   singleAccountTotalTransactionsCount: number;
// };

const TransactionOptions = ({
  totalTransactionsCount,
  transactions,
}: TransactionObject) => {
  const totalAmount = transactions.reduce(
    (amt: number, transaction: TransactionType) => {
      const total = amt + parseFloat(transaction.amount);
      return total;
    },
    0
  );

  const totalCompletedTransactions = transactions?.filter(
    (transaction) => transaction.transaction_status === 'completed'
  ).length;

  return (
    <View style={styles.creditOptionMainContainerStyle}>
      <View style={styles.textContainerStyle}>
        <Text style={styles.textStyle}>Total Amount</Text>
        <Text style={styles.textValueStyle}>
          {totalAmount ? totalAmount : `#0`}
        </Text>
      </View>

      <View style={styles.textContainerStyle}>
        <Text style={styles.textStyle}>Total Transactions</Text>
        <Text style={styles.textValueStyle}>
          {totalTransactionsCount ? totalTransactionsCount : 0}
        </Text>
      </View>

      <View style={styles.textContainerStyle}>
        <Text style={styles.textStyle}>Completed Transactions</Text>
        <Text style={styles.textValueStyle}>
          {totalCompletedTransactions ? totalCompletedTransactions : 0}
        </Text>
      </View>
    </View>
  );
};

export default TransactionOptions;

const styles = StyleSheet.create({
  secondContainerStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.colors.secondary,
    paddingVertical: 30,
  },
  creditOptionMainContainerStyle: {
    display: 'flex',
    paddingHorizontal: 15,
    marginHorizontal: 25,
    marginVertical: 15,
    borderRadius: 10,
    paddingRight: 60,
    backgroundColor: Colors.colors.secondary,
    paddingVertical: 40,
    gap: 15,
  },
  textContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
    fontStyle: 'italic',
  },
  textValueStyle: {
    color: 'white',
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderColor: 'white',
  },
});
