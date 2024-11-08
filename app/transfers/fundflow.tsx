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
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import LoadingSpinner from '@/components/LoadingSpinner';
import CreditOptions from '@/components/CreditOptions';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useSelector } from 'react-redux';
import {
  Account,
  AccountState,
  ReceiverProp,
  TransactionState,
  UserState,
} from '@/constants/types';
import AccountDropdown from '@/components/Accounts/AccountDropdown';
import {
  joiOtherBanksValidationSchema,
  joiReceivingAccountSchema,
} from '@/hooks/validation';
import { router } from 'expo-router';
import axios from 'axios';
import useApi from '@/hooks/apiCalls';

const FundFlow = () => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amLoading, setAmLoading] = useState(false);
  const [narration, setNarration] = useState('');
  const [amount, setAmount] = useState('');
  const [logError, setLogError] = useState('');
  const [receivingAccount, setReceivingAccount] = useState('');
  const [receiverDetails, setReceiverDetails] = useState<ReceiverProp>({
    first_name: '',
    last_name: '',
  });

  const { makeTransferToFundFlowAccount, getFundFlowReceivingAccountName } =
    useApi();

  const [selectedAccountNumber, setSelectedAccountNumber] =
    useState<Account | null>(null);

  const {
    singleAccountCompletedTransactionsCount,
    singleAccountTotalTransactionsCount,
  } = useSelector(
    (state: { transaction: TransactionState }) => state.transaction
  );

  const { accountDetails } = useSelector(
    (state: { account: AccountState }) => state.account
  );

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const accountInfo = accountDetails.accounts.filter(
    (account) =>
      account.account_number === selectedAccountNumber?.account_number
  );

  const accounts = accountInfo[0];

  const accountData = { accounts };

  const dataToSend = {
    description: narration.trim(),
    receiving_account_number: receivingAccount.trim(),
    selected_account_number: selectedAccountNumber?.account_number || '',
    amount: amount.trim(),
    receiver_account_name: `${receiverDetails?.first_name} ${receiverDetails?.last_name}`,
  };

  console.log('receivedAccount:', receivingAccount);
  console.log('amount:', amount);
  console.log('narration:', narration);
  const formData = {
    amount: amount,
    narration: narration,
  };

  const data = {
    receiving_account: receivingAccount,
  };

  const getReceiverAccountName = async () => {
    try {
      setIsLoading(true);
      const { error } = joiReceivingAccountSchema.validate(data, {
        abortEarly: false,
      });

      if (error) {
        console.log(error);
        error.details.forEach((detail) => {
          console.log(detail.message);
          Alert.alert(detail.message);
        });
        return;
      }

      if (!selectedAccountNumber) {
        console.error('Please select the receiving bank');
      }

      if (!receivingAccount) {
        console.error('Please select the receiving account');
        Alert.alert('Please select the receiving account');
      }

      const response = await getFundFlowReceivingAccountName(receivingAccount);

      console.log(response);
      if (response) {
        setReceiverDetails({
          first_name: response?.receiverDetails?.first_name,
          last_name: response?.receiverDetails?.last_name,
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        setLogError(error.response.data.message.slice(0, 20));
        Alert.alert(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        Alert.alert('An error occurred:');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (receivingAccount.length === 10) {
      getReceiverAccountName();
    }
  }, [receivingAccount]);

  const handleSubmit = async () => {
    try {
      setAmLoading(true);
      const { error } = joiOtherBanksValidationSchema.validate(formData, {
        abortEarly: false,
      });

      if (error) {
        console.log(error);
        error.details.forEach((detail) => {
          console.log(detail.message);
          Alert.alert(detail.message);
        });
        return;
      }

      if (!selectedAccountNumber) {
        console.error('Please select the account to be debited');
        Alert.alert('Please select the account to be debited');
        return;
      }

      if (!amount) {
        Alert.alert('Please select transfer amount');
        return;
      }

      if (!receivingAccount) {
        Alert.alert('Please select receiving account number');
        return;
      }

      const response = await makeTransferToFundFlowAccount(dataToSend);

      if (response.status === 200 && response?.data?.success === true) {
        router.push('/');
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
      setAmLoading(false);
    }
  };

  const handleAmountChange = (text: string) => {
    setAmount(text);
  };

  const handleCreditedAccount = (text: string) => {
    setReceivingAccount(text);
  };

  const handleNarration = (text: string) => {
    setNarration(text);
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

            <View style={styles.otherInputFieldContainerStyle}>
              <Text style={styles.otherTextStyle}>Receiving Account</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.otherInputFieldStyle}
                placeholder="Enter account number..."
                value={receivingAccount}
                onChangeText={handleCreditedAccount}
              />
            </View>

            <View style={styles.accountNameContainerStyle}>
              <Text style={styles.accountNameStyle}>
                {isLoading ? (
                  <LoadingIndicator />
                ) : receiverDetails?.first_name ? (
                  `${receiverDetails?.first_name} ${receiverDetails?.last_name}`
                ) : logError ? (
                  logError
                ) : (
                  ''
                )}
              </Text>
            </View>

            <View style={styles.otherInputFieldContainerStyle}>
              <Text style={styles.otherTextStyle}>Narration</Text>
              <TextInput
                style={styles.otherInputFieldStyle}
                placeholder="Narration..."
                onChangeText={handleNarration}
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
                  {amLoading ? <LoadingIndicator /> : 'Transfer'}
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FundFlow;

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

  accountNameStyle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: -10,
    marginBottom: 10,
    marginLeft: -30,
    fontStyle: 'italic',
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
    display: 'flex',
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
    width: 100,
  },
  transferTextStyle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    alignSelf: 'center',
  },
});
