import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import CreditOptions from '@/components/CreditOptions';
import { Account, AccountState, TransactionState } from '@/constants/types';
import { useSelector } from 'react-redux';
import AccountDropdown from '@/components/Accounts/AccountDropdown';
import LoadingIndicator from '@/components/LoadingIndicator';
import { Colors } from '@/constants/Colors';
import LoadingSpinner from '@/components/LoadingSpinner';
import axios from 'axios';
import useApi from '@/hooks/apiCalls';

const CreditAccount = () => {
  const [loading, setLoading] = useState(false);
  const [amLoading, setAmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');

  const { creditUserAccount } = useApi();

  const [selectedAccountNumber, setSelectedAccountNumber] =
    useState<Account | null>(null);
  const {
    singleAccountTransactionDetails,
    singleAccountCompletedTransactionsCount,
    singleAccountTotalTransactionsCount,
  } = useSelector(
    (state: { transaction: TransactionState }) => state.transaction
  );

  const { accountDetails } = useSelector(
    (state: { account: AccountState }) => state.account
  );

  const accountInfo = accountDetails.accounts.filter(
    (account) =>
      account.account_number === selectedAccountNumber?.account_number
  );

  const accounts = accountInfo[0];

  const accountData = { accounts };

  const handleAmountChange = (text: string) => {
    setAmount(text);
  };

  const handleSubmit = async () => {
    const account_number = selectedAccountNumber?.account_number;

    if (!account_number) {
      return null;
    }
    try {
      setLoading(true);
      const result = await creditUserAccount(account_number, amount);
      console.log(result);
      if (result && result?.data?.data?.authorization_url) {
        console.log(result.data?.data?.authorization_url);

        setAmount('');
        setSelectedAccountNumber(null);

        window.location.href = result.data?.data?.authorization_url;

        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        Alert.alert(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        Alert.alert('An error occurred:');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {loading ? (
          <LoadingSpinner loading={loading} />
        ) : (
          <View style={styles.mainContainer}>
            <View
              style={{
                backgroundColor: Colors.colors.secondary,
                borderRadius: 20,
                paddingHorizontal: 15,
                marginVertical: 40,
              }}
            >
              <CreditOptions
                singleAccountCompletedTransactionsCount={
                  singleAccountCompletedTransactionsCount
                }
                singleAccountTotalTransactionsCount={
                  singleAccountTotalTransactionsCount
                }
                accountInfo={accountData}
                selectedAccountNumber={
                  selectedAccountNumber?.account_number || ''
                }
              />
            </View>

            <View style={styles.selectedAccountNumberContainerStyle}>
              <AccountDropdown
                setSelectedAccountNumber={setSelectedAccountNumber}
                accountDetails={accountDetails.accounts}
              />

              <TextInput
                editable={false}
                style={styles.selectedAccountNumberInputFieldStyle}
              >
                {selectedAccountNumber && selectedAccountNumber.account_number}
              </TextInput>
            </View>

            <View style={styles.otherInputFieldContainerStyle}>
              <Text style={styles.otherTextStyle}>Amount</Text>
              <TextInput
                style={styles.otherInputFieldStyle}
                placeholder="Enter amount..."
                onChangeText={handleAmountChange}
                keyboardType="numeric"
              />
            </View>

            <View
              style={[
                styles.transferButtonContainerStyle,
                styles.buttonLoadingStyle,
              ]}
            >
              <Pressable
                onPress={handleSubmit}
                style={styles.transferButtonStyle}
              >
                <Text style={styles.transferTextStyle}>
                  {amLoading ? <LoadingIndicator /> : 'Credit Account'}
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreditAccount;

const styles = StyleSheet.create({
  scrollViewContainer: {},
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedAccountNumberContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    marginLeft: -50,
  },

  selectedAccountNumberInputFieldStyle: {
    borderWidth: 1,
    borderRadius: 5,
    width: 220,
    height: 50,
    paddingLeft: 10,
    color: 'black',
  },

  otherInputFieldContainerStyle: {
    display: 'flex',
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginVertical: 10,
  },
  accountNameContainerStyle: {
    display: 'flex',
    alignSelf: 'flex-start',
    marginLeft: 60,
    marginBottom: -10,
  },

  otherInputFieldStyle: {
    borderWidth: 1,
    height: 40,
    width: 300,
    borderRadius: 5,
    paddingLeft: 10,
  },
  otherTextStyle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  transferButtonContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  buttonLoadingStyle: {
    display: 'flex',
    paddingHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  transferButtonStyle: {
    backgroundColor: Colors.colors.primary,
    padding: 10,
    borderRadius: 10,
    width: 150,
  },
  transferTextStyle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
  },
});
