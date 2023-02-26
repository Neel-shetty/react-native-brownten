import {StyleSheet, View, ActivityIndicator, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import FoodCard from '../HomeScreenComponents/FoodCard';
import SearchInput from './SearchInput';
import {Formik} from 'formik';
import {FlashList} from '@shopify/flash-list';
import {useRoute} from '@react-navigation/native';
import {ProductProps} from '../../screens/ProductScreen';
import {SearchProducts} from '../../api/SearchProducts';
import {api} from '../../api';

const ProductList = ({}) => {
  const [items, setItems] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  //@ts-expect-error
  const itemData = route?.params?.itemData;
  //@ts-expect-error
  const rlink = route?.params?.link;
  //@ts-expect-error
  const rfieldName = route?.params?.fieldName;
  //@ts-expect-error
  const rfieldValue = route?.params?.fieldValue;
  //@ts-expect-error
  const autoFocus = route?.params?.autoFocus;
  console.log(
    '🚀 ~ file: ProductList.tsx:26 ~ ProductList ~ autoFocus:',
    autoFocus,
  );

  async function fetchData({
    link,
    fieldName,
    fieldValue,
  }: {
    link: string;
    fieldName: string;
    fieldValue: string;
  }) {
    api
      .post(`${link}`, {[fieldName]: fieldValue})
      .then(res => {
        setItems(res.data.data);
      })
      .catch(error => {
        if (error?.response) {
          console.log(error.response.data);
          Alert.alert('Failed', error.response.data.message);
        }
      });
  }

  useEffect(() => {
    if (itemData) {
      setItems(itemData);
    }
  }, [itemData]);

  useEffect(() => {
    if (rlink) {
      fetchData({link: rlink, fieldName: rfieldName, fieldValue: rfieldValue});
    }
  }, [rfieldName, rfieldValue, rlink]);

  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <Formik
          initialValues={{query: ''}}
          onSubmit={async values => {
            setLoading(true);
            console.log(values);
            const products = await SearchProducts(values.query);
            console.log(
              '🚀 ~ file: ProductList.tsx:38 ~ ProductList ~ products:',
              products,
            );
            if (products) {
              setItems(products);
            }
            setLoading(false);
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <SearchInput
              handleSubmit={handleSubmit}
              onChangeText={handleChange('query')}
              placeholder="Search Store"
              onBlur={handleBlur('query')}
              value={values.query}
              autoFocus={autoFocus === false ? autoFocus : true}
            />
          )}
        </Formik>
      </View>
      {loading ? (
        <View style={styles.flex}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlashList
          data={items}
          renderItem={({item}) => <FoodCard item={item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={180}
        />
      )}
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  root: {},
  inputContainer: {
    marginVertical: 10,
  },
  flex: {flex: 1},
});
