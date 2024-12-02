import {
  Alert,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountState, UserState } from '@/constants/types';
import { useNavigation } from 'expo-router';
import useApi from '@/hooks/apiCalls';
import { getAccountsSuccess } from '../redux/accountSlice';
import axios from 'axios';
import LoadingSpinner from '@/components/LoadingSpinner';
import * as imagePicker from 'expo-image-picker';
import { loginSuccess } from '../redux/userSlice';
import { Colors } from '@/constants/Colors';
import RefreshWrapper from '@/components/RefreshWrapper';
import BlinkingText from '@/components/BlinkingText';
import LoadingIndicator from '@/components/LoadingIndicator';
import HeaderRight from '@/components/Headers/HeaderRight';
import Toast from 'react-native-toast-message';
import { getNotificationsSuccess } from '../redux/notificationSlice';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<string>();

  const { getUserAccounts, imageProfileUpload, getNotifications } = useApi();

  const [searchValue] = useState('');
  const [page] = useState(1);
  const limit = '10';

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const { accountDetails } = useSelector(
    (state: { account: AccountState }) => state.account
  );

  const primary_account = accountDetails?.accounts?.find(
    (account) => account.is_default === true
  );

  const pickImage = async () => {
    try {
      let result = await imagePicker.launchImageLibraryAsync({
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log('IMAGE RESULT', result);
        setImgUrl(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    try {
      setImageLoading(true);
      if (!imgUrl) {
        throw new Error('Image URL is undefined');
      }

      const formData = new FormData();
      formData.append('file', {
        uri: imgUrl,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any);

      const { data } = await imageProfileUpload(formData);

      if (data) {
        console.log('PROFILE IMAGE UPLOAD:', data);

        const response = await getNotifications(
          page.toString(),
          limit,
          searchValue
        );

        dispatch(getNotificationsSuccess(response?.notifications));
        dispatch(loginSuccess(data.user));

        Toast.show({
          type: 'success',
          text1: data.message,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setImageLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: Colors.colors.secondary,
      },
      headerLeft: () => (
        <Text
          style={{
            paddingLeft: 10,
            color: 'white',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: 15,
          }}
        >
          Welcome, {currentUser?.first_name}
        </Text>
      ),
      headerRight: () => (
        <HeaderRight profileImageUrl={currentUser?.profile_image?.url} />
      ),
    });
  }, [navigation, currentUser]);

  const getUserAccountTransactions = async () => {
    try {
      const accountData = await getUserAccounts();
      const accountDetails = accountData?.data;
      // console.log('accountDetails:', accountData);

      dispatch(getAccountsSuccess(accountDetails));
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        });
        // toast.error(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        Toast.show({
          type: 'error',
          text1: 'An error occurred:',
        });
        // toast.error('An error occurred:');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserAccountTransactions();
  }, []);

  const prop = 'upgrade';

  return (
    <>
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <RefreshWrapper>
          <View
            style={{
              gap: 5,
            }}
          >
            <View
              style={{
                // paddingHorizontal: 10,
                paddingVertical: 30,
                // marginHorizontal: 100,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  textTransform: 'uppercase',
                  fontStyle: 'italic',
                  textDecorationLine: 'underline',
                  fontWeight: 'bold',
                  marginBottom: 15,
                }}
              >
                My Profile
              </Text>

              <View>
                <Image
                  source={{
                    uri: imgUrl
                      ? imgUrl
                      : currentUser?.profile_image?.url
                      ? currentUser?.profile_image?.url
                      : Image.resolveAssetSource(
                          require('../../assets/images/placeholderImage2.jpg')
                        ).uri,
                  }}
                  style={{
                    height: 140,
                    width: 140,
                    borderRadius: 99,
                  }}
                  resizeMode="cover"
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 4,
                  marginTop: 17,
                }}
              >
                <Pressable onPress={pickImage}>
                  <Text style={styles.buttonTextStyle}>change image</Text>
                </Pressable>
                <Pressable
                  style={{
                    width: 130,
                  }}
                  onPress={uploadImage}
                  disabled={imageLoading}
                >
                  {imageLoading ? (
                    <View
                      style={[
                        { width: 130 },
                        styles.buttonLoadingStyle,
                        styles.buttonTextStyle,
                      ]}
                    >
                      <LoadingIndicator />
                    </View>
                  ) : (
                    <Text style={styles.buttonTextStyle}>upload image</Text>
                  )}
                </Pressable>
              </View>
            </View>

            <View
              style={{
                alignItems: 'flex-start',
                marginLeft: 30,
                gap: 5,
              }}
            >
              <View
                style={{
                  gap: 10,
                }}
              >
                <View
                  style={[
                    {
                      gap: 20,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                    styles.textContainer,
                  ]}
                >
                  <Text
                    style={[
                      { color: 'red' },
                      styles.textStyle,
                      styles.textTitleStyle,
                    ]}
                  >
                    account tier:
                  </Text>

                  <Text style={[styles.textStyle, { fontStyle: 'italic' }]}>
                    {currentUser?.account_tier}
                  </Text>

                  <Pressable>
                    <BlinkingText text={'upgrade'} />
                  </Pressable>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5,
                  }}
                >
                  <View style={styles.textContainer}>
                    <Text style={[styles.textStyle, styles.textTitleStyle]}>
                      first name:
                    </Text>
                    <Text style={styles.textStyle}>
                      {currentUser?.first_name}
                    </Text>
                  </View>

                  <View style={styles.textContainer}>
                    <Text style={[styles.textStyle, styles.textTitleStyle]}>
                      user name:
                    </Text>
                    <Text style={styles.textStyle}>
                      {currentUser?.user_name}
                    </Text>
                  </View>
                </View>

                <View style={styles.textContainer}>
                  <Text style={[styles.textStyle, styles.textTitleStyle]}>
                    last name:
                  </Text>
                  <Text style={styles.textStyle}>{currentUser?.last_name}</Text>
                </View>

                <View style={[styles.textContainer, { alignItems: 'center' }]}>
                  <Text style={[styles.textStyle, styles.textTitleStyle]}>
                    phone number:
                  </Text>
                  <TextInput
                    style={[
                      styles.textStyle,
                      { borderWidth: 1, height: 42, width: 155 },
                    ]}
                  >
                    {currentUser?.phone_number}
                  </TextInput>
                </View>
              </View>

              <View style={styles.textContainer}>
                <Text style={[styles.textStyle, styles.textTitleStyle]}>
                  Pry Account:
                </Text>
                <Text style={styles.textStyle}>
                  {primary_account?.account_number}
                </Text>
              </View>

              <View style={styles.textContainer}>
                <Text style={[styles.textStyle, styles.textTitleStyle]}>
                  Email:
                </Text>
                <Text style={styles.textStyle}>{currentUser?.email}</Text>
              </View>
            </View>

            <View
              style={{
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Pressable
                style={{
                  width: 150,
                }}
                // onPress={uploadImage}
                disabled={isLoading}
              >
                {isLoading ? (
                  <View
                    style={[
                      { width: 150 },
                      styles.buttonLoadingStyle,
                      styles.buttonTextStyle,
                    ]}
                  >
                    <LoadingIndicator />
                  </View>
                ) : (
                  <Text style={styles.buttonTextStyle}>update profile</Text>
                )}
              </Pressable>
            </View>
          </View>
        </RefreshWrapper>
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  buttonTextStyle: {
    backgroundColor: 'green',
    fontSize: 16,
    textTransform: 'uppercase',
    fontStyle: 'italic',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
  },
  textStyle: {
    fontSize: 18,
  },
  textTitleStyle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  buttonLoadingStyle: {
    display: 'flex',
    paddingHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
