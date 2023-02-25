import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import FoodCard from '../HomeScreenComponents/FoodCard';
import SearchInput from './SearchInput';
import {Formik} from 'formik';
import {FlashList} from '@shopify/flash-list';
import {useRoute} from '@react-navigation/native';
import {ProductProps} from '../../screens/ProductScreen';
import {SearchProducts} from '../../api/SearchProducts';

const ProductList = ({}) => {
  const [items, setItems] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  //@ts-expect-error
  const itemData = route?.params?.itemData;
  useEffect(() => {
    if (itemData) {
      setItems(itemData);
    }
  }, [itemData]);

  // async function searchProducts(values: {}) {

  // }

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
