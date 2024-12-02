import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { formatDate } from '@/hooks/functions';
import { SingleTransactionProps } from '@/constants/types';
import { Colors } from '@/constants/Colors';
import { Link, router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const SingleTransaction = ({ transaction }: SingleTransactionProps) => {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable style={styles.mainContainerStyle}>
        <Link href={`/(tabs)/transactions/${transaction?.id}`}>
          <View style={styles.detailsContainerStyle}>
            <Text style={styles.textStyle}>
              Account {transaction?.transaction_type}ed
            </Text>
            <Text style={styles.textStyle}>
              {formatDate(new Date(transaction?.transaction_date))}
            </Text>
          </View>
        </Link>
        <Link href={`/(tabs)/transactions/${transaction?.id}`}>
          <View style={styles.detailsContainerStyle}>
            <Text style={styles.textStyle}>{transaction?.amount}</Text>
            <Text style={styles.textStyle}>
              {transaction?.transaction_status}
            </Text>
          </View>
        </Link>
      </Pressable>
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
    marginHorizontal: 20,
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
