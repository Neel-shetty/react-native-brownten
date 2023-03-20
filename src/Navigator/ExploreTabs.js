import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SubCategoryScreen from '../screens/SubCategoryScreen';
import SearchScreen from '../screens/SearchScreen';
import Explore from '../screens/tabs/Explore';

const Stack = createStackNavigator();

const ExploreTabs = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Explore.name} component={Explore.component} />
      <Stack.Screen
        name={SubCategoryScreen.name}
        component={SubCategoryScreen.component}
      />
      <Stack.Screen
        name={SearchScreen.name}
        component={SearchScreen.component}
      />
    </Stack.Navigator>
  );
};

export default {component: ExploreTabs, name: 'Explore'};

const styles = StyleSheet.create({});
