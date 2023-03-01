import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {layout} from '../../constants/Layout';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import {ProductProps} from '../../screens/ProductScreen';
import VariantInfo from './VariantInfo';
import {variantType} from '../../screens/tabs/Home';
import CartButton from './CartButton';

interface Details {
  product: ProductProps;
}

interface selectVariant {
  selected: boolean;
  variant: variantType;
}

const Details = ({product}: Details) => {
  const [variants, setvariants] = useState<selectVariant[]>([
    {
      selected: true,
      variant: product.variants[0],
    },
  ]);
  const [currentVariant, setCurrentVariant] = useState<variantType>(
    product.variants[0],
  );
  console.log(
    '🚀 ~ file: Details.tsx:31 ~ Details ~ currentVariant:',
    currentVariant,
  );
  console.log('🚀 ~ file: Details.tsx:28 ~ Details ~ variants:', variants);

  useEffect(() => {
    let tempArr: selectVariant[] = [];
    for (let i = 0; i < product.variants.length; i++) {
      if (i === 0) {
        tempArr.push({selected: true, variant: product.variants[i]});
      } else {
        tempArr.push({selected: false, variant: product.variants[i]});
      }
    }
    setvariants(tempArr);
  }, [product.variants]);

  return (
    <ScrollView
      contentContainerStyle={styles.root}
      showsVerticalScrollIndicator={false}>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.titleSubContainer}>
            <View style={styles.flex}>
              <Text style={styles.title}>{product.name}</Text>
            </View>
          </View>
          <Text style={styles.info}>
            {currentVariant.weight + ' '}
            {currentVariant.unit}
          </Text>
        </View>
        <View style={styles.secondContainer}>
          <CartButton />
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{currentVariant.selling_price}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flex}>
        {variants.map(item => {
          return (
            <TouchableOpacity
              onPress={() => {
                setCurrentVariant(item.variant);
                let tempArr: selectVariant[] = [];
                for (let i = 0; i < product.variants.length; i++) {
                  if (
                    variants[i].variant.variant_id === item.variant.variant_id
                  ) {
                    tempArr.push({
                      selected: true,
                      variant: variants[i].variant,
                    });
                  } else {
                    tempArr.push({
                      selected: false,
                      variant: variants[i].variant,
                    });
                  }
                }
                setvariants(tempArr);
              }}>
              <VariantInfo
                key={item.variant.variant_id}
                variant={item.variant}
                selected={item.selected}
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
    fontSize: 24,
    color: 'black',
  },
  info: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  secondContainer: {
    width: layout.widthp,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
