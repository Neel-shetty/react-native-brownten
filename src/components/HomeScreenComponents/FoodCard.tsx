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

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const FoodCard = ({item}: {item: ProductPreviewType | ProductProps}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [variants, setVariants] = useState<dropdownDataType[]>([]);
  const [currentVariant, setCurrentVariant] = useState<variantType>();

  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const globalQuantity = useSelector((state: RootState) => {
    const item = state.cart.cartItems.find(
      item => item.variant.item.variant_id === currentVariant?.variant_id,
    );
    if (item) {
      return item.variant.quantity;
    }
  });

  function addItemToCart() {
    if (!currentVariant) {
      return;
    }
    dispatch(
      addToCart({
        id: item.id,
        image: item.images[0],
        name: item.name,
        variant: {item: currentVariant, quantity: 1},
      }),
    );
  }
  function increase() {
    if (!currentVariant) {
      return;
    }
    dispatch(incrementQuantity({pId: item.id, vId: currentVariant.variant_id}));
  }
  function decrease() {
    if (!currentVariant) {
      return;
    }
    dispatch(decrementQuantity({pId: item.id, vId: currentVariant.variant_id}));
  }

  useEffect(() => {
    function createVariantsData() {
      if (!item.variants) {
        return;
      }
      const dropdownData = item?.variants?.map(vari => {
        return {
          label: `${vari.weight}${vari.unit}`,
          value: vari,
        };
      });
      setVariants(dropdownData);
    }
    createVariantsData();
  }, [item?.variants]);

  useEffect(() => {
    const idk: variantType = {
      price: 'error',
      selling_price: 'error',
      weight: 'error',
      qty: 0,
      variant_id: 0,
      unit: '.',
    };
    setCurrentVariant(item?.variants ? item?.variants[0] : idk);
  }, [item?.variants]);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductScreen', {slug: item.slug});
      }}
      style={styles.card}>
      <View style={styles.imageBox}>
        <Image
          source={{
            uri: item.images[0],
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {item.name}
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: colors.green}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={styles.containerStyle}
        iconStyle={styles.iconStyle}
        data={variants}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={`${currentVariant?.weight}${currentVariant?.unit}`}
        searchPlaceholder="Search..."
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={itm => {
          setIsFocus(false);
          setCurrentVariant(itm.value);
        }}
        disable={item?.variants?.length > 1 ? false : true}
        renderRightIcon={item?.variants?.length > 1 ? undefined : () => null}
      />
      <View style={styles.footer}>
        {!globalQuantity ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: widthScreen * 0.42 - 30,
              alignItems: 'center',
            }}>
            <Text style={styles.price}>
              ₹{currentVariant ? currentVariant.selling_price : null}
            </Text>
            <TouchableOpacity onPress={addItemToCart} style={styles.button}>
              <PlusIcon />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={decrease}
                style={styles.quantityContainer}>
                <Icon name="minus" size={24} color={'#B3B3B3'} />
              </TouchableOpacity>
              <View style={styles.button2}>
                <Text style={styles.quantity}>{globalQuantity}</Text>
              </View>
              <TouchableOpacity
                onPress={increase}
                style={styles.quantityContainer}>
                <Icon name="plus" size={24} color={colors.green} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
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
    color: 'black',
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

export default FoodCard;
