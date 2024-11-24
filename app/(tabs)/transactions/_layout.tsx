import { Stack } from 'expo-router';

const TransactionsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: 'My Transactions' }} />
      <Stack.Screen name="[id]" options={{}} />
    </Stack>
  );
};

export default TransactionsLayout;
