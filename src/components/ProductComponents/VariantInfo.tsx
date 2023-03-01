import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {layout} from '../../constants/Layout';
import {variantType} from '../../screens/tabs/Home';

const VariantInfo = ({
  selected,
  variant,
}: {
  selected: boolean;
  variant: variantType;
}) => {
  return (
    <View style={[styles.root, selected ? styles.greenBorder : null]}>
      <View style={styles.weightContainer}>
        <Text style={styles.weight}>
          {variant.weight} {variant.unit}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        {variant.selling_price === variant.price ? null : (
          <Text style={styles.discountPrice}>{variant.price}</Text>
        )}
        <View style={styles.padding} />
        <Text style={styles.price}>{variant.selling_price}</Text>
      </View>
    </View>
  );
};

export default VariantInfo;

const styles = StyleSheet.create({
  root: {
    width: layout.widthp,
    height: 57,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greenBorder: {
    borderColor: '#53B175',
  },
  weightContainer: {
    paddingLeft: 10,
  },
  weight: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    justifyContent: 'center',
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
  },
  discountPrice: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#7C7C7C',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  padding: {
    marginHorizontal: 2.5,
  },
});
