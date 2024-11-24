import { StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { UserState } from '@/constants/types';
import LoadingIndicator from '@/components/LoadingIndicator';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import HomeScreen from '../(tabs)';
import Welcome from '../auth/welcome';
import Login from '../auth/login';
import Register from '../auth/register';
import ForgotPassword from '../auth/forgot-password';
import ResetPassword from '../auth/reset-password';
import TabsLayout from '../(tabs)/_layout';
import TransferLayout from '../transfers/_layout';

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen
        // component={HomeScreen}
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        // component={Welcome}
        name="auth/welcome"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/register" />
      <Stack.Screen
        // component={ForgotPassword}
        name="auth/forgot-password"
      />
      <Stack.Screen
        options={
          {
            // headerShown: false,
          }
        }
        name="auth/email-verification"
      />
      <Stack.Screen name="auth/reset-password" />
      <Stack.Screen name="auth/new-reset-token" />
      <Stack.Screen name="auth/new-verification-token" />
      <Stack.Screen
        // component={TabsLayout}
        options={{
          headerShown: false,
        }}
        name="(tabs)"
      />

      <Stack.Screen
        // component={TransferLayout}
        name="transfers"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="credit"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
