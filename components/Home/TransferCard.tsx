import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const TransferCard = ({ pushToFundFlow, pushToBank }) => {
  return (
    <View>
      <View style={styles.transferContainerStyle}>
        <View>
          <Pressable
            style={styles.fundFlowContainerStyle}
            onPress={pushToFundFlow}
          >
            <View style={[styles.fundFlowStyle, styles.logoStyle]}>
              <Image
                style={[
                  {
                    width: 30,
                    height: 30,
                    backgroundColor: Colors.colors.primary,
                  },
                  styles.logoStyle,
                ]}
                source={require('../../assets/images/color-logo.png')}
              />
              <Text style={styles.fundFlowTextStyle}>FundFlow</Text>
            </View>
            <Text>To FundFlow</Text>
          </Pressable>
        </View>

        <View>
          <Pressable onPress={pushToBank}>
            <View style={styles.fundFlowContainerStyle}>
              <View style={styles.fundFlowContainerStyle}>
                <FontAwesome
                  name="bank"
                  size={24}
                  color="black"
                  style={styles.logoStyle}
                />
              </View>
              <Text>To Bank</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TransferCard;

const styles = StyleSheet.create({
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
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: -20,
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
