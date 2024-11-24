import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '@/constants/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import Popover from 'react-native-popover-view';
import { router, useNavigation } from 'expo-router';
import { logoutAuthSuccess } from '@/app/redux/authSlice';
import { logoutSuccess } from '@/app/redux/userSlice';
import { clearAccounts } from '@/app/redux/accountSlice';
import { clearTransactions } from '@/app/redux/transactionSlice';

type ImageProps = {
  profileImageUrl: string | undefined;
};

const HeaderRight: React.FC<ImageProps> = ({ profileImageUrl }: ImageProps) => {
  const [isPopoverVisible, setPopoverVisible] = useState(false);

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
    router.replace('/auth/login');
  };

  const headerRightComponent = useMemo(
    () => (
      <View style={styles.containerStyle}>
        <Pressable>
          <Ionicons name="notifications-sharp" size={35} color="black" />
        </Pressable>

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
    [profileImageUrl, isPopoverVisible]
  );

  return headerRightComponent;
};

export default HeaderRight;

const styles = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
