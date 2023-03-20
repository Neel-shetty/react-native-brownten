/*eslint eqeqeq:0*/
import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './tabs/Home';
import Account from './tabs/Account';
import Cart from './tabs/Cart';
import Explore from './tabs/Explore';
import Favourite from './tabs/Favourite';
import {tabIcons} from '../helpers/Icons';
import SearchScreen from './SearchScreen';
import {createStackNavigator} from '@react-navigation/stack';
import ProductScreen from './ProductScreen';
import OrderAccepted from '../screens/status/OrderAccepted';
import {useSelector, useDispatch} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import {setLoggedIn} from '../store/user';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from '../Navigator/Navigator';

const {Navigator, Screen} = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.user.loggedIn);
  console.log('🚀 ~ file: Navigator.js:23 ~ Navigator ~ loggedIn', loggedIn);

  useLayoutEffect(() => {
    async function checkLogin() {
      const result = await EncryptedStorage.getItem('isLoggedIn');
      console.log('🚀 ~ file: Navigator.js:28 ~ checkLogin ~ result', result);
      if (result === 'true') {
        dispatch(setLoggedIn(true));
      }
    }
    checkLogin();
  }, [loggedIn, dispatch]);

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={({route}) => ({
          /*eslint-disable*/
          tabBarIcon: ({color}) => {
            switch (route.name) {
              case Home.name:
                return <tabIcons.ShopIcon color={color} />;
              case Account.name:
                return <tabIcons.PersonIcon color={color} />;
              case Cart.name:
                return <tabIcons.CartIcon color={color} />;
              case Explore.name:
                return <tabIcons.ExploreSearchIcon color={color} />;
              case Favourite.name:
                return <tabIcons.HeartIcon color={color} />;
              default:
                return <tabIcons.ShopIcon color={color} />;
            }
          },
          tabBarActiveTintColor: '#53B175',
          tabBarInactiveTintColor: '#181725',
          tabBarLabelStyle: {
            fontFamily: 'Mulish-SemiBold',
            fontWeight: '600',
            fontSize: 12,
          },
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
          headerShown: false,
        })}>
        {/* <Stack.Screen
        name={OrdersScreen.name}
        component={OrdersScreen.component}
      /> */}
        <Screen name={'Home'} component={StackNavigator} />
        <Screen name={Explore.name} component={Explore.component} />
        <Screen name={Cart.name} component={Cart.component} />
        {/* <Screen name={Favourite.name} component={Favourite.component} /> */}
        <Screen name={Account.name} component={Account.component} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Tabs;
