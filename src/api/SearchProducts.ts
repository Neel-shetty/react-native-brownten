import {api} from '.';
import {ProductProps} from '../screens/ProductScreen';
import {Alert} from 'react-native';

interface ProductResponseType {
  status: number;
  data: ProductProps[];
  message?: string;
}

export async function SearchProducts(searchQuery: string) {
  const response = api
    .post('/search-product', {name: searchQuery})
    .then(res => {
      // console.log(res.data);
      return res.data as ProductResponseType;
    })
    .catch(error => {
      console.log(
        '🚀 ~ file: SearchProducts.ts:13 ~ SearchProducts ~ error.response:',
        error?.response?.data,
      );
      return error?.response?.data;
    });
  const result: ProductResponseType = await response;
  if (result.status === 1) {
    const success: ProductProps[] = result.data;
    return success;
  } else {
    Alert.alert('Failed', result?.message);
  }
}
