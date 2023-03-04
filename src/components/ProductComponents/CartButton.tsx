import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {colors} from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const CartButton = ({addItemToCart}: {addItemToCart: () => void}) => {
  const condition = false;
  if (condition) {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => null} style={styles.quantityContainer}>
          <Icon name="minus" size={24} color={'#B3B3B3'} />
        </TouchableOpacity>
        <View style={styles.button}>
          <Text style={styles.quantity}>1</Text>
        </View>
        <TouchableOpacity onPress={() => null} style={styles.quantityContainer}>
          <Icon name="plus" size={24} color={colors.green} />
        </TouchableOpacity>
      </View>
    );
  }
  return <AddToCart add={addItemToCart} />;
};

const AddToCart = ({add}: {add: () => void}) => {
  return (
    <TouchableOpacity onPress={add}>
      <View style={styles.greenButtonContainer}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  button: {
    borderColor: '#F0F0F0',
    borderWidth: 1,
    // width: 40,
    // height: 40,
    borderRadius: 15,
    // padding: 16,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityContainer: {
    marginHorizontal: 15,
  },
  quantity: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  greenButtonContainer: {
    height: 50,
    width: 150,
    backgroundColor: '#53B175',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'white',
  },
});
