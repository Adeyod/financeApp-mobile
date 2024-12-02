import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import Search from '@/components/Search';
import { formatDate } from '@/hooks/functions';
import { Link } from 'expo-router';
import { NotificationState } from '@/constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationsSuccess } from '../redux/notificationSlice';
import useApi from '@/hooks/apiCalls';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import useDebounce from '@/hooks/useDebounce';
import {
  Ionicons,
  AntDesign,
  Foundation,
  FontAwesome5,
} from '@expo/vector-icons';
import SingleNotification from '@/components/Notifications/SingleNotification';
import { Colors } from '@/constants/Colors';

const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [isSelected, setIsSelected] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );
  const dispatch = useDispatch();

  const {
    markNotificationsAsViewed,
    getNotifications,
    deleteNotification,
    deleteManyNotifications,
  } = useApi();

  const { userNotifications, totalNotificationsCount } = useSelector(
    (state: { notification: NotificationState }) => state.notification
  );

  console.log(userNotifications, totalNotificationsCount);

  const handleIsSelected = (id: number) => {
    setSelectedNotifications((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((i) => i !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const limit = '10';

  const totalPages = Math.ceil(totalNotificationsCount / Number(limit));

  console.log('totalPages', totalPages);
  console.log('page', page);

  const fetchNotificationsAndMarkAsViewed = async (searchValue: string) => {
    try {
      const response = await markNotificationsAsViewed();
      console.log(response);
      if (response) {
        const result = await getNotifications(
          page.toString(),
          limit,
          searchValue
        );

        dispatch(getNotificationsSuccess(result?.notifications));
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
      setLoading(false);
    }
  };

  const getAllNotifications = async (searchValue: string) => {
    try {
      setIsLoading(true);
      const response = await getNotifications(
        page.toString(),
        limit,
        searchValue
      );
      dispatch(getNotificationsSuccess(response?.notifications));
      return;
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
      setIsLoading(false);
    }
  };

  const handleDelete = async (notificationId?: number) => {
    try {
      if (notificationId) {
        const response = await deleteNotification(notificationId);
        if (response.success === true) {
          getAllNotifications(searchValue);
        }
        Toast.show({
          type: 'success',
          text1: response.message,
        });
      } else {
        if (!selectedNotifications) {
          console.log('i am being called', selectedNotifications);
          return null;
        }

        if (selectedNotifications.length > 0) {
          const response = await deleteManyNotifications(selectedNotifications);
          console.log(response);
          if (response.success === true) {
            getAllNotifications(searchValue);
          }
          Toast.show({
            type: 'success',
            text1: response.message,
          });
          setSelectedNotifications([]);
        }
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
    }
    // const response = await deleteNotification;
  };

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    fetchNotificationsAndMarkAsViewed(searchValue);
  }, []);

  useEffect(() => {
    if (debouncedSearchValue || page) {
      getAllNotifications(debouncedSearchValue);
    }
  }, [debouncedSearchValue, page]);

  useEffect(() => {
    console.log('I am running');

    fetchNotificationsAndMarkAsViewed(searchValue);
  }, [page, limit, searchValue]);

  return (
    <>
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <ScrollView>
          <View
            style={{
              margin: 20,
            }}
          >
            <Search
              searchValue={searchValue}
              handleKeyPress={(e) =>
                e.key === 'Enter' && getAllNotifications(searchValue)
              }
              setSearchValue={setSearchValue}
            />
          </View>
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -10,
                marginBottom: 20,
              }}
            >
              <Pressable onPress={() => handleDelete()}>
                <FontAwesome5 name="trash" size={24} color="black" />
              </Pressable>
              <Pressable>
                <Foundation name="archive" size={24} color="black" />
              </Pressable>
              <Pressable>
                <Ionicons name="mail-open-outline" size={24} color="black" />
              </Pressable>
            </View>
            <Text
              style={{
                textAlign: 'center',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 25,
                textDecorationLine: 'underline',
              }}
            >
              My Notifications
            </Text>
          </View>

          <FlatList
            data={userNotifications}
            renderItem={({ item, index }) => (
              <SingleNotification notification={item} key={index} />
            )}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginBottom: 20,
            }}
          >
            <View style={styles.pageButtonContainerStyle}>
              <View>
                {page > 1 && (
                  <Pressable
                    style={styles.pageButtonStyle}
                    onPress={() => setPage(page - 1)}
                  >
                    <Text style={styles.pageTextStyle}>Previous</Text>
                  </Pressable>
                )}
              </View>

              <View>
                {page < totalPages && (
                  <Pressable
                    style={styles.pageButtonStyle}
                    onPress={() => setPage(page + 1)}
                  >
                    <Text style={styles.pageTextStyle}>Next</Text>
                  </Pressable>
                )}
              </View>
            </View>
            <View>
              <Text>
                Page {page} of {totalPages}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  pageButtonContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  pageButtonStyle: {
    backgroundColor: Colors.colors.primary,
    padding: 10,
    borderRadius: 6,
  },
  pageTextStyle: {
    color: 'white',
  },
});
