/*eslint eqeqeq:0*/
import React from 'react';
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

const {Navigator, Screen} = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => {
  return (
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
            case SearchScreen.name:
              return;
            case ProductScreen.name:
              return;
            default:
              return <tabIcons.ShopIcon color={color} />;
          }
        },
        tabBarIconStyle:
          route.name === ProductScreen.name ? {display: 'none'} : null,
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
      <Screen name={Home.name} component={Home.component} />
      <Screen name={Explore.name} component={Explore.component} />
      <Screen name={Cart.name} component={Cart.component} />
      <Stack.Screen
        name={ProductScreen.name}
        component={ProductScreen.component}
      />
      {/* <Screen name={Favourite.name} component={Favourite.component} /> */}
      <Screen name={Account.name} component={Account.component} />
    </Navigator>
  );
};

export default {component: Tabs, name: 'Tabs'};
