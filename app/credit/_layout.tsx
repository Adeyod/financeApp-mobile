import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const CreditLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="creditaccount"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default CreditLayout;

const styles = StyleSheet.create({});
