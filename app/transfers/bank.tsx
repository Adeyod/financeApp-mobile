import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import AccountDropdown from '@/components/Accounts/AccountDropdown';
import { useDispatch, useSelector } from 'react-redux';
import {
  Account,
  AccountState,
  BankProps,
  ReceiverInfo,
  TransactionState,
  UserState,
} from '@/constants/types';
import axios from 'axios';
import useApi from '@/hooks/apiCalls';
import {
  joiOtherBanksValidationSchema,
  joiReceivingAccountSchema,
} from '@/hooks/validation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { router, useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import BankDropdown from '@/components/Accounts/BankDropdown';
import LoadingIndicator from '@/components/LoadingIndicator';
import CreditOptions from '@/components/CreditOptions';
import { getSingleAccountTransactionsSuccess } from '../redux/transactionSlice';
import { getSingleAccountSuccess } from '../redux/accountSlice';
import HeaderRight from '@/components/Headers/HeaderRight';

const BankTransfer = () => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amLoading, setAmLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [banks, setBanks] = useState<BankProps[]>([]);
  const [selectedAccountNumber, setSelectedAccountNumber] =
    useState<Account | null>(null);
  const [receivingAccount, setReceivingAccount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const [amount, setAmount] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [narration, setNarration] = useState('');
  const [logError, setLogError] = useState('');
  const [receiverDetails, setReceiverDetails] = useState<ReceiverInfo>({
    account_number: '',
    account_name: '',
    bank_code: '',
  });

  const dataToSend = {
    narration: narration,
    bankCode: bankCode,
    receiving_account: receivingAccount,
    selectedAccountNumber: selectedAccountNumber?.account_number || '',
    amount: amount,
    receiverDetails: receiverDetails,
  };

  const data = {
    receiving_account: receivingAccount,
  };
  const formData = {
    amount: amount,
    narration: narration,
  };

  const {
    getUserSingleAccountDetailsByAccountNumber,
    fetBankDetails,
    getAccountName,
    makeTransferToOtherBank,
    getUserSingleAccountTransactionsWithoutQuery,
  } = useApi();

  const { accountDetails } = useSelector(
    (state: { account: AccountState }) => state.account
  );

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  // console.log('banks accountDetails:', accountDetails);
  const accountInfo = accountDetails.accounts.filter(
    (account) =>
      account.account_number === selectedAccountNumber?.account_number
  );

  const accounts = accountInfo[0];

  const accountData = { accounts };

  // console.log('banks:', accountData);

  const {
    singleAccountCompletedTransactionsCount,
    singleAccountTotalTransactionsCount,
  } = useSelector(
    (state: { transaction: TransactionState }) => state.transaction
  );

  const getBankNames = async () => {
    try {
      setLoading(true);
      const result = await fetBankDetails();
      setBanks(result.banks);
      return;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        Alert.alert(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        Alert.alert('An error occured');
      }
    } finally {
      setLoading(false);
    }
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

      if (!selectedBank) {
        console.error('Please select the receiving bank');
      }

      if (!receivingAccount) {
        console.error('Please select the receiving account');
        Alert.alert('Please select the receiving account');
      }

      console.log('BANK:', banks);
      console.log('selectedBank:', selectedBank);

      const actualBankObj = banks.filter((bank) => bank.name === selectedBank);

      console.log('actualBankObj:', actualBankObj);

      if (!actualBankObj) {
        Alert.alert('Please select  a bank');
        return;
      }

      setBankCode(actualBankObj[0].code);

      setReceiverDetails((prevDetails) => ({
        ...prevDetails,
        bank_code: actualBankObj[0].code,
      }));

      const response = await getAccountName(
        receivingAccount,
        actualBankObj[0].code
      );

      if (response) {
        setReceiverDetails({
          ...receiverDetails,
          account_name: response.receiverDetails.account_name,
          account_number: response.receiverDetails.account_number,
        });
        console.log(receivingAccount);

        console.log(receiverDetails);
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        setLogError(error.response.data.message);
        Alert.alert(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        Alert.alert('An error occurred:');
      }
    } finally {
      setIsLoading(false);
    }
  };

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

      if (!selectedBank) {
        console.error('Please select the receiving bank');
        Alert.alert('Please select the receiving bank');
        return;
      }

      if (!receivingAccount) {
        console.error('Please select the receiving account');
        Alert.alert('Please select the receiving account');
        return;
      }

      const response = await makeTransferToOtherBank(dataToSend);

      if (response) {
        router.push('/');
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        Alert.alert(error.response.data.message);
        setLogError(error.response.data.message);
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

  const getAccountDetails = async () => {
    try {
      if (!selectedAccountNumber) {
        return;
      }

      const response = await getUserSingleAccountDetailsByAccountNumber(
        selectedAccountNumber.account_number
      );

      if (response) {
        dispatch(getSingleAccountSuccess(response));
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
    }
  };

  const getAllTransactions = async () => {
    try {
      setLoading(true);

      if (!selectedAccountNumber) {
        return;
      }
      const response = await getUserSingleAccountTransactionsWithoutQuery(
        selectedAccountNumber.account_number
      );

      if (response) {
        dispatch(getSingleAccountTransactionsSuccess(response));

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

  useEffect(() => {
    getAccountDetails();
    getAllTransactions();
  }, [selectedAccountNumber]);

  useEffect(() => {
    if (receivingAccount.length === 10 && selectedBank) {
      getReceiverAccountName();
    }
  }, [receivingAccount, selectedBank]);

  useEffect(() => {
    getBankNames();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight profileImageUrl={currentUser?.profile_image?.url} />
      ),
    });
  }, [navigation, currentUser]);

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

            <View style={styles.selectedAccountNumberContainerStyle}>
              <BankDropdown setSelectedBank={setSelectedBank} banks={banks} />

              <TextInput
                editable={false}
                style={styles.selectedAccountNumberInputFieldStyle}
              >
                {selectedBank && selectedBank}
              </TextInput>
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
              <Text>
                {isLoading ? (
                  <LoadingIndicator />
                ) : receiverDetails?.account_name ? (
                  receiverDetails?.account_name
                ) : logError ? (
                  logError
                ) : (
                  ''
                )}
              </Text>
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

export default BankTransfer;

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
    width: 100,
  },
  transferTextStyle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
  },
});
