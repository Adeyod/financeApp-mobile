import { Alert, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import useApi from '@/hooks/apiCalls';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Link, router } from 'expo-router';
import Toast from 'react-native-toast-message';

const VerificationScreen = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const { reference } = route.params as { reference: string };
  const { callbackResult } = useApi();

  console.log('REFERENCE:', reference);

  const handleCallback = async () => {
    try {
      if (reference === null) {
        return null;
      }
      const data = await callbackResult(reference);
      console.log('data:', data);

      if (data) {
        Toast.show({
          type: 'success',
          text1: data.message,
        });
        setSuccess(true);
        router.replace('/');
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        setFailure(true);
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        });
      } else {
        console.error('An error occurred:', error);
        Toast.show({
          type: 'error',
          text1: 'An error occurred:',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCallback();
  }, []);
  return (
    <View style={styles.mainContainerStyle}>
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        failure && (
          <View>
            <Text>Failed to credit account</Text>
            <Text>If you are not redirected in 5 sec, click this</Text>
            <Link href="/credit/credit-account">Add Money</Link>
          </View>
        )
      )}
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  mainContainerStyle: {
    marginTop: 100,
  },
  successContainerStyle: {
    marginTop: 100,
  },
});
