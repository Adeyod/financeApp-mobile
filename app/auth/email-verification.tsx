import { Colors } from '@/constants/Colors';
import useApi from '@/hooks/apiCalls';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const EmailVerification = () => {
  const [pins, setPins] = useState(['', '', '', '', '', '']);
  const InputRef = [];

  console.log(pins.join(' '));
  const { verifyUserEmail } = useApi();

  const handleChange = (text, index) => {
    const newPins = [...pins];
    newPins[index] = text;
    setPins(newPins);

    if (text.length === 1 && index < 5) {
      InputRef[index + 1].focus();
    }
  };

  const handleBackSpace = (e, index) => {
    const text = e.nativeEvent.text;

    if (e.nativeEvent.key === 'Backspace') {
      if (text === '') {
        const newPins = [...pins];
        newPins[index] = '';
        setPins(newPins);
      } else if (index > 0) {
        InputRef[index - 1].focus();
      }
    }
  };

  const handleVerification = async () => {
    try {
      const token = pins.join('');
      console.log(token);

      const response = await verifyUserEmail(token);
      console.log(response);

      if (response.data.success) {
        Alert.alert(response.data.message);
        router.replace('/auth/login');
        return;
      } else {
        Alert.alert(response.data.message);
        Alert.alert('I am alerting here');
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        Alert.alert(error.response.data.message);
        if (
          error.response.data.message ===
          'Verification link has expired. Please request a new one'
        ) {
          router.replace('/auth/new-verification-token');
          return;
        }
      } else {
        console.error('An error occurred');
        Alert.alert('An error occurred');
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainContainerStyle}>
      <View>
        <Text style={styles.headerTextStyle}>
          Please verify your email address
        </Text>

        <View style={styles.textInputContainerStyle}>
          {pins.map((pin, index) => (
            <TextInput
              key={index}
              value={pin}
              style={styles.textInputStyle}
              maxLength={1}
              ref={(ref) => (InputRef[index] = ref)}
              keyboardType="numeric"
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleBackSpace(e, index)}
            />
          ))}
        </View>

        <View style={styles.verifyEmailButtonContainerStyle}>
          <TouchableOpacity
            onPress={handleVerification}
            style={styles.verifyEmailButtonStyle}
          >
            <Text style={styles.verifyEmailTextStyle}>Verify Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailVerification;

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    marginTop: -50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d1d5db',
  },
  headerTextStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
  textInputContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 20,
  },
  textInputStyle: {
    height: 60,
    width: 50,
    borderWidth: 1,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    fontSize: 22,
  },
  verifyEmailButtonContainerStyle: {
    alignItems: 'center',
  },
  verifyEmailButtonStyle: {
    backgroundColor: Colors.colors.secondary,
    width: 120,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  verifyEmailTextStyle: {
    color: 'white',
  },
});
