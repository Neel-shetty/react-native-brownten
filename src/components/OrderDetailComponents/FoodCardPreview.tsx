import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
//@ts-ignore
import PlusIcon from '../../../assets/icons/commons/plus.svg';
import {useNavigation} from '@react-navigation/native';
import {ProductPreviewType, variantType} from '../../screens/tabs/Home';
// import Icon from 'react-native-vector-icons/EvilIcons';
// import {useDispatch} from 'react-redux';
import {ProductProps} from '../../screens/ProductScreen';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from '../../store/cart';

interface dropdownDataType {
  label: string;
  value: variantType;
}

interface PropType {
  item: {
    item_name: string;
    item_price: string;
    item_qty: string;
    image: string;
    item_weight: string;
  };
}

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const FoodCardPreview = ({item}: PropType) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageBox}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {item.item_name}
      </Text>
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={styles.containerStyle}
        iconStyle={styles.iconStyle}
        data={[]}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={`${item.item_weight}`}
        searchPlaceholder="Search..."
        disable={true}
        renderRightIcon={() => null}
        onChange={() => {}}
      />
      <View style={styles.footer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: widthScreen * 0.42 - 30,
            alignItems: 'center',
          }}>
          <Text style={styles.price}>₹{item.item_price}</Text>
          <View style={styles.button2}>
            <Text style={styles.quantity}>{item.item_qty}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  card: {
    width: widthScreen * 0.42,
    maxHeight: heightScreen * 0.28,
    borderWidth: 1.0,
    borderColor: '$lightGreyColour',
    borderRadius: 10.0,
    padding: 15.0,
    flexDirection: 'column',
    marginRight: 15.0,
    marginBottom: 10,
    alignItems: 'center',
  },
  imageBox: {
    height: heightScreen * 0.11,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: '$blackColour',
    fontFamily: '$gilroyNormal600',
    fontSize: '1rem',
    marginBottom: 5,
  },
  subtitle: {
    color: '$darkGreyColour',
    fontFamily: '$gilroyMedium',
    fontSize: '0.825rem',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: heightScreen * 0.02,
  },
  price: {
    color: '$blackColour',
    fontFamily: '$gilroyNormal600',
    fontSize: '1.125rem',
  },
  button: {
    backgroundColor: '$greenColour',
    borderRadius: 15.0,
    padding: 12.0,
  },
  image: {
    height: heightScreen * 0.1,
    width: widthScreen * 0.3,
    borderRadius: 10,
  },
  menuContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '$lightGreyColour',
    // padding: 5,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  dropdown: {
    height: 30,
    borderColor: '$lightGreyColour',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    width: widthScreen * 0.42 - 30,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 12,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 12,
    color: 'black',
  },
  button2: {
    borderColor: '#F0F0F0',
    borderWidth: 1,
    // width: 40,
    // height: 40,
    borderRadius: 15,
    // padding: 16,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justfyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
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
  containerStyle: {
    marginTop: 5,
    borderRadius: 10,
  },
});

export default FoodCardPreview;
