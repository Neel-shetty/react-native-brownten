import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
//@ts-ignore
import PlusIcon from '../../../assets/icons/commons/plus.svg';
import {useNavigation} from '@react-navigation/native';
import {ProductPreviewType} from '../../screens/tabs/Home';
import Icon from 'react-native-vector-icons/EvilIcons';
import {useDispatch} from 'react-redux';
import {setBottomSheetShown} from '../../store/uiTrigger';
import {ProductProps} from '../../screens/ProductScreen';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const FoodCard = ({item}: {item: ProductPreviewType | ProductProps}) => {
  // console.log('🚀 ~ file: FoodCard.js:11 ~ FoodCard ~ slug:', slug);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        //@ts-ignore
        navigation.navigate('ProductScreen', {slug: item.slug});
      }}
      style={styles.card}>
      <View style={styles.imageBox}>
        <Image
          source={{
            uri: item.images[0],
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {item.name}
      </Text>
      <TouchableOpacity
        disabled={item.variants?.length > 1 ? false : true}
        onPress={() => {
          // if (item.variants.length > 1) {
          dispatch(setBottomSheetShown({shown: true, variants: item.variants}));
          // }
        }}>
        <View style={styles.menuContainer}>
          <Text style={styles.subtitle}>
            {item.variants ? item.variants[0]?.weight : null} g
          </Text>
          {item.variants?.length > 1 ? (
            <Icon name="chevron-down" size={24} />
          ) : null}
        </View>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.price}>
          ₹{item.variants ? item.variants[0].price : null}
        </Text>
        <TouchableOpacity onPress={() => null} style={styles.button}>
          <PlusIcon />
        </TouchableOpacity>
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
    padding: 5,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default FoodCard;
