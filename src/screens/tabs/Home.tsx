import React from 'react';
import {View, ScrollView, Dimensions, Alert, StatusBar} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Section from '../../components/HomeScreenComponents/Section';
import Banner from '../../components/HomeScreenComponents/Banner';
import SearchBarHeader from '../../components/HomeScreenComponents/SearchBarHeader';
import CategorySection from '../../components/HomeScreenComponents/CategorySection';
import {useQuery} from 'react-query';
import {api} from '../../api';
import BrandSection from '../../components/HomeScreenComponents/BrandSection';
import Header from '../../components/HomeScreenComponents/Header';

const {width: widthScreen, height: heightScreen} = Dimensions.get('window');

export interface variantType {
  price: string;
  selling_price: string;
  weight: string;
  qty: number;
  variant_id: number;
  unit: string;
}
export interface ProductPreviewType {
  id: number;
  slug: string;
  name: string;
  category_id: string;
  images: string[];
  variants: variantType[];
}

// interface ProductPreviewResponseType {
//   status: number;
//   data: ProductPreviewType[];
// }

const Home = () => {
  const {
    error: trendingProductsError,
    isLoading: trendingProductsIsLoading,
    data: trendingProducts,
    isError: trendingProductsErrored,
  } = useQuery<ProductPreviewType[], Error>('trendingProducts', async () => {
    const response = await api.post('/trending');
    return response.data.data as ProductPreviewType[];
  });
  const {
    error: allProductsError,
    isLoading: allProductsisLoading,
    data: allProducts,
    isError: allProductsErrored,
  } = useQuery<ProductPreviewType[], Error>('AllProducts', async () => {
    const response = await api.post('all/products');
    return response.data.data as ProductPreviewType[];
  });

  if (allProductsErrored || trendingProductsErrored) {
    Alert.alert(
      'Failed fetching products',
      allProductsError?.message || trendingProductsError?.message,
    );
  }
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle={'dark-content'}
        showHideTransition={'fade'}
        hidden={false}
      />
      {/* <Header /> */}
      <SearchBarHeader />
      <Banner />
      <CategorySection title={'Categories'} />
      <Section
        title={'Trending'}
        items={trendingProducts ? trendingProducts : []}
        loading={trendingProductsIsLoading}
        goToPage={'SearchScreen'}
      />
      <Section
        title={'All Products'}
        items={allProducts ? allProducts : []}
        loading={allProductsisLoading}
        goToPage={'SearchScreen'}
      />
      <BrandSection title="Top Brands" />
      <View style={styles.scrollFooter} />
    </ScrollView>
  );
};

const styles = EStyleSheet.create({
  localBox: {
    paddingHorizontal: 25.0,
  },
  container: {
    width: widthScreen,
    minHeight: heightScreen,
    // paddingTop: 35.0,
    backgroundColor: '$whiteColour',
  },
  searchBox: {
    marginTop: 20.0,
  },
  horizontalScroll: {
    paddingLeft: 20.0,
  },
  scrollFooter: {
    marginBottom: heightScreen * 0.15,
  },
});

export default {component: Home, name: 'HomeScreen'};
