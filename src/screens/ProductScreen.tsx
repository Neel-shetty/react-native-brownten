import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductHeader from '../components/ProductComponents/ProductHeader';
import Details from '../components/ProductComponents/Details';
import {useRoute} from '@react-navigation/native';
import {fetchProductDetails} from '../api/fetchProductDetails';
import {variantType} from './tabs/Home';

export interface ProductProps {
  id: number;
  category_id: string;
  name: string;
  slug: string;
  brand: string;
  state: string;
  city: string;
  pincode: string;
  description: string;
  disclaimer: string;
  manufacturer_info: string;
  country_origin: string;
  is_veg: string;
  pincodes: string;
  created_at: string;
  updated_at: string;
  is_trending: number;
  is_featured: number;
  images: string[];
  variants: variantType[];
}

const ProductScreen = () => {
  const [productDetail, setProductDetail] = useState<ProductProps>();
  const [loading, setLoading] = useState(false);
  const route: any = useRoute();
  useEffect(() => {
    const slug = route?.params?.slug;
    const product_id = route?.params?.product_id;
    console.log(
      '🚀 ~ file: ProductScreen.tsx:38 ~ ProductScreen ~ product_id:',
      product_id,
    );
    async function asyncFetch() {
      setLoading(true);
      const ProductDetailResponse: ProductProps = await fetchProductDetails({
        slug: slug,
        product_id: product_id,
      });
      setProductDetail(ProductDetailResponse);
      setLoading(false);
    }
    // async function asyncFetchUsingId() {
    //   setLoading(true);
    //   const ProductDetailResponse: ProductProps = await fetchProductDetails({
    //     product_id: product_id,
    //     slug: slug,
    //   });
    //   console.log(
    //     '🚀 ~ file: ProductScreen.tsx:53 ~ asyncFetchUsingId ~ ProductDetailResponse:',
    //     ProductDetailResponse,
    //   );
    //   setProductDetail(ProductDetailResponse);
    //   setLoading(false);
    // }
    console.log(slug);
    // if (slug) {
    //   asyncFetch();
    // } else {
    //   asyncFetchUsingId();
    //   console.log(product_id);
    // }
    asyncFetch();
  }, [route?.params?.slug, route?.params?.product_id]);

  if (loading)
    return (
      <ActivityIndicator
        size={'large'}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      />
    );

  if (!productDetail) return;
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <ProductHeader product={productDetail} />
      </View>
      <View style={styles.detailContainer}>
        <Details product={productDetail} />
      </View>
    </View>
  );
};

export default {name: 'ProductScreen', component: ProductScreen};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headerContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    // backgroundColor: 'pink',
  },
  detailContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});
