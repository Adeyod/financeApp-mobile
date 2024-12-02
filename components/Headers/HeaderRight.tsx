import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationState, UserState } from '@/constants/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import Popover from 'react-native-popover-view';
import { Link, router, useNavigation } from 'expo-router';
import { logoutAuthSuccess } from '@/app/redux/authSlice';
import { logoutSuccess } from '@/app/redux/userSlice';
import { clearAccounts } from '@/app/redux/accountSlice';
import { clearTransactions } from '@/app/redux/transactionSlice';
import {
  clearNotifications,
  getNotificationsSuccess,
} from '@/app/redux/notificationSlice';
import useApi from '@/hooks/apiCalls';
import axios from 'axios';
import Toast from 'react-native-toast-message';

type ImageProps = {
  profileImageUrl: string | undefined;
};

const HeaderRight: React.FC<ImageProps> = ({ profileImageUrl }: ImageProps) => {
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const notificationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { getNotifications } = useApi();

  const { totalIsViewed } = useSelector(
    (state: { notification: NotificationState }) => state.notification
  );

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  console.log('currentUser:', currentUser);
  console.log('totalIsViewed:', totalIsViewed);

  const [searchValue] = useState('');
  const [page] = useState(1);
  const limit = '10';

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleProfilePress = () => {
    setPopoverVisible(false);
    router.replace('/(tabs)/profile');
  };

  const handleLogoutPress = () => {
    setPopoverVisible(false);
    dispatch(logoutAuthSuccess());
    dispatch(logoutSuccess());
    dispatch(clearAccounts());
    dispatch(clearTransactions());
    dispatch(clearNotifications());
    router.replace('/auth/login');
  };

  const getAllNotifications = async (searchValue: string) => {
    try {
      const response = await getNotifications(
        page.toString(),
        limit,
        searchValue
      );

      dispatch(getNotificationsSuccess(response?.notifications));
      return;
    } catch (error: unknown) {
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
    }
  };

  useEffect(() => {
    if (currentUser) {
      getAllNotifications(searchValue);

      notificationIntervalRef.current = setInterval(() => {
        getAllNotifications(searchValue);
      }, 60000);

      return () => {
        if (notificationIntervalRef.current) {
          clearInterval(notificationIntervalRef.current);
        }
      };
    }
  }, [currentUser, searchValue]);

  const headerRightComponent = useMemo(
    () => (
      <View style={styles.containerStyle}>
        <TouchableOpacity onPress={() => router.push('/notifications')}>
          <Ionicons name="notifications-sharp" size={35} color="black" />

          <Text
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              top: -10,
              left: -3,
              padding: 8,
              borderRadius: 99,
              color: 'white',
            }}
          >
            {totalIsViewed > 0 && totalIsViewed}
          </Text>
        </TouchableOpacity>

        <Popover
          isVisible={isPopoverVisible}
          onRequestClose={() => setPopoverVisible(false)}
          from={
            <Pressable onPress={() => setPopoverVisible(true)}>
              <Image
                source={
                  profileImageUrl
                    ? {
                        uri: profileImageUrl,
                        cache: 'reload',
                      }
                    : require('../../assets/images/placeholder.jpg')
                }
                style={styles.imageStyle}
              />
            </Pressable>
          }
        >
          <View style={styles.dropdownContent}>
            <Pressable onPress={handleProfilePress} style={styles.dropdownItem}>
              <Text>Profile</Text>
            </Pressable>
            <Pressable onPress={handleLogoutPress} style={styles.dropdownItem}>
              <Text>Logout</Text>
            </Pressable>
          </View>
        </Popover>
      </View>
    ),
    [profileImageUrl, isPopoverVisible, totalIsViewed]
  );

  return headerRightComponent;
};

export default HeaderRight;

const styles = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    // gap: 5,
  },
  imageStyle: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
    borderRadius: 70,
    marginRight: 20,
  },
  dropdownContent: {
    padding: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
  },
});
