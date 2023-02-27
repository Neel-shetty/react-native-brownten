import {Alert} from 'react-native';
import {api} from '.';

export async function deleteAddress(id: number) {
  const response = api
    .post('/user/address/delete', {id: id})
    .then(res => {
      // console.log(res.data);
      return res.data;
    })
    .catch(error => {
      console.log(
        '🚀 ~ file: SearchProducts.ts:13 ~ SearchProducts ~ error.response:',
        error?.response?.data,
      );
      return error?.response?.data;
    });
  const result = await response;
  if (result.status === 1) {
    Alert.alert('Success', result.data);
  } else {
    Alert.alert('Failed', result?.data);
  }
}
