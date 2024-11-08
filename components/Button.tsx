import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

type ButtonProps = {
  title: string;
  loading: boolean;
  buttonContainerStyle: ViewStyle;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
  handleSubmit: () => void;
};

const Button: React.FC<ButtonProps> = ({
  title,
  loading,
  handleSubmit,
  buttonContainerStyle,
  buttonStyle,
  buttonTextStyle,
}) => {
  return (
    <View style={buttonContainerStyle}>
      <TouchableOpacity
        disabled={loading}
        style={buttonStyle}
        onPress={handleSubmit}
      >
        <Text style={buttonTextStyle}>
          {loading ? 'Loading...' : `${title}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({});
