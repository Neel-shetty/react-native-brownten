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
  const route = useRoute();
  //@ts-expect-error
  const slug = route?.params?.slug;
  useEffect(() => {
    async function asyncFetch() {
      setLoading(true);
      const ProductDetailResponse: ProductProps = await fetchProductDetails(
        slug,
      );
      setProductDetail(ProductDetailResponse);
      setLoading(false);
    }
    asyncFetch();
  }, [slug]);

  if (loading) return <ActivityIndicator />;

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
