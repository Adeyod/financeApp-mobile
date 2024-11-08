import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { formattedNumber } from '@/hooks/functions';
import { Link } from 'expo-router';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { AccountSectionType } from '@/constants/types';

const AccountsSection = ({
  currentUser,
  toggleShowBalance,
  showBalance,
  totalBalance,
}: AccountSectionType) => {
  return (
    <View>
      <View>
        <Text
          style={[
            styles.linkTextStyle,
            {
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 18,
              fontStyle: 'italic',
            },
          ]}
        >
          Welcome {currentUser?.first_name}
        </Text>
        <View style={styles.secondContainerStyle}>
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
                alignItems: 'center',
              }}
            >
              <Text style={styles.textStyle}>All accounts Balance</Text>
              <Pressable onPress={toggleShowBalance}>
                {showBalance ? (
                  <View>
                    <Feather name="eye" size={20} color="white" />
                  </View>
                ) : (
                  <View>
                    <Feather name="eye-off" size={20} color="white" />
                  </View>
                )}
              </Pressable>
            </View>
            <Text style={styles.textStyle}>
              {showBalance ? (
                `#${formattedNumber(Number(totalBalance))}`
              ) : (
                <MaterialIcons name="password" size={24} color="white" />
              )}
            </Text>
          </View>
          <View
            style={{
              gap: 16,
            }}
          >
            <Link href="/(tabs)/transactions">
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 4,
                  alignItems: 'center',
                }}
              >
                <Text style={styles.textStyle}>Transaction History</Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={20}
                  color="white"
                />
              </View>
            </Link>
            <Link
              href={'/credit/credit-account'}
              style={{
                backgroundColor: 'white',
                width: 100,
                paddingHorizontal: 8,
                paddingVertical: 10,
                textAlign: 'center',
                borderRadius: 15,
              }}
            >
              <Text style={styles.linkTextStyle}>Add Money</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountsSection;

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
});
