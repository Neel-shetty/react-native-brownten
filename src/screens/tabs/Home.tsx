import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, ScrollView, Dimensions, Alert, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Section from '../../components/HomeScreenComponents/Section';
import Banner from '../../components/HomeScreenComponents/Banner';
import SearchBarHeader from '../../components/HomeScreenComponents/SearchBarHeader';
import CategorySection from '../../components/HomeScreenComponents/CategorySection';
import {useQuery} from 'react-query';
import BottomSheet from '@gorhom/bottom-sheet';
import {api} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import {setBottomSheetShown} from '../../store/uiTrigger';
// import Header from '../../components/HomeScreenComponents/Header';

const {width: widthScreen, height: heightScreen} = Dimensions.get('window');

export interface variantType {
  price: string;
  selling_price: string;
  weight: string;
  qty: number;
  variant_id: number;
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
  // const [bottomSheetOpen, setBottomSheetOpen] = useState(true);
  const [prevState, setPrevState] = useState<number>();
  const bottomSheetOpen = useSelector(
    (state: any) => state.uiTrigger.bottomSheetShown,
  );

  const dispatch = useDispatch();

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

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  // callbacks
  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log('handleSheetChanges', index);
      if (index === 0 && prevState === 1) {
        // setBottomSheetOpen(false);
        dispatch(setBottomSheetShown({shown: false, variants: []}));
      }
      setPrevState(index);
    },
    [dispatch, prevState],
  );

  if (allProductsErrored) {
    Alert.alert('Failed fetching products', allProductsError.message);
  }
  return (
    <ScrollView style={styles.container}>
      {/* <Header /> */}
      <SearchBarHeader />
      <Banner />
      <CategorySection title={'Categories'} />
      <Section
        title={'Trending'}
        items={trendingProducts ? trendingProducts : []}
        loading={allProductsisLoading}
        goToPage={'SearchScreen'}
      />
      <Section
        title={'All Products'}
        items={allProducts ? allProducts : []}
        loading={allProductsisLoading}
        goToPage={'SearchScreen'}
      />
      {/* <Section title={'Test section'} />
      <Section title={'Test section'} /> */}
      <View style={styles.scrollFooter} />
      <BottomVariantMenu
        bottomSheetOpen={bottomSheetOpen}
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        handleSheetChanges={handleSheetChanges}
      />
    </ScrollView>
  );
};

const BottomVariantMenu = ({
  bottomSheetOpen,
  bottomSheetRef,
  snapPoints,
  handleSheetChanges,
}: any) => {
  console.log('🚀 ~ file: Home.tsx:113 ~ bottomSheetOpen:', bottomSheetOpen);
  return (
    <View>
      {bottomSheetOpen.shown ? (
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            {bottomSheetOpen?.variants.map(
              (item: variantType, index: number) => {
                return (
                  <Text key={index}>
                    {item.price}
                    {item.weight}🎉
                    {item.qty}
                    {item.selling_price}
                  </Text>
                );
              },
            )}
          </View>
        </BottomSheet>
      ) : null}
    </View>
  );
};

const styles = EStyleSheet.create({
  localBox: {
    paddingHorizontal: 25.0,
  },
  container: {
    width: widthScreen,
    minHeight: heightScreen,
    paddingTop: 35.0,
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

export default {component: Home, name: 'Home'};
