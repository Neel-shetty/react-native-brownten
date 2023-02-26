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

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

interface dropdownDataType {
  label: string;
  value: variantType;
}

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const FoodCard = ({item}: {item: ProductPreviewType | ProductProps}) => {
  const [value, setValue] = useState<string>('');
  // console.log('🚀 ~ file: FoodCard.tsx:29 ~ FoodCard ~ value:', value);
  const [isFocus, setIsFocus] = useState(false);
  const [variants, setVariants] = useState<dropdownDataType[]>([]);
  const [currentVariant, setCurrentVariant] = useState<variantType>();

  // console.log('🚀 ~ file: FoodCard.js:11 ~ FoodCard ~ slug:', slug);
  const navigation: any = useNavigation();

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
        />
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {item.name}
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'green'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={variants}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={`${currentVariant?.weight}${currentVariant?.unit}`}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          setCurrentVariant(item.value);
        }}
        disable={item?.variants?.length > 1 ? false : true}
        renderRightIcon={item?.variants?.length > 1 ? undefined : () => null}
      />
      {/* <TouchableOpacity
        disabled={item.variants?.length > 1 ? false : true}
        onPress={() => {
          console.log('pressed');
        }}>
        <View style={styles.menuContainer}>
          <Text style={styles.subtitle}>
            {item.variants ? item.variants[0]?.weight : null} g
          </Text>
          {item.variants?.length > 1 ? (
            <Icon name="chevron-down" size={24} />
          ) : null}
        </View>
      </TouchableOpacity> */}
      <View style={styles.footer}>
        <Text style={styles.price}>
          ₹{currentVariant ? currentVariant.price : null}
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
});

export default FoodCard;
