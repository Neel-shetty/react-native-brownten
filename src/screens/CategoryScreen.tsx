import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CategoryScreen = () => {
  return (
    <View style={styles.root}>
      <Text>CategoryScreen</Text>
    </View>
  );
};

export default {component: CategoryScreen, name: 'CategoryScreen'};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
