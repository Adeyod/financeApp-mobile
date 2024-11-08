import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { formatDate } from '@/hooks/functions';
import { TransactionType } from '@/constants/types';
import { Colors } from '@/constants/Colors';

const SingleTransaction = ({ item }) => {
  return (
    <View>
      <TouchableOpacity style={styles.mainContainerStyle}>
        <View style={styles.detailsContainerStyle}>
          <Text style={styles.textStyle}>
            Account {item?.transaction_type}ed
          </Text>
          <Text style={styles.textStyle}>
            {formatDate(item?.transaction_date)}
          </Text>
        </View>
        <View style={styles.detailsContainerStyle}>
          <Text style={styles.textStyle}>{item?.amount}</Text>
          <Text style={styles.textStyle}>{item?.transaction_status}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SingleTransaction;

const styles = StyleSheet.create({
  mainContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF8E7',
  },
  detailsContainerStyle: {
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  textStyle: {
    color: Colors.colors.primary,
  },
});
