import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SingleTransactionProp } from '@/constants/types';
import SingleTransaction from './SingleTransaction';

const SingleAccountTransactions = ({
  singleAccountTransactionDetails,
}: SingleTransactionProp) => {
  return (
    <View>
      {singleAccountTransactionDetails?.map((trx, index) => (
        <FlatList
          data={singleAccountTransactionDetails}
          renderItem={({ item, index }) => (
            <SingleTransaction transaction={item} key={index} />
          )}
        />
      ))}
    </View>
  );
};

export default SingleAccountTransactions;

const styles = StyleSheet.create({});
