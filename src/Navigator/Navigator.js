import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import theme from '../theme';
import Onboarding from '../screens/Onboarding';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Tabs from '../screens/Tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OrderAccepted from '../screens/status/OrderAccepted';
import ProductScreen from '../screens/ProductScreen';
import SearchScreen from '../screens/SearchScreen';
import MapScreen from '../screens/MapScreen';
import OtpScreen from '../screens/OtpScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName={OrderAccepted.name}
          screenOptions={{
            headerShown: false,
          }}>
          {
            <>
              <Stack.Screen
                name={Onboarding.name}
                component={Onboarding.component}
              />
              <Stack.Screen name={SignIn.name} component={SignIn.component} />
              <Stack.Screen name={SignUp.name} component={SignUp.component} />
              <Stack.Screen name={Tabs.name} component={Tabs.component} />
              <Stack.Screen
                name={ProductScreen.name}
                component={ProductScreen.component}
              />
              <Stack.Screen
                name={OrderAccepted.name}
                component={OrderAccepted.component}
              />
              <Stack.Screen
                name={SearchScreen.name}
                component={SearchScreen.component}
              />
              <Stack.Screen
                name={MapScreen.name}
                component={MapScreen.component}
              />
              <Stack.Screen
                name={OtpScreen.name}
                component={OtpScreen.component}
              />
            </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

EStyleSheet.build({...theme});

export default Navigator;
