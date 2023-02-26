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
  const [autoFocus, setAutoFocus] = useState<boolean>();
  const route = useRoute();
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
    //@ts-expect-error
    const itemData = route?.params?.itemData;
    if (itemData) {
      setItems(itemData);
    }
    //@ts-ignore
  }, [route?.params?.itemData]);

  useEffect(() => {
    //@ts-expect-error
    const rlink = route?.params?.link;
    //@ts-expect-error
    const rfieldName = route?.params?.fieldName;
    //@ts-expect-error
    const rfieldValue = route?.params?.fieldValue;
    if (rlink) {
      fetchData({link: rlink, fieldName: rfieldName, fieldValue: rfieldValue});
    }
  }, [
    //@ts-ignore
    route?.params?.fieldName,
    //@ts-ignore
    route?.params?.link,
    //@ts-ignore
    route?.params?.fieldValue,
  ]);

  useEffect(() => {
    //@ts-expect-error
    const tAutoFocus = route?.params?.autoFocus;
    console.log(
      '🚀 ~ file: ProductList.tsx:26 ~ ProductList ~ autoFocus:',
      tAutoFocus,
    );
    setAutoFocus(tAutoFocus);
    //@ts-ignore
  }, [route?.params?.autoFocus]);

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
