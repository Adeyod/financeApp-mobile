import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import { SingleNotificationProps } from '@/constants/types';
import { truncateText } from '@/hooks/functions';
import { FontAwesome5 } from '@expo/vector-icons';

const SingleNotification = ({ notification }: SingleNotificationProps) => {
  return (
    <View>
      <Pressable style={[styles.mainContainerStyle]}>
        <Link href={`/notifications/${notification?.id}`}>
          <View style={styles.detailsContainerStyle}>
            <Text
              style={[
                styles.textStyle,
                {
                  fontWeight:
                    notification?.is_read === false ? 'bold' : 'normal',
                },
              ]}
            >
              title {notification?.title}
            </Text>
            <Text
              style={[
                styles.textStyle,
                {
                  fontWeight:
                    notification?.is_read === false ? 'bold' : 'normal',
                },
              ]}
            >
              message {truncateText(notification?.message, 10)}
            </Text>
          </View>
        </Link>
        <FontAwesome5 name="trash" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default SingleNotification;

const styles = StyleSheet.create({
  mainContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    // backgroundColor: Colors.colors.secondary,
    backgroundColor: '#FFF8E7',
  },
  detailsContainerStyle: {
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  textStyle: {
    color: Colors.colors.secondary,
  },
});
