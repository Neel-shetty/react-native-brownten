import {StyleSheet, View, ActivityIndicator, Alert, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import FoodCard from '../HomeScreenComponents/FoodCard';
import SearchInput from './SearchInput';
import {Formik} from 'formik';
import {FlashList} from '@shopify/flash-list';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ProductProps} from '../../screens/ProductScreen';
import {SearchProducts} from '../../api/SearchProducts';
import {api} from '../../api';

const ProductList = ({}) => {
  const [items, setItems] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [autoFocus, setAutoFocus] = useState<boolean>();
  const route: any = useRoute();
  const navigation: any = useNavigation();
  async function fetchData({
    link,
    fieldName,
    fieldValue,
  }: {
    link: string;
    fieldName: string;
    fieldValue: string;
  }) {
    setLoading(true);
    api
      .post(`${link}`, {[fieldName]: fieldValue})
      .then(res => {
        console.log(res.data.data);
        setItems(res.data.data);
        setLoading(false);
      })
      .catch(error => {
        if (error?.response) {
          console.log(error.response.data);
          Alert.alert('Failed', error.response.data.message, [
            {
              text: 'ok',
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
        }
        setLoading(false);
      });
  }

  useEffect(() => {
    const itemData = route?.params?.itemData;
    if (itemData) {
      setItems(itemData);
    }
    //@ts-ignore
  }, [route?.params?.itemData]);

  useEffect(() => {
    const rlink = route?.params?.link;
    const rfieldName = route?.params?.fieldName;
    const rfieldValue = route?.params?.fieldValue;
    if (rlink) {
      fetchData({link: rlink, fieldName: rfieldName, fieldValue: rfieldValue});
    }
  }, [
    route?.params?.fieldName,
    route?.params?.link,
    route?.params?.fieldValue,
  ]);

  useEffect(() => {
    const tAutoFocus = route?.params?.autoFocus;
    console.log(
      '🚀 ~ file: ProductList.tsx:26 ~ ProductList ~ autoFocus:',
      tAutoFocus,
    );
    setAutoFocus(tAutoFocus);
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
            <>
              {/* <View
                style={{
                  width: layout.widthp,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View> */}
              <SearchInput
                handleSubmit={handleSubmit}
                onChangeText={handleChange('query')}
                placeholder="Search Store"
                onBlur={handleBlur('query')}
                value={values.query}
                autoFocus={autoFocus === false ? autoFocus : true}
              />
            </>
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
