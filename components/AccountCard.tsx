import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { formattedNumber } from '@/hooks/functions';
import { Account } from '@/constants/types';

type AccountCardType = {
  accountInfo: Account;
  style?: StyleProp<ViewStyle>;
};

const AccountCard = ({ accountInfo, style }: AccountCardType) => {
  return (
    <View style={style}>
      <Text>
        {accountInfo?.account_number}

        {accountInfo?.is_default === true && (
          <Text
            style={{
              marginLeft: 10,
              fontSize: 13,
            }}
          >
            (Pry)
          </Text>
        )}
      </Text>
      <Text>{formattedNumber(Number(accountInfo?.balance))}</Text>
      <Link
        style={{
          color: 'blue',
          textDecorationLine: 'underline',
        }}
        href={`/(tabs)/accounts/${accountInfo?.id}`}
      >
        View Details
      </Link>
    </View>
  );
};

export default AccountCard;

const styles = StyleSheet.create({});
