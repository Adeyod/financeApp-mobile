import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { Colors } from '@/constants/Colors';

type LoadingState = {
  loading: boolean;
};

const LoadingSpinner = ({ loading }: LoadingState) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner
        visible={loading}
        size="large"
        overlayColor="rgba(0,0,0,0.25)"
        color={Colors.colors.primary}
      />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({});
