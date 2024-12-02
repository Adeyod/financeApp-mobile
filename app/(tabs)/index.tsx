import HeaderRight from '@/components/Headers/HeaderRight';
import { Colors } from '@/constants/Colors';
import { AccountState, UserState } from '@/constants/types';
import useApi from '@/hooks/apiCalls';
import axios from 'axios';
import { Link, router, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountsSuccess } from '../redux/accountSlice';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { formattedNumber } from '@/hooks/functions';
import TransferCard from '@/components/Home/TransferCard';
import AccountsSection from '@/components/Home/AccountsSection';
import BillsAndPurchaseSection from '@/components/Home/BillsAndPurchaseSection';
import Toast from 'react-native-toast-message';
import CoyLogo from '../../assets/imgs/color-logo.png';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(false);
  const { getUserAccounts } = useApi();
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const { accountDetails } = useSelector(
    (state: { account: AccountState }) => state.account
  );

  const toggleShowBalance = () => {
    setShowBalance(!showBalance);
  };

  console.log('accountDetails:', accountDetails?.accounts);

  const totalBalance = accountDetails?.accounts?.reduce((total, account) => {
    return total + parseFloat(account?.balance);
  }, 0);

  const findUserAccounts = async () => {
    try {
      const response = await getUserAccounts();
      if (response) {
        console.log('HOME SCREEN:', response.data);
        Toast.show({
          type: 'success',
          text1: response.data.message,
        });
        dispatch(getAccountsSuccess(response.data));
        return;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        });
        console.error(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        Toast.show({
          type: 'error',
          text1: 'An error occurred',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const pushToFundFlow = () => {
    router.push('/transfers/fundflow');
  };

  const pushToBank = () => {
    router.push('/transfers/bank');
  };

  useEffect(() => {
    findUserAccounts();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Colors.colors.primary,
      },
      headerLeft: () => (
        <View
          style={{
            paddingLeft: 15,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image source={CoyLogo} />
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              marginLeft: -60,
              fontStyle: 'italic',
            }}
          >
            FundFlow
          </Text>
        </View>
      ),
      headerRight: () => (
        <HeaderRight profileImageUrl={currentUser?.profile_image?.url} />
      ),
    });
  });

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <View>
          {/* ACCOUNT SECTION CARD */}
          <AccountsSection
            currentUser={currentUser}
            toggleShowBalance={toggleShowBalance}
            showBalance={showBalance}
            totalBalance={totalBalance}
          />

          {/* TRANSFER CARD */}
          <TransferCard
            pushToFundFlow={pushToFundFlow}
            pushToBank={pushToBank}
          />

          {/* BILLING AND PURCHASE */}
          <BillsAndPurchaseSection />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  secondContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.colors.secondary,
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  textStyle: {
    fontSize: 13,
    marginVertical: 10,
    color: 'white',
  },
  linkTextStyle: {
    fontSize: 13,
    marginVertical: 10,
    color: Colors.colors.primary,
  },

  transferContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    marginVertical: 20,
    backgroundColor: '#FFF8E7',
    // backgroundColor: '#FAF9F6',
    paddingVertical: 30,
    borderRadius: 10,
  },

  fundFlowStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fundFlowTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: -40,
  },
  fundFlowContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logoStyle: {
    backgroundColor: Colors.colors.primary,
    padding: 10,
    borderRadius: 10,
  },
});
