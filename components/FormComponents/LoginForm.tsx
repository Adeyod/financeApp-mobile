import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FormInput from './FormInput';
import { FormInputProp, LoginFormProp } from '@/constants/types';

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
}: LoginFormProp) => {
  const fields: FormInputProp[] = [
    {
      title: 'Email or Username',
      placeholder: 'Enter your email or username',
      secureTextEntry: false,
      autoCapitalize: 'none',
      keyboardType: 'email-address',
      value: 'email',
      onChangeText: setEmail,
    },
    {
      title: 'Password',
      placeholder: 'Enter your password',
      secureTextEntry: true,
      autoCapitalize: 'sentences',
      keyboardType: 'default',
      value: 'password',
      onChangeText: setPassword,
    },
  ];
  return (
    <View>
      {fields.map((field, index) => (
        <View
          style={{
            marginVertical: 10,
          }}
          key={index}
        >
          <FormInput
            style={styles.inputField}
            placeholder={field.placeholder}
            value={field.value}
            secureTextEntry={field.secureTextEntry}
            autoCapitalize={field.autoCapitalize}
            keyboardType={field.keyboardType}
            onChangeText={field.onChangeText}
          />
          <Text>{field.title}</Text>
        </View>
      ))}
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  inputField: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 15,
    padding: 5,
  },
});
