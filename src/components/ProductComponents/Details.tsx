import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {layout} from '../../constants/Layout';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import {ProductProps} from '../../screens/ProductScreen';
import VariantInfo from './VariantInfo';
import {variantType} from '../../screens/tabs/Home';
import CartButton from './CartButton';
import {useDispatch} from 'react-redux';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from '../../store/cart';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

interface Details {
  product: ProductProps;
}

interface selectVariant {
  selected: boolean;
  variant: variantType;
  quantity: number;
}

const Details = ({product}: Details) => {
  const [variants, setvariants] = useState<selectVariant[]>([
    {
      selected: true,
      variant: product.variants[0],
      quantity: 0,
    },
  ]);
  const [currentVariant, setCurrentVariant] = useState<{
    item: variantType;
    quantity: number;
  }>({item: product.variants[0], quantity: 0});
  console.log(
    '🚀 ~ file: Details.tsx:38 ~ Details ~ currentVariant:',
    currentVariant,
  );
  // const [quantity, setQuantity] = useState(0);
  const itemInCart = useSelector((state: RootState) =>
    state.cart.cartItems.find(item => {
      if (
        item.id === product.id &&
        item.variant.item.variant_id === currentVariant.item.variant_id
      ) {
        return true;
      }
      return undefined;
    }),
  );

  const globalQuantity = useSelector((state: RootState) => {
    const item = state.cart.cartItems.find(
      item => item.variant.item.variant_id === currentVariant.item.variant_id,
    );
    if (item) {
      return item.variant.quantity;
    }
  });
  console.log(
    '🚀 ~ file: Details.tsx:63 ~ globalQuantity ~ globalQuantity:',
    globalQuantity,
  );

  const dispatch = useDispatch();
  function addItemToCart() {
    dispatch(
      addToCart({
        id: product.id,
        image: product.images[0],
        name: product.name,
        variant: {item: currentVariant.item, quantity: 1},
      }),
    );
  }
  function increase() {
    dispatch(
      incrementQuantity({pId: product.id, vId: currentVariant.item.variant_id}),
    );
  }
  function decrease() {
    dispatch(
      decrementQuantity({pId: product.id, vId: currentVariant.item.variant_id}),
    );
  }

  useEffect(() => {
    let tempArr: selectVariant[] = [];
    for (let i = 0; i < product.variants.length; i++) {
      if (i === 0) {
        tempArr.push({
          selected: true,
          variant: product.variants[i],
          quantity: 0,
        });
      } else {
        tempArr.push({
          selected: false,
          variant: product.variants[i],
          quantity: 0,
        });
      }
    }
    console.log('🚀 ~ file: Details.tsx:94 ~ useEffect ~ tempArr:', tempArr);
    setvariants(tempArr);
  }, [product.variants]);

  return (
    <ScrollView
      contentContainerStyle={styles.root}
      showsVerticalScrollIndicator={false}>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.titleSubContainer}>
            <View
              style={[styles.flex, {justifyContent: 'center', paddingTop: 10}]}>
              <Text style={styles.title}>{product.name}</Text>
            </View>
          </View>
          <Text style={styles.info}>
            {currentVariant.item?.weight + ' '}
            {currentVariant.item?.unit}
          </Text>
        </View>
        <View style={styles.secondContainer}>
          <CartButton
            addItemToCart={addItemToCart}
            increment={increase}
            decrement={decrease}
            itemInCart={itemInCart ? true : false}
            quantity={globalQuantity ? globalQuantity : 0}
          />
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              ₹{currentVariant.item?.selling_price}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.flex}>
        {variants.map((item, index) => {
          console.log(
            '🚀 ~ file: Details.tsx:126 ~ {variants.map ~ item:',
            item.variant.variant_id,
          );
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCurrentVariant({
                  item: item.variant,
                  quantity: item.quantity,
                });
              }}>
              <VariantInfo
                key={item.variant.variant_id}
                variant={item.variant}
                selected={
                  item.variant.variant_id === currentVariant.item.variant_id
                    ? true
                    : false
                }
              />
            </TouchableOpacity>
          );
        })}
        <Info product={product} />
      </View>
    </ScrollView>
  );
};

const Info = ({product}: Details) => {
  const systemFonts = [
    ...defaultSystemFonts,
    'Poppins-SemiBold',
    'Poppins-Regular',
  ];
  const descriptionSource = {html: product.description};
  const disclaimerSource = {html: product.disclaimer};
  const manufacturerSource = {html: product.manufacturer_info};
  return (
    <View style={{width: layout.widthp}}>
      {descriptionSource.html ? (
        <RenderHtml
          contentWidth={layout.widthp}
          source={descriptionSource}
          tagsStyles={{
            strong: {
              fontFamily: 'Poppins-SemiBold',
              fontSize: 20,
              color: 'black',
            },
            p: {
              fontFamily: 'Poppins-Medium',
              color: '#7C7C7C',
              fontSize: 15,
            },
          }}
          systemFonts={systemFonts}
        />
      ) : null}
      {disclaimerSource.html ? (
        <>
          <Text style={styles.detailTitle}>Disclaimer</Text>
          <RenderHtml
            contentWidth={layout.widthp}
            source={disclaimerSource}
            tagsStyles={{
              strong: {
                fontFamily: 'Poppins-SemiBold',
                fontSize: 20,
                color: 'black',
              },
              p: {
                fontFamily: 'Poppins-Medium',
                color: '#7C7C7C',
                fontSize: 15,
              },
            }}
            systemFonts={systemFonts}
          />
        </>
      ) : null}
      {manufacturerSource.html ? (
        <>
          {/* <Text style={styles.detailTitle}>Manufacturer Details</Text> */}
          <RenderHtml
            contentWidth={layout.widthp}
            source={manufacturerSource}
            tagsStyles={{
              strong: {
                fontFamily: 'Poppins-SemiBold',
                fontSize: 20,
                color: 'black',
              },
              p: {
                fontFamily: 'Poppins-Medium',
                color: '#7C7C7C',
                fontSize: 15,
              },
            }}
            systemFonts={systemFonts}
          />
        </>
      ) : null}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    // flex: 1,
    // backgroundColor: 'pink',
  },
  detailContainer: {
    // flex: 1,
  },
  flex: {
    flex: 1,
  },
  titleContainer: {
    height: 100,
    // backgroundColor: 'pink',
    width: layout.widthp,
  },
  titleSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'black',
  },
  info: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'black',
  },
  secondContainer: {
    width: layout.widthp,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'violet',
  },
  priceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: 'black',
  },
  detailTitleContainer: {
    paddingVertical: 5,
  },
  detailTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
  },
  detail: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#7C7C7C',
  },
});
