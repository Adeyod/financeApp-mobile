import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import {
  FormInputProp,
  RegisterFormInputProp,
  RegisterFromProp,
} from '@/constants/types';

type RegisterFormProps = {
  formData: RegisterFromProp;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFromProp>>;
};

const RegisterForm = ({ formData, setFormData }: RegisterFormProps) => {
  const fields: RegisterFormInputProp[] = [
    {
      title: 'first name',
      placeholder: 'Enter your first name',
      secureTextEntry: false,
      autoCapitalize: 'none',
      keyboardType: 'default',
      value: formData.first_name,
      key: 'first_name',
    },
    {
      title: 'last name',
      placeholder: 'Enter your last name',
      secureTextEntry: false,
      autoCapitalize: 'none',
      keyboardType: 'default',
      value: formData.last_name,
      key: 'last_name',
    },
    {
      title: 'user name',
      placeholder: 'Enter your user name',
      secureTextEntry: false,
      autoCapitalize: 'none',
      keyboardType: 'default',
      value: formData.user_name,
      key: 'user_name',
    },

    {
      title: 'email',
      placeholder: 'Enter your email address',
      secureTextEntry: false,
      autoCapitalize: 'none',
      keyboardType: 'email-address',
      value: formData.email,
      key: 'email',
    },
    {
      title: 'Password',
      placeholder: 'Enter your password',
      secureTextEntry: true,
      autoCapitalize: 'none',
      keyboardType: 'default',
      value: formData.password,
      key: 'password',
    },
    {
      title: 'Confirm Password',
      placeholder: 'Confirm password',
      secureTextEntry: true,
      autoCapitalize: 'sentences',
      keyboardType: 'default',
      value: formData.confirm_password,
      key: 'confirm_password',
    },
  ];

  const handleInputChange = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  return (
    <View>
      {fields.map((field) => (
        <View key={field.key} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={field.placeholder}
            secureTextEntry={field.secureTextEntry}
            autoCapitalize={field.autoCapitalize}
            keyboardType={field.keyboardType}
            value={field.value}
            onChangeText={(value) => handleInputChange(field.key, value)}
          />
          <Text>{field.title}</Text>
        </View>
      ))}
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
  },
});
