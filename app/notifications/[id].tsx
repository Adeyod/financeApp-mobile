import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import LoadingSpinner from '@/components/LoadingSpinner';
import RefreshWrapper from '@/components/RefreshWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationState } from '@/constants/types';
import { getSingleNotificationSuccess } from '../redux/notificationSlice';
import axios from 'axios';
import useApi from '@/hooks/apiCalls';
import { formatDate } from '@/hooks/functions';
import { Colors } from '@/constants/Colors';
import Toast from 'react-native-toast-message';

const NotificationDetails = () => {
  const { id } = useLocalSearchParams();
  console.log('notification ID:', id);

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { markANotificationAsRead } = useApi();

  const { singleUserNotification } = useSelector(
    (state: { notification: NotificationState }) => state.notification
  );

  console.log('singleUserNotification', singleUserNotification);

  const markNotificationsAsRead = async () => {
    if (!id) {
      return;
    }

    try {
      const response = await markANotificationAsRead(
        Array.isArray(id) ? id[0] : id
      );
      console.log('response', response.notification);
      dispatch(getSingleNotificationSuccess(response?.notification));
    } catch (error) {
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
    markNotificationsAsRead();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <RefreshWrapper>
          <View style={styles.accountMainContainer}>
            <View style={styles.infoContainerStyle}>
              <Text style={[styles.textCommonStyle, styles.titleStyle]}>
                Title
              </Text>
              <Text style={styles.textCommonStyle}>
                {singleUserNotification?.title}
              </Text>
            </View>

            <View style={styles.infoContainerStyle2}>
              <Text style={[styles.textCommonStyle, styles.titleStyle]}>
                Message
              </Text>
              <Text style={styles.textCommonStyle}>
                {singleUserNotification?.message}
              </Text>
            </View>

            <View style={styles.infoContainerStyle}>
              <Text style={[styles.textCommonStyle, styles.titleStyle]}>
                Notification date
              </Text>
              <Text style={styles.textCommonStyle}>
                {formatDate(new Date(singleUserNotification?.created_at))}
              </Text>
            </View>
          </View>
        </RefreshWrapper>
      )}
    </>
  );
};

export default NotificationDetails;

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
  infoContainerStyle2: {
    display: 'flex',
    // gap: 10,
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
