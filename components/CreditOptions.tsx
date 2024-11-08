import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

type CreditOptionsType = {
  accountInfo: {
    accounts: {
      id: string;
      user_id: string;
      account_number: string;
      balance: string;
      is_default: boolean;
      created_at: string;
      updated_at: string;
    };
  };
  selectedAccountNumber: string;
  singleAccountCompletedTransactionsCount: number;
  singleAccountTotalTransactionsCount: number;
};

const CreditOptions = ({
  singleAccountCompletedTransactionsCount,
  singleAccountTotalTransactionsCount,
  accountInfo,
  selectedAccountNumber,
}: CreditOptionsType) => {
  return (
    <View style={styles.creditOptionMainContainerStyle}>
      <View style={styles.textContainerStyle}>
        <Text style={styles.textStyle}>Balance</Text>
        <Text style={styles.textValueStyle}>
          {accountInfo?.accounts?.balance && selectedAccountNumber
            ? accountInfo?.accounts?.balance
            : `#0`}
        </Text>
      </View>

      <View style={styles.textContainerStyle}>
        <Text style={styles.textStyle}>Total Transactions</Text>
        <Text style={styles.textValueStyle}>
          {singleAccountTotalTransactionsCount && selectedAccountNumber
            ? singleAccountTotalTransactionsCount
            : 0}
        </Text>
      </View>

      <View style={styles.textContainerStyle}>
        <Text style={styles.textStyle}>Completed Transaction</Text>
        <Text style={styles.textValueStyle}>
          {singleAccountCompletedTransactionsCount && selectedAccountNumber
            ? singleAccountCompletedTransactionsCount
            : 0}
        </Text>
      </View>
    </View>
  );
};

export default CreditOptions;

const styles = StyleSheet.create({
  creditOptionMainContainerStyle: {
    display: 'flex',
    paddingRight: 60,

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
