import 'react-native-gesture-handler';
import React, {useLayoutEffect} from 'react';
import {StatusBar} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import theme from '../theme';
import Onboarding from '../screens/Onboarding';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
// import Tabs from '../screens/Tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OrderAccepted from '../screens/status/OrderAccepted';
import ProductScreen from '../screens/ProductScreen';
import SearchScreen from '../screens/SearchScreen';
import MapScreen from '../screens/MapScreen';
import OtpScreen from '../screens/OtpScreen';
import {useSelector, useDispatch} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import {setLoggedIn} from '../store/user';
import CategoryScreen from '../screens/CategoryScreen';
import SubCategoryScreen from '../screens/SubCategoryScreen';
import AddressScreen from '../screens/AddressScreen';
import AccountDetailsScreen from '../screens/AccountDetailsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import PasswordUpdateScreen from '../screens/PasswordUpdateScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import RazorPayScreen from '../screens/RazorPayScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import Home from '../screens/tabs/Home';
import ExploreTabs from './ExploreTabs';

const Stack = createStackNavigator();

const Navigator = () => {
  // const dispatch = useDispatch();
  // const loggedIn = useSelector(state => state.user.loggedIn);
  // console.log('🚀 ~ file: Navigator.js:23 ~ Navigator ~ loggedIn', loggedIn);

  // useLayoutEffect(() => {
  //   async function checkLogin() {
  //     const result = await EncryptedStorage.getItem('isLoggedIn');
  //     console.log('🚀 ~ file: Navigator.js:28 ~ checkLogin ~ result', result);
  //     if (result === 'true') {
  //       dispatch(setLoggedIn(true));
  //     }
  //   }
  //   checkLogin();
  // }, [loggedIn, dispatch]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <NavigationContainer> */}
      <Stack.Navigator
        // initialRouteName={Tabs.name}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={Home.name} component={Home.component} />
        <Stack.Screen name={Onboarding.name} component={Onboarding.component} />
        <Stack.Screen
          name={ProductScreen.name}
          component={ProductScreen.component}
        />
        <Stack.Screen
          name={OrderAccepted.name}
          component={OrderAccepted.component}
        />
        <Stack.Screen
          name={ExploreTabs.name}
          component={ExploreTabs.component}
        />
      </Stack.Navigator>
    </>
  );
};

EStyleSheet.build({...theme});

export default {component: Navigator, name: 'Home'};
