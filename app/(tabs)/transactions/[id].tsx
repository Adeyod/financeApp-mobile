import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { TransactionState, UserState } from '@/constants/types';
import { useDispatch, useSelector } from 'react-redux';
import HeaderRight from '@/components/Headers/HeaderRight';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { getSingleTransactionSuccess } from '@/app/redux/transactionSlice';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import useApi from '@/hooks/apiCalls';
import LoadingSpinner from '@/components/LoadingSpinner';
import RefreshWrapper from '@/components/RefreshWrapper';
import TransactionOptions from '@/components/TransactionHeaderCard';
import { formatDate, formattedNumber } from '@/hooks/functions';

const transaction = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  // console.log('ID: ', id);

  const { getSingleTransactionByTransactionId } = useApi();

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const { singleTransactionDetails } = useSelector(
    (state: { transaction: TransactionState }) => state.transaction
  );

  // console.log('singleTransactionDetails', singleTransactionDetails);

  const fetchExactTransaction = async () => {
    try {
      if (id === undefined) {
        return null;
      }
      const response = await getSingleTransactionByTransactionId(
        Array.isArray(id) ? id[0] : id
      );

      // console.log('response', response);

      if (response) {
        dispatch(getSingleTransactionSuccess(response.transaction));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        });
      } else {
        console.error('An error occurred:', error);
        Toast.show({
          type: 'error',
          text1: 'An error occurred:',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExactTransaction();
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Transaction Details',
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
            marginRight: 20,
          }}
          onPress={() => router.back()}
        >
          <MaterialIcons name="keyboard-backspace" size={24} color="white" />
        </Pressable>
      ),
      headerRight: () => (
        <HeaderRight profileImageUrl={currentUser?.profile_image?.url} />
      ),
    });
  }, [navigation, currentUser]);
  return (
    <>
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <RefreshWrapper>
          <View style={styles.accountMainContainer}>
            <View style={styles.infoContainerStyle}>
              <Text style={[styles.textCommonStyle, styles.titleStyle]}>
                amount
              </Text>
              <Text style={styles.textCommonStyle}>
                #{formattedNumber(Number(singleTransactionDetails?.amount))}
              </Text>
            </View>

            <View style={styles.infoContainerStyle}>
              <Text style={[styles.textCommonStyle, styles.titleStyle]}>
                transaction type
              </Text>
              <Text style={styles.textCommonStyle}>
                {singleTransactionDetails?.transaction_type}
              </Text>
            </View>

            <View style={styles.infoContainerStyle}>
              <Text style={[styles.textCommonStyle, styles.titleStyle]}>
                transaction date
              </Text>
              <Text style={styles.textCommonStyle}>
                {formatDate(new Date(singleTransactionDetails?.created_at))}
              </Text>
            </View>

            <View style={styles.infoContainerStyle}>
              <Text style={[styles.textCommonStyle, styles.titleStyle]}>
                account no
              </Text>
              <Text style={styles.textCommonStyle}>
                {singleTransactionDetails?.account_number}
              </Text>
            </View>

            <View style={styles.infoContainerStyle}>
              <Text style={[styles.textCommonStyle, styles.titleStyle]}>
                reference
              </Text>
              <Text style={styles.textCommonStyle}>
                {singleTransactionDetails?.reference_number}
              </Text>
            </View>

            <View style={styles.infoContainerStyle}>
              <Text style={[styles.textCommonStyle, styles.titleStyle]}>
                status
              </Text>
              <Text style={styles.textCommonStyle}>
                {singleTransactionDetails?.transaction_status}
              </Text>
            </View>

            <View style={styles.infoContainerStyle}>
              <Text style={[styles.textCommonStyle, styles.titleStyle]}>
                description
              </Text>
              <Text style={styles.textCommonStyle}>user credit account</Text>
            </View>

            {singleTransactionDetails?.receiving_account_number ||
              singleTransactionDetails?.receiving_account ||
              singleTransactionDetails?.receiving_bank_name ||
              (singleTransactionDetails?.receiver_account_name && (
                <View>
                  <Text>
                    {singleTransactionDetails?.transaction_type === 'debit' ? (
                      <Text> receiver</Text>
                    ) : (
                      <Text>sender</Text>
                    )}{' '}
                    details
                  </Text>

                  {singleTransactionDetails?.receiving_account_number ? (
                    <Text>
                      <Text>account number: </Text>
                      <Text>
                        {singleTransactionDetails?.receiving_account_number}
                      </Text>
                    </Text>
                  ) : singleTransactionDetails?.receiving_account ? (
                    singleTransactionDetails?.receiving_account?.slice(0, 3) +
                    'xxx' +
                    singleTransactionDetails?.receiving_account?.slice(29, 32)
                  ) : (
                    ''
                  )}
                  {singleTransactionDetails?.receiving_bank_name && (
                    <Text>
                      <Text>bank: </Text>
                      {singleTransactionDetails?.receiving_bank_name}
                    </Text>
                  )}
                  {singleTransactionDetails?.receiver_account_name && (
                    <Text>
                      <Text>name: </Text>
                      {singleTransactionDetails?.receiver_account_name}
                    </Text>
                  )}
                </View>
              ))}
          </View>
        </RefreshWrapper>
      )}
    </>
  );
};

export default transaction;

const styles = StyleSheet.create({
  accountMainContainer: {
    paddingHorizontal: 15,
    marginLeft: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 60,
    gap: 15,
  },
  searchContainerStyle: {
    marginVertical: 20,
  },
  scrollViewContainerStyle: {
    backgroundColor: Colors.colors.secondary,
    borderRadius: 20,
    paddingLeft: 10,
  },
  infoContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  textCommonStyle: {
    fontSize: 15,
  },
  titleStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontStyle: 'italic',
    color: 'black',
  },
});
