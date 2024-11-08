import { router, Stack } from 'expo-router';
import { Pressable, Text } from 'react-native';

const AccountsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Accounts',
          headerShown: true,
        }}
      />
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default AccountsLayout;

/*

app/
├── _layout.js
├── index.js
├── (tabs)/
│   ├── _layout.js
│   ├── home.js
│   ├── accounts/
│   │   └── [id].js

│   ├── settings.js
│   └── profile.js
├── auth/
│   ├── login.js
│   ├── register.js
│   ├── forgot-password.js
│   └── reset-password.js
└── transfers/
    ├── _layout.js
    └── fundflow.js
*/
