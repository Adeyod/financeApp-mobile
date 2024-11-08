import { View, Text, KeyboardTypeOptions } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { FormInputProp } from '@/constants/types';

const FormInput = ({
  title,
  style,
  placeholder,
  value,
  onChangeText,
  autoCapitalize,
  keyboardType,
  secureTextEntry,
}: FormInputProp) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        style={style}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default FormInput;
