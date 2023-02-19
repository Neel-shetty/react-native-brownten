import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProductList from '../components/SearchComponents/ProductList';

const SearchScreen = () => {
  return (
    <View style={styles.root}>
      <ProductList />
    </View>
  );
};

export default {name: 'SearchScreen', component: SearchScreen};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
