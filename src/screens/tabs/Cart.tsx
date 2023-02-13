import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import CartList from '../../components/CartComponents/CartList';
import Button from '../../components/Button';
import {colors} from '../../constants/colors';
import {layout} from '../../constants/Layout';

const CartTab = () => {
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Header title={'My Cart'} />
      </View>
      <View style={styles.listContainer}>
        <CartList />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="Order"
          bgColour={colors.green}
          onPress={() => {}}
          txtColour="white"
        />
      </View>
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
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink',
    width: layout.width,
    maxHeight: 60,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
  },
  listContainer: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 2,
    width: layout.widthp,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 70,
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
});
