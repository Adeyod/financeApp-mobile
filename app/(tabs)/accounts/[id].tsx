import {
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleAccountTransactionsSuccess } from '@/app/redux/transactionSlice';
import LoadingSpinner from '@/components/LoadingSpinner';
import useDebounce from '@/hooks/useDebounce';
import useApi from '@/hooks/apiCalls';
import {
  AccountState,
  TransactionState,
  TransactionType,
  UserState,
} from '@/constants/types';
import axios from 'axios';
import RefreshWrapper from '@/components/RefreshWrapper';
import Search from '@/components/Search';
import CreditOptions from '@/components/CreditOptions';
import { Colors } from '@/constants/Colors';
import HeaderRight from '@/components/Headers/HeaderRight';
import { MaterialIcons } from '@expo/vector-icons';
import SingleAccountTransactions from '@/components/Accounts/SingleAccountTransactions';

const Account = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  // const qu
  // console.log('ACCOUNT ID:', id);
  const { getUserSingleAccountTransactions } = useApi();

  const {
    singleAccountTransactionDetails,
    singleAccountCompletedTransactionsCount,
    singleAccountTotalTransactionsCount,
  } = useSelector(
    (state: { transaction: TransactionState }) => state.transaction
  );

  console.log('SINGLE:', singleAccountTransactionDetails);

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const { accountDetails } = useSelector(
    (state: { account: AccountState }) => state.account
  );

  const accountNumber = accountDetails?.accounts?.filter(
    (account) => account?.id === id
  );

  const [searchValue, setSearchValue] = useState('');
  console.log(
    'singleAccountTransactionDetails:',
    singleAccountTransactionDetails
  );
  const [page, setPage] = useState('1');
  const [limit, setLimit] = useState('10');

  const handleAccountFetch = async (searchValue: string) => {
    try {
      const response = await getUserSingleAccountTransactions(
        accountNumber[0].account_number,
        page,
        limit,
        searchValue
      );

      console.log('SINGLE ACCOUNT TRANSACTIONS:', response);

      if (response) {
        dispatch(getSingleAccountTransactionsSuccess(response));
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (debouncedSearchValue || page) {
      handleAccountFetch(debouncedSearchValue);
    }
  }, [debouncedSearchValue, page]);

  useEffect(() => {
    handleAccountFetch(searchValue);
  }, []);

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key === 'Enter') {
      handleAccountFetch(searchValue);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${accountNumber[0]?.account_number}`,
      headerTitleStyle: {
        color: 'white',
        fontStyle: 'italic',
      },
      headerStyle: {
        backgroundColor: Colors.colors.primary,
      },

      headerLeft: () => (
        <Pressable
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
          <Text
            style={{
              color: 'white',
              marginLeft: -4,
            }}
          >
            Back
          </Text>
        </Pressable>
      ),
      headerRight: () => {
        return (
          <HeaderRight profileImageUrl={currentUser?.profile_image?.url} />
        );
      },
    });
  });

  return (
    <>
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <RefreshWrapper>
          <View style={styles.accountMainContainer}>
            <View style={styles.searchContainerStyle}>
              <Search
                searchValue={searchValue}
                handleKeyPress={handleKeyPress}
                setSearchValue={setSearchValue}
              />
            </View>
            <ScrollView horizontal style={styles.scrollViewContainerStyle}>
              <CreditOptions
                singleAccountCompletedTransactionsCount={
                  singleAccountCompletedTransactionsCount
                }
                singleAccountTotalTransactionsCount={
                  singleAccountTotalTransactionsCount
                }
                accountInfo={{
                  accounts: accountNumber[0],
                }}
                selectedAccountNumber={accountNumber[0].account_number}
              />
            </ScrollView>

            <View>
              <Text>Account Details</Text>
              <SingleAccountTransactions
                singleAccountTransactionDetails={
                  singleAccountTransactionDetails
                }
              />
            </View>
          </View>
        </RefreshWrapper>
      )}
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  accountMainContainer: {
    paddingHorizontal: 15,
  },
  searchContainerStyle: {
    marginVertical: 20,
  },
  scrollViewContainerStyle: {
    backgroundColor: Colors.colors.secondary,
    borderRadius: 20,
    paddingLeft: 10,
  },
});
