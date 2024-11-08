import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

type TextType = {
  text: string;
};
const BlinkingText = ({ text }: TextType) => {
  const blinkOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    blinkAnimation.start();

    return () => blinkAnimation.stop();
  }, [blinkOpacity]);

  return (
    <Animated.Text
      style={[
        {
          opacity: blinkOpacity,
        },
        styles.blinkingText,
      ]}
    >
      {text}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  blinkingText: {
    backgroundColor: 'red',
    padding: 10,
    color: 'white',
    textTransform: 'uppercase',
    borderRadius: 8,
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});

export default BlinkingText;
