import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FormInput from './FormInput';
import { FormInputProp, ResetPasswordProp } from '@/constants/types';

const ResetPasswordForm = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: ResetPasswordProp) => {
  const fields: FormInputProp[] = [
    {
      title: 'Password',
      placeholder: 'Enter your password',
      secureTextEntry: true,
      autoCapitalize: 'sentences',
      keyboardType: 'default',
      value: 'password',
      onChangeText: setPassword,
    },
    {
      title: 'Confirm Password',
      placeholder: 'Confirm your password',
      secureTextEntry: true,
      autoCapitalize: 'sentences',
      keyboardType: 'default',
      value: 'password',
      onChangeText: setConfirmPassword,
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

export default ResetPasswordForm;

const styles = StyleSheet.create({
  inputField: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 15,
    padding: 5,
  },
});
