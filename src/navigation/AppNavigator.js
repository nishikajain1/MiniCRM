import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomerStackNavigator from './CustomerStackNavigator';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'CustomersTab') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'chart-bar' : 'chart-bar';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="CustomersTab"
        component={CustomerStackNavigator}
        options={{ title: 'Customers' }}
      />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;