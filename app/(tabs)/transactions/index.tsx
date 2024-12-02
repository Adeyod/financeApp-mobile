import {
  FlatList,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import useApi from '@/hooks/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import {
  TransactionState,
  TransactionType,
  UserState,
} from '@/constants/types';
import { getTransactionsSuccess } from '@/app/redux/transactionSlice';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import useDebounce from '@/hooks/useDebounce';
import { Colors } from '@/constants/Colors';
import { Link, router, useNavigation } from 'expo-router';
import { formatDate, formattedNumber } from '@/hooks/functions';
import LoadingSpinner from '@/components/LoadingSpinner';
import Search from '@/components/Search';
import RefreshWrapper from '@/components/RefreshWrapper';
import TransactionCard from '@/components/TransactionCard';
import HeaderRight from '@/components/Headers/HeaderRight';
import TransactionOptions from '@/components/TransactionHeaderCard';
import { MaterialIcons } from '@expo/vector-icons';
import SingleTransaction from '@/components/Accounts/SingleTransaction';
import LoadingIndicator from '@/components/LoadingIndicator';

const Transactions = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [localTransactionDetails, setLocalTransactionDetails] = useState<
    TransactionType[]
  >([]);

  const { getUserTransactions } = useApi();

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );
  const { totalTransactionsCount } = useSelector(
    (state: { transaction: TransactionState }) => state.transaction
  );

  console.log(totalTransactionsCount);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState('10');
  const [searchValue, setSearchValue] = useState('');

  const totalPages = Math.ceil(totalTransactionsCount / Number(limit));

  const getAllTransactions = async (
    searchValue: string,
    isSearchRequest = false
  ) => {
    try {
      isSearchRequest ? setIsSearching(true) : setLoading(true);
      const response = await getUserTransactions(
        page.toString(),
        limit,
        searchValue
      );

      if (response) {
        dispatch(getTransactionsSuccess(response?.transactions));
        setLocalTransactionDetails(response?.transactions?.transactions || []);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'An error occurred',
        });
      }
    } finally {
      isSearchRequest ? setIsSearching(false) : setLoading(false);
    }
  };

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (debouncedSearchValue) {
      getAllTransactions(debouncedSearchValue, true);
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (!debouncedSearchValue) {
      getAllTransactions(searchValue);
    }
  }, [page, limit]);

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key === 'Enter') {
      getAllTransactions(searchValue);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        color: 'white',
        fontStyle: 'italic',
      },
      headerStyle: {
        backgroundColor: Colors.colors.primary,
      },
      headerRight: () => {
        return (
          <HeaderRight profileImageUrl={currentUser?.profile_image?.url} />
        );
      },
    });
  }, [navigation, currentUser]);

  return (
    <ScrollView>
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <View>
          <View
            style={{
              marginTop: 40,
            }}
          >
            <Text style={styles.upperTextStyle}>
              Hello,
              <Text style={styles.usernameTextStyle}>
                {' '}
                {currentUser?.first_name}{' '}
              </Text>
              you are welcome back
            </Text>

            <TransactionOptions
              transactions={localTransactionDetails}
              totalTransactionsCount={totalTransactionsCount}
            />

            <View style={styles.searchContainerStyle}>
              <Search
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleKeyPress={handleKeyPress}
              />
            </View>
          </View>
        </View>
      )}

      {isSearching ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={localTransactionDetails}
          renderItem={({ item, index }) => (
            <SingleTransaction transaction={item} key={index} />
          )}
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
    </ScrollView>
  );
};

export default Transactions;

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
  searchContainerStyle: {
    marginVertical: 20,
    marginHorizontal: 20,
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
  usernameTextStyle: {
    fontWeight: 'bold',
  },
  pageButtonsContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
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
  textStyle: {
    color: 'white',
  },
  isSearchContainerStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 20,
  },
});
