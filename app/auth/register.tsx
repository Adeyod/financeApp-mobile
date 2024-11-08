import {
  Alert,
  Image,
  KeyboardAvoidingView,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import LoginForm from '@/components/FormComponents/LoginForm';
import axios from 'axios';
import Button from '@/components/Button';
import apiCall from '@/hooks/apiCalls';
import RegisterForm from '@/components/FormComponents/RegisterForm';
import { RegisterFromProp } from '@/constants/types';
import PhoneInput from 'react-native-phone-number-input';
import { joiRegisterValidationSchema } from '@/hooks/validation';
import { Link, router } from 'expo-router';

const Register = () => {
  const [value, setValue] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  let [formData, setFormData] = useState<RegisterFromProp>({
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const phoneSplit = phoneNumber.split(' ');
  const formattedPhoneNumber = `${phoneSplit[0]}${phoneSplit[1]}`;

  formData = { ...formData, phone_number: phoneNumber };

  console.log('PHONE NUMBER:', phoneNumber.trim());
  console.log('VALUE:', value);
  console.log('formData:', formData);

  const { registerUser } = apiCall();

  LogBox.ignoreLogs([
    'CountryItem: Support for defaultProps will be removed from function components in a future major release.',
    'CountryModal: Support for defaultProps will be removed from function components in a future major release.',
    'Warning: CountryModal: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
  ]);

  const handleSubmit = async () => {
    const { error } = joiRegisterValidationSchema.validate(formData, {
      abortEarly: false,
    });

    if (error) {
      error.details.forEach((detail) => {
        Alert.alert(detail.message);
      });
      return;
    }

    if (phoneNumber.includes(' ')) {
      Alert.alert('Please remove whitespace characters in phone number');
      return;
    }
    setLoading(true);

    try {
      const { data } = await registerUser(formData);
      console.log('data:', data);
      if (data) {
        console.log('i am logging here');

        Alert.alert(data.message);
        router.replace('/auth/email-verification');
        return;
      } else {
        console.log('An error occurred');
      }
    } catch (error: any) {
      Alert.alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container}>
        <Image source={require('../../assets/images/color-logo.png')} />
        <Text style={styles.loginText}>Register</Text>
        <View>
          <Text>Phone number</Text>
          <PhoneInput
            // defaultValue={phoneNumber}
            value={phoneNumber}
            withShadow
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
            autoFocus
            // initialCountry="Us"
            defaultCode="US"
            placeholder="12345678"
            // containerStyle={{
            //   width: '90vw',
            //   borderColor: 'red',
            //   border: '1px solid red',
            // }}
            // offset={10}
            // pickerItemStyle={{
            //   justifyContent: 'center',
            //   alignItems: 'center',
            //   height: '80%',
            //   marginBottom: '50%',
            // }}
            // autoFormat
          />
        </View>
        <View style={styles.loginContainer}>
          <RegisterForm formData={formData} setFormData={setFormData} />
        </View>

        <View style={styles.forgotPasswordContainerStyle}>
          <View style={styles.forgotPasswordCommonStyle}>
            <Text style={styles.forgotPasswordCommonTextStyle}>
              Have an account?
            </Text>
            <Link
              style={[
                styles.commonLinkStyle,
                styles.forgotPasswordCommonTextStyle,
              ]}
              href="/auth/login"
            >
              Login
            </Link>
          </View>
        </View>
        <Button
          title={'Register'}
          handleSubmit={handleSubmit}
          loading={loading}
          buttonContainerStyle={styles.buttonContainerStyle}
          buttonTextStyle={styles.buttonTextStyle}
          buttonStyle={styles.buttonStyle}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 35,
  },
  loginContainer: {
    paddingVertical: 30,
  },
  loginText: {
    fontSize: 30,
    fontWeight: '900',
  },
  buttonContainerStyle: {
    marginHorizontal: 60,
  },
  buttonStyle: {
    backgroundColor: '#5063BF',
    width: 200,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 100,
  },
  buttonTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  forgotPasswordContainerStyle: {
    marginLeft: 5,
    marginTop: -40,
    marginBottom: 40,
  },
  forgotPasswordCommonStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  forgotPasswordCommonTextStyle: {
    fontSize: 15,
    marginRight: 5,
  },
  commonLinkStyle: {
    color: 'blue',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});
