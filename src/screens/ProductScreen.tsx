import {StyleSheet, View} from 'react-native';
import React from 'react';
import ProductHeader from '../components/ProductComponents/ProductHeader';
import Details from '../components/ProductComponents/Details';

const ProductScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <ProductHeader />
      </View>
      <View style={styles.detailContainer}>
        <Details />
      </View>
    </View>
  );
};

export default {name: 'ProductScreen', component: ProductScreen};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headerContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    // backgroundColor: 'pink',
  },
  detailContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});
