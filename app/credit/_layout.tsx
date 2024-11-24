import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const CreditLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="credit-account"
        options={{
          // headerShown: false,
          headerTitle: 'Deposit money into account',
        }}
      />
      <Stack.Screen
        name="paystack-web-view"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="verification-screen"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default CreditLayout;

const styles = StyleSheet.create({});
