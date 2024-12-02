import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const NotificationLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: 'My Notifications' }}
      />
      <Stack.Screen
        name="[id]"
        options={{ headerTitle: 'Notification details' }}
      />
    </Stack>
  );
};

export default NotificationLayout;

const styles = StyleSheet.create({});
