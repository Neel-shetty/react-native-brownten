import {StyleSheet} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigator from './src/Navigator/Navigator';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <Navigator />
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
