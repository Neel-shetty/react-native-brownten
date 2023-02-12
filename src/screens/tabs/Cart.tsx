import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import CartList from '../../components/CartComponents/CartList';

const CartTab = () => {
  return (
    <View style={styles.root}>
      <Header title={'My Cart'} />
      <CartList name={'test'} />
    </View>
  );
};

export default {component: CartTab, name: 'Cart'};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});
