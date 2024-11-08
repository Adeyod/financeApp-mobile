import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '@/components/Button';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';

const Welcome = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    router.push('/auth/login');
  };
  const handleRegister = () => {
    router.push('/auth/reset-password');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.upperText}>Welcome to</Text>
      <Text style={styles.upperText}>Fund Flow</Text>
      <LottieView
        autoPlay
        style={styles.lottieStyle}
        source={require('../../assets/images/Animation - 1725014486606.json')}
      />
      <View style={styles.buttonOuterContainer}>
        <Button
          title={'Log In'}
          handleSubmit={handleLogin}
          loading={loading}
          buttonContainerStyle={styles.buttonContainerStyle}
          buttonTextStyle={styles.buttonTextStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title={'Register'}
          handleSubmit={handleRegister}
          loading={loading}
          buttonContainerStyle={styles.buttonContainerStyle}
          buttonTextStyle={styles.buttonTextStyle}
          buttonStyle={styles.buttonStyle}
        />
      </View>
      <Text style={styles.bottomText}>Transfer funds</Text>
      <Text style={styles.bottomText}>Seamlessly</Text>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
  },
  lottieStyle: {
    width: 350,
    height: 300,
    marginVertical: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  buttonOuterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginVertical: 50,
  },
  buttonContainerStyle: {
    alignContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#5063BF',
    width: 150,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  upperText: {
    fontSize: 45,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#5067BF',
    fontStyle: 'italic',
  },
  bottomText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'gray',
    fontStyle: 'italic',
  },
});
