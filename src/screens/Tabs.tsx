/*eslint eqeqeq:0*/
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './tabs/Home';
import Account from './tabs/Account';
import Cart from './tabs/Cart';
import Explore from './tabs/Explore/Explore';
import Favourite from './tabs/Favourite';
import {tabIcons} from '../helpers/Icons';

const {Navigator, Screen} = createBottomTabNavigator();

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
      <Screen name={Home.name} component={Home.component} />
      <Screen name={Explore.name} component={Explore.component} />
      <Screen name={Cart.name} component={Cart.component} />
      <Screen name={Favourite.name} component={Favourite.component} />
      <Screen name={Account.name} component={Account.component} />
    </Navigator>
  );
};

export default {component: Tabs, name: 'Tabs'};
