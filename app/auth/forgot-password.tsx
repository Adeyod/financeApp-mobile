import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { joiForgotPasswordValidationSchema } from '@/hooks/validation';
import { router } from 'expo-router';
import useApi from '@/hooks/apiCalls';
import LoadingSpinner from '@/components/LoadingSpinner';
import LoadingIndicator from '@/components/LoadingIndicator';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { forgotPasswordProcess } = useApi();

  console.log('EMAIL:', email);

  const handleForgotPassword = async () => {
    const { error } = joiForgotPasswordValidationSchema.validate(
      { email },
      {
        abortEarly: false,
      }
    );

    if (error) {
      error.details.forEach((detail) => {
        Alert.alert(detail.message);
      });
      return;
    }

    try {
      setLoading(true);
      const { data } = await forgotPasswordProcess(email);
      console.log(data);
      if (data.success) {
        Alert.alert(data.message);
        router.replace('/auth/reset-password');
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        Alert.alert(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        Alert.alert('An error occurred:');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainerStyle}>
      <View style={styles.firstViewContainerStyle}>
        <View style={styles.firstChildContainerStyle}>
          <Text style={styles.textStyle}>Email Address</Text>
          <TextInput
            style={styles.textInputFieldStyle}
            placeholder="Enter your email address..."
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.buttonContainerStyle}
          >
            <Text style={styles.buttonTextStyle}>
              {loading ? <LoadingIndicator /> : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -90,
    backgroundColor: '#d1d5db',
  },
  firstViewContainerStyle: {
    display: 'flex',
  },
  firstChildContainerStyle: {
    marginVertical: 10,
  },
  textStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  textInputFieldStyle: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 300,
    marginVertical: 5,
    paddingLeft: 20,
  },
  buttonContainerStyle: {
    backgroundColor: 'blue',
    width: 130,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
