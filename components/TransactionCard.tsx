import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { formattedNumber } from '@/hooks/functions';
import { TransactionType } from '@/constants/types';

type AccountCardType = {
  transactionInfo: TransactionType;
  style?: StyleProp<ViewStyle>;
};

const TransactionCard = ({ transactionInfo, style }: AccountCardType) => {
  return (
    <View style={style}>
      <Text>{transactionInfo?.account_number}</Text>
      <Text>{formattedNumber(Number(transactionInfo?.amount))}</Text>
      <Link
        style={{
          color: 'blue',
          textDecorationLine: 'underline',
        }}
        href={`/(tabs)/transactions/${transactionInfo?.id}`}
      >
        View Details
      </Link>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({});
