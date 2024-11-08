import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, FontAwesome6, Entypo } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={24}
              color={focused ? Colors.colors.secondary : Colors.colors.primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="home"
                size={24}
                color={
                  focused ? Colors.colors.secondary : Colors.colors.primary
                }
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: (focused) => (
            <FontAwesome6
              name="naira-sign"
              size={24}
              color={focused ? Colors.colors.secondary : Colors.colors.primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          headerShown: false,
          tabBarLabel: 'Accounts',
          tabBarIcon: (focused) => (
            <Entypo
              name="wallet"
              size={24}
              color={focused ? Colors.colors.secondary : Colors.colors.primary}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
