import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {layout} from '../../constants/Layout';
import CartItem from './CartItem';
import {useSelector} from 'react-redux';
import {cartItemType} from '../../store/cart';
import {RootState} from '../../store';

const CartList = () => {
  const items: cartItemType[] = useSelector(
    (state: RootState) => state.cart.cartItems,
  );
  console.log('🚀 ~ file: CartList.tsx:9 ~ CartList ~ items:', items);
  return (
    <View style={styles.root}>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <View
            style={{
              width: layout.width,
            }}>
            <CartItem
              name={item.name}
              quantity={item.variant.quantity}
              info={`${item.variant.item.weight} ${item.variant.item.unit}`}
              cost={item.variant.item.price}
              image={item.image}
              id={item.id}
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
    width: layout.width,
    flex: 1,
  },
});
