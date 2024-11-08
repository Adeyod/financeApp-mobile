import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { UserState } from '@/constants/types';
import LoadingSpinner from '@/components/LoadingSpinner';

const Home = () => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useLayoutEffect(() => {
    if (!isFirstLoad) return;

    const handleNavigation = () => {
      if (currentUser) {
        router.push('/(tabs)/');
      } else {
        setTimeout(() => {
          router.push('/auth/welcome');
        }, 3000);
      }
      setIsFirstLoad(false);
    };

    requestAnimationFrame(handleNavigation);
  }, [currentUser, isFirstLoad]);

  if (isFirstLoad) {
    return <LoadingSpinner loading={isFirstLoad} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {!currentUser && (
        <>
          <Animated.View>
            <Text style={styles.upperText}>Fund Flow</Text>
          </Animated.View>
          <LottieView
            autoPlay
            style={styles.lottieStyle}
            source={require('../assets/images/Animation - 1725014070182.json')}
          />
          <Text style={styles.bottomText}>Online banking made easy</Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
  },
  lottieStyle: {
    width: 350,
    height: 400,
    marginVertical: 50,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  upperText: {
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#5067BF',
  },
  bottomText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'gray',
    fontStyle: 'italic',
  },
});
