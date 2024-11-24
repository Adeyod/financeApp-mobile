import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const TransferLayout = () => {
  return (
    <Stack
      screenOptions={
        {
          // headerShown: false,
          // gestureEnabled: true, // Enable swipe gesture
          // animation: 'slide_from_right',
        }
      }
    >
      <Stack.Screen
        name="fundflow"
        options={{
          headerTitle: 'Fund Flow transfer',
        }}
      />
    </Stack>
  );
};

export default TransferLayout;
