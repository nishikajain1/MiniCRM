import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomerListScreen from '../screens/Customers/CustomerListScreen';
import CustomerDetailsScreen from '../screens/Customers/CustomerDetailsScreen';
import AddEditCustomerScreen from '../screens/Customers/AddEditCustomerScreen';
import AddEditLeadScreen from '../screens/Leads/AddEditLeadScreen';

const Stack = createNativeStackNavigator();

const CustomerStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CustomerList" component={CustomerListScreen} options={{ title: 'Customers' }} />
            <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} options={{ title: 'Customer Details' }} />
            <Stack.Screen name="AddEditCustomer" component={AddEditCustomerScreen} />
            <Stack.Screen name="AddEditLead" component={AddEditLeadScreen} />
        </Stack.Navigator>
    );
};

export default CustomerStackNavigator;