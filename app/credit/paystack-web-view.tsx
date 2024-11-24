import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { router } from 'expo-router';

type RootVerificationParam = {
  'verification-screen': { reference: string };
};

type NavigationProp = StackNavigationProp<
  RootVerificationParam,
  'verification-screen'
>;

export default function PaystackWebViewScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { authorization_url } = route.params as { authorization_url: string };

  const callback_url = 'https://financeapp-web.onrender.com/call-back';

  const onNavigationStateChange = (state: any) => {
    const { url } = state;

    console.log('URL:', url);

    if (!url) return;

    if (url.startsWith(callback_url)) {
      const parsedUrl = new URL(url);
      const referenceParam = parsedUrl.searchParams.get('reference');
      if (referenceParam) {
        console.log('Extracted Reference:', referenceParam);
        navigation.navigate('verification-screen', {
          reference: referenceParam,
        });
        return;
      }
    }
  };

  return (
    <WebView
      source={{ uri: authorization_url }}
      style={{ marginTop: 40 }}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
}
