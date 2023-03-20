import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AddressScreen from '../screens/AddressScreen';
import AccountDetailsScreen from '../screens/AccountDetailsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import PasswordUpdateScreen from '../screens/PasswordUpdateScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import Account from '../screens/tabs/Account';
import SignUp from '../screens/SignUp';
import OtpScreen from '../screens/OtpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import SignIn from '../screens/SignIn';

const Stack = createStackNavigator();

const AccountTabs = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Account.name} component={Account.component} />
      <Stack.Screen
        name={AddressScreen.name}
        component={AddressScreen.component}
      />
      <Stack.Screen
        name={AccountDetailsScreen.name}
        component={AccountDetailsScreen.component}
      />
      <Stack.Screen
        name={OrdersScreen.name}
        component={OrdersScreen.component}
      />
      <Stack.Screen
        name={AddAddressScreen.name}
        component={AddAddressScreen.component}
      />
      <Stack.Screen
        name={PasswordUpdateScreen.name}
        component={PasswordUpdateScreen.component}
      />
      <Stack.Screen
        name={OrderDetailScreen.name}
        component={OrderDetailScreen.component}
      />
      <Stack.Screen name={SignIn.name} component={SignIn.component} />
      <Stack.Screen name={SignUp.name} component={SignUp.component} />
      <Stack.Screen name={OtpScreen.name} component={OtpScreen.component} />
      <Stack.Screen
        name={ForgotPasswordScreen.name}
        component={ForgotPasswordScreen.component}
      />
      <Stack.Screen
        name={ResetPasswordScreen.name}
        component={ResetPasswordScreen.component}
      />
    </Stack.Navigator>
  );
};

export default {component: AccountTabs, name: 'Account'};
