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
  const [isSearching, setIsSearching] = useState(false);
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  // const qu
  console.log('ACCOUNT ID:', id);
  const { getUserSingleAccountTransactions } = useApi();

  const {
    singleAccountTransactionDetails,
    singleAccountCompletedTransactionsCount,
    singleAccountTotalTransactionsCount,
  } = useSelector(
    (state: { transaction: TransactionState }) => state.transaction
  );

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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState('10');

  const totalPages = Math.ceil(
    singleAccountTotalTransactionsCount / Number(limit)
  );

  const handleAccountFetch = async (
    searchValue: string,
    isSearchRequest = false
  ) => {
    try {
      isSearchRequest ? setIsSearching(true) : setLoading(true);
      const response = await getUserSingleAccountTransactions(
        accountNumber[0].account_number,
        page.toString(),
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
      isSearchRequest ? setIsSearching(false) : setLoading(false);
    }
  };

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (debouncedSearchValue) {
      handleAccountFetch(debouncedSearchValue, true);
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (!debouncedSearchValue) {
      handleAccountFetch(searchValue);
    }
  }, [page, limit]);

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key === 'Enter') {
      handleAccountFetch(searchValue);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Account details',
      headerTitleStyle: {
        color: 'white',
        fontStyle: 'italic',
      },
      headerStyle: {
        backgroundColor: Colors.colors.primary,
      },

      headerLeft: () => (
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="keyboard-backspace" size={24} color="white" />
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
              <Text style={styles.accountTextStyle}>
                Single Account Transactions
              </Text>

              {!isSearching && (
                <SingleAccountTransactions
                  singleAccountTransactionDetails={
                    singleAccountTransactionDetails
                  }
                />
              )}

              {!isSearching && (
                <View style={styles.isSearchContainerStyle}>
                  <View style={styles.pageButtonsContainerStyle}>
                    {page > 1 && (
                      <View style={styles.singleButtonContainerStyle}>
                        <Pressable onPress={() => setPage(page - 1)}>
                          <Text style={styles.textStyle}>Previous</Text>
                        </Pressable>
                      </View>
                    )}

                    {page < totalPages && (
                      <View style={styles.singleButtonContainerStyle}>
                        <Pressable onPress={() => setPage(page + 1)}>
                          <Text style={styles.textStyle}>Next</Text>
                        </Pressable>
                      </View>
                    )}
                  </View>

                  <View>
                    <Text>
                      Page {page} of {totalPages}{' '}
                    </Text>
                  </View>
                </View>
              )}
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
  accountTextStyle: {
    marginVertical: 15,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontStyle: 'italic',
  },
  singleButtonContainerStyle: {
    backgroundColor: Colors.colors.primary,
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    marginLeft: 20,
    borderRadius: 10,
  },
  pageButtonsContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  isSearchContainerStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 20,
  },
  textStyle: {
    color: 'white',
  },
});
