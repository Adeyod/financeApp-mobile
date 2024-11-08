// Example of LoadingIndicator component
import { Colors } from '@/constants/Colors';
import { View, Text, ActivityIndicator } from 'react-native';

const LoadingIndicator = () => {
  return (
    <View
      style={
        {
          // flex: 1,
          // justifyContent: 'center',
          // position: 'absolute',
          // alignItems: 'center',
          // display: 'flex',
        }
      }
    >
      <ActivityIndicator size="small" color={Colors.light.text} />
    </View>
  );
};

export default LoadingIndicator;
