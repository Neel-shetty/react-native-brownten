import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {layout} from '../../constants/Layout';
import CartItem from './CartItem';

const CartList = () => {
  return (
    <View style={styles.root}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={() => (
          <View style={{width: layout.width}}>
            <CartItem
              name={'Bell Pepper Red'}
              quantity={1}
              info={'1kg, Price'}
              cost={4.99}
              image="https://media.istockphoto.com/id/1130564105/photo/sweet-pepper-paprika-isolated-on-white-background-clipping-path-full-depth-of-field.jpg?s=612x612&w=0&k=20&c=m_01GdGMntpr6B3tiplqxbtPN8zTKN1xfucAaBu3Mkw="
            />
          </View>
        )}
        style={{width: layout.width}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CartList;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    width: layout.width,
  },
});
