import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import LoginForm from '@/components/FormComponents/LoginForm';
import Button from '@/components/Button';
import useApi from '@/hooks/apiCalls';
import { Link, router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';
import { loginAuthSuccess } from '../redux/authSlice';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser } = useApi();

  const handleLogin = async () => {
    setLoading(true);
    const formData = {
      login_input: email,
      password,
    };

    try {
      console.log(formData);
      const { data } = await loginUser(formData);

      console.log(data);

      if (data) {
        const { token, user, access } = data;
        const accessData = { token, access };
        console.log('user:', user);
        console.log('access:', access);
        console.log('token:', token);

        Alert.alert(data.message);
        dispatch(loginSuccess(user));
        dispatch(loginAuthSuccess(accessData));

        router.replace('/');
        return;
      } else {
        console.log('An error occurred');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        Alert.alert(error.response.data.message);
      } else {
        console.error('An error occurred');
        Alert.alert('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/color-logo.png')} />
      <Text style={styles.loginText}>Log in</Text>
      <View style={styles.loginContainer}>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      </View>

      <View style={styles.forgotPasswordContainerStyle}>
        <View style={styles.forgotPasswordCommonStyle}>
          <Text style={styles.forgotPasswordCommonTextStyle}>
            Don't have an account?
          </Text>
          <Link
            style={[
              styles.commonLinkStyle,
              styles.forgotPasswordCommonTextStyle,
            ]}
            href="/auth/register"
          >
            Register
          </Link>
        </View>
        <View style={styles.forgotPasswordCommonStyle}>
          <Text style={styles.forgotPasswordCommonTextStyle}>
            Forgot Password?
          </Text>
          <Link
            style={[
              styles.commonLinkStyle,
              styles.forgotPasswordCommonTextStyle,
            ]}
            href="/auth/forgot-password"
          >
            Click here
          </Link>
        </View>
      </View>

      <Button
        title={'Log In'}
        handleSubmit={handleLogin}
        loading={loading}
        buttonContainerStyle={styles.buttonContainerStyle}
        buttonTextStyle={styles.buttonTextStyle}
        buttonStyle={styles.buttonStyle}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingHorizontal: 35,
  },
  loginContainer: {
    marginTop: 50,
    paddingVertical: 50,
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
  },
  buttonTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  forgotPasswordContainerStyle: {
    marginLeft: 5,
    marginTop: -50,
    marginBottom: 40,
    gap: 10,
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
