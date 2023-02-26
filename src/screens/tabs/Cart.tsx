import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CartList from '../../components/CartComponents/CartList';
import Button from '../../components/Button';
import {colors} from '../../constants/colors';
import {layout} from '../../constants/Layout';
import EStyleSheet from 'react-native-extended-stylesheet';

const CartTab = () => {
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Text style={eStyles.text}>My cart</Text>
      </View>
      <View style={styles.listContainer}>
        <CartList />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="Go To Checkout"
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
    width: layout.width,
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
    width: layout.width,
  },
  buttonContainer: {
    // flex: 2,
    width: layout.widthp,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 70,
    marginBottom: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
});

const eStyles = EStyleSheet.create({
  text: {
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: '1.125rem',
  },
});
