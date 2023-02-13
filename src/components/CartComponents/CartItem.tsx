import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {layout} from '../../constants/Layout';
import {colors} from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        <View style={styles.idkContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.info}>{info}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => null} style={styles.button}>
              {/* <PlusIcon /> */}
              <Icon name="minus" size={24} color={'#B3B3B3'} />
            </TouchableOpacity>
            <View style={styles.quantityContainer}>
              <Text style={styles.name}>{quantity}</Text>
            </View>
            <TouchableOpacity onPress={() => null} style={styles.button}>
              {/* <PlusIcon /> */}
              <Icon name="plus" size={24} color={colors.green} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Ionicons name="close" size={24} color={'#B3B3B3'} />
          <Text style={styles.cost}>${cost}</Text>
        </View>
      </View>
      {/* <View style={styles.priceContainer}>
        <Ionicons name="close" size={24} color={'#B3B3B3'} />
        <Text style={styles.cost}>${cost}</Text>
      </View> */}
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
    height: 140,
    flexDirection: 'row',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
  },
  image: {
    height: 90,
    width: 90,
  },
  imageContainer: {
    flex: 2,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleContainer: {
    flex: 4,
    flexDirection: 'row',
    // backgroundColor: 'violet',
  },
  idkContainer: {
    flex: 3,
    // backgroundColor: 'pink',
  },
  priceContainer: {
    flex: 1,
    // backgroundColor: 'coral',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 5,
    // height: 150,
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
    color: 'black',
  },
  button: {
    borderColor: '#F0F0F0',
    borderWidth: 1,
    // width: 40,
    // height: 40,
    borderRadius: 15,
    padding: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityContainer: {
    marginHorizontal: 15,
  },
});