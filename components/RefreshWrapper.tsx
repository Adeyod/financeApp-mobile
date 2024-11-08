import { FlatList, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import { RefreshWrapperProps } from '@/constants/types';

const RefreshWrapper: React.FC<RefreshWrapperProps> = ({ children }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  if (React.isValidElement(children) && children.type === FlatList) {
    return React.cloneElement(children as React.ReactElement<any>, {
      refreshControl: (
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      ),
    });
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      {children}
    </ScrollView>
  );
};

export default RefreshWrapper;
