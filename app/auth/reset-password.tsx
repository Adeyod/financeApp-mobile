import {
  Alert,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';
import axios from 'axios';
import { router } from 'expo-router';
import useApi from '@/hooks/apiCalls';
import { joiResetPasswordValidationSchema } from '@/hooks/validation';
import ResetPasswordForm from '@/components/FormComponents/ResetPasswordForm';
import Toast from 'react-native-toast-message';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPasswordProcess } = useApi();

  const [pins, setPins] = useState(['', '', '', '', '', '']);
  const InputRef = useRef<(TextInput | null)[]>([]);

  const token = pins.join('');

  const handleChange = (text: string, index: number) => {
    const newPins = [...pins];
    newPins[index] = text;
    setPins(newPins);

    if (text.length === 1 && index < 5) {
      InputRef[index + 1].focus();
    }
  };

  const handleBackSpace = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
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

  let dataObj = {
    password: newPassword,
    confirm_password: confirmNewPassword,
    token,
  };

  console.log(newPassword);
  console.log(confirmNewPassword);
  console.log(token);

  const handleResetPassword = async () => {
    const { error } = joiResetPasswordValidationSchema.validate(
      {
        password: newPassword,
        confirm_password: confirmNewPassword,
      },
      {
        abortEarly: false,
      }
    );

    if (error) {
      error.details.forEach((detail) => {
        Toast.show({
          type: 'error',
          text1: detail.message,
        });
      });
      return;
    }

    try {
      setLoading(true);
      const { data } = await resetPasswordProcess(dataObj);
      console.log(data);
      if (data.success) {
        Toast.show({
          type: 'success',
          text1: data.message,
        });
        router.replace('/auth/login');
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        });
        if (
          error.response.data.message ===
            'This code has expired. Please request for a new password reset link to continue' ||
          'Invalid verification code'
        ) {
          router.replace('/auth/new-reset-token');
          return;
        }
      } else {
        console.error('An error occurred');
        Toast.show({
          type: 'error',
          text1: 'An error occurred',
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainerStyle}>
      <View style={styles.firstViewContainerStyle}>
        <Text style={styles.textStyle}>
          Input your one time 6 digit pin here
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

        <View style={styles.firstChildContainerStyle}>
          <ResetPasswordForm
            confirmPassword={confirmNewPassword}
            setConfirmPassword={setConfirmNewPassword}
            password={newPassword}
            setPassword={setNewPassword}
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={handleResetPassword}
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

export default ResetPassword;

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -90,
    backgroundColor: '#d1d5db',
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
  firstViewContainerStyle: {
    display: 'flex',
  },
  firstChildContainerStyle: {
    marginVertical: 10,
  },
  textStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: -20,
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
