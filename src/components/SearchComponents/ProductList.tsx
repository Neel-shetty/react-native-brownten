import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import FoodCard from '../HomeScreenComponents/FoodCard';
import SearchInput from './SearchInput';
import {Formik} from 'formik';
import {FlashList} from '@shopify/flash-list';
import {useRoute} from '@react-navigation/native';

interface itemProp {
  id: number;
  category_id: string;
  name: string;
  slug: string;
  brand: string;
  cover_photo: any;
  image1: any;
  image2: any;
  image3: any;
  image4: any;
  state: string;
  city: string;
  pincode: string;
  disclaimer: string;
  manufacturer_info: string;
  country_origin: 'BHARAT';
  is_veg: '2';
  pincodes: '';
  created_at: '2022-10-18T06:52:41.000000Z';
  updated_at: '2022-10-18T06:52:41.000000Z';
  is_trending: 0;
  is_featured: 0;
}

const ProductList = ({}) => {
  const [items, setItems] = useState<itemProp[]>([]);
  const route = useRoute();
  //@ts-expect-error
  const itemData = route?.params?.itemData;
  console.log(
    '🚀 ~ file: ProductList.tsx:39 ~ ProductList ~ itemData:',
    itemData,
  );
  if (itemData) {
    // setItems(itemData);
  } else {
    //search query data
  }
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <Formik
          initialValues={{query: ''}}
          onSubmit={values => {
            console.log(values);
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <SearchInput
              handleSubmit={handleSubmit}
              onChangeText={handleChange('query')}
              placeholder="Search Store"
              onBlur={handleBlur('query')}
              value={values.query}
            />
          )}
        </Formik>
      </View>
      <FlashList
        data={items}
        renderItem={({item}) => (
          <FoodCard name={item.name} image={item.cover_photo} />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={180}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  root: {},
  inputContainer: {
    marginVertical: 10,
  },
});
