import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthFromStorage } from '../store/slices/authSlice';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import SplashScreen from '../screens/Common/SplashScreen';
import { useTheme } from 'react-native-paper';

const RootNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  // This effect runs once on app startup to check for a persisted session.
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userString = await AsyncStorage.getItem('user');
        if (token && userString) {
          const user = JSON.parse(userString);
          // If a token exists, update the Redux store
          dispatch(setAuthFromStorage({ user, token }));
        }
      } catch (e) {
        console.error('Failed to load auth state.', e);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, [dispatch]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer theme={theme}>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;