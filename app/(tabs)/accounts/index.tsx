import useApi from '@/hooks/apiCalls';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Account, AccountState, UserState } from '@/constants/types';
import { getAccountsSuccess } from '@/app/redux/accountSlice';
import RefreshWrapper from '@/components/RefreshWrapper';
import AccountCard from '@/components/AccountCard';
import { Colors } from '@/constants/Colors';
import LoadingSpinner from '@/components/LoadingSpinner';
import axios from 'axios';
import LoadingIndicator from '@/components/LoadingIndicator';

const accounts = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getUserAccounts, createNewAccountNumber } = useApi();

  const [accounts, setAccounts] = useState<Account[]>([]);

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const { accountDetails } = useSelector(
    (state: { account: AccountState }) => state.account
  );

  const findUserAccounts = async () => {
    try {
      setLoading(true);
      const { data } = await getUserAccounts();
      if (data) {
        Alert.alert(data.message);
        dispatch(getAccountsSuccess(data));
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountCreation = async () => {
    try {
      setIsLoading(true);
      const response = await createNewAccountNumber();

      if (response) {
        Alert.alert(response?.data?.message);
        const userAccounts = await getUserAccounts();
        dispatch(getAccountsSuccess(userAccounts?.data));
        return;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        Alert.alert(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        Alert.alert('An error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    findUserAccounts();
  }, []);

  useEffect(() => {
    setAccounts(accountDetails?.accounts || []);
  }, [accountDetails]);

  return (
    <RefreshWrapper>
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <View
          style={{
            marginTop: 40,
          }}
        >
          <Text style={styles.upperTextStyle}>
            Hello, {currentUser?.first_name} you are welcome back
          </Text>
          <Text style={styles.upperTextStyle}>
            You can create a maximum of 5 accounts
          </Text>
          <Pressable
            onPress={handleAccountCreation}
            disabled={accountDetails?.accounts?.length === 5}
            style={{
              width: 150,
            }}
          >
            <Text
              style={{
                backgroundColor:
                  accountDetails?.accounts?.length === 5
                    ? 'gray'
                    : Colors.colors.secondary,
                marginVertical: 20,
                color: 'white',
                textTransform: 'uppercase',
                fontStyle: 'italic',
                padding: 10,
                fontWeight: 'bold',
                marginLeft: 15,
              }}
            >
              {isLoading ? (
                <LoadingIndicator />
              ) : accountDetails?.accounts?.length === 5 ? (
                'Max account'
              ) : (
                'create account'
              )}
            </Text>
          </Pressable>

          <View style={styles.header}>
            <Text style={[styles.th, { marginLeft: -20 }]}>Account number</Text>
            <Text style={[styles.th, { marginLeft: -30 }]}>Balance</Text>
            <Text style={styles.th}>Details</Text>
          </View>

          <FlatList
            data={accountDetails?.accounts}
            renderItem={({ item, index }) => (
              <AccountCard
                style={[styles.body]}
                accountInfo={item}
                key={index}
              />
            )}
          />
        </View>
      )}
    </RefreshWrapper>
  );
};

export default accounts;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 40,
  },
  body: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    gap: 20,
    marginVertical: 10,
  },
  th: {
    color: 'black',
    fontSize: 16,
    fontStyle: 'italic',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  upperTextStyle: {
    fontSize: 20,
    fontStyle: 'italic',
    paddingHorizontal: 15,
  },
});
