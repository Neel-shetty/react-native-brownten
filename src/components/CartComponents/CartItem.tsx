import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {layout} from '../../constants/Layout';
// @ts-ignore
import PlusIcon from '../../../assets/icons/commons/plus.svg';
import {colors} from '../../constants/colors';

interface props {
  name: string;
  quantity: number;
  info: string;
  cost: number;
  image: string;
}

const CartItem = ({name, quantity, info, cost, image}: props) => {
  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.image} />
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.info}>{info}</Text>
        <TouchableOpacity onPress={() => null} style={styles.button}>
          <PlusIcon />
        </TouchableOpacity>
        <Text>{quantity}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.cost}>${cost}</Text>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: layout.widthp,
    height: 160,
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 100,
  },
  imageContainer: {
    flex: 1.5,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleContainer: {
    flex: 3,
    backgroundColor: 'violet',
  },
  priceContainer: {
    flex: 1,
    backgroundColor: 'coral',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'black',
  },
  info: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#7C7C7C',
  },
  cost: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#7C7C7C',
  },
  button: {
    color: colors.green,
    width: 40,
    height: 40,
  },
});
