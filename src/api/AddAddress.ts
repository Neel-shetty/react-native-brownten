import {Alert} from 'react-native';
import {api} from '.';
import EncryptedStorage from 'react-native-encrypted-storage';

interface props {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export async function deleteAddress({
  name,
  address1,
  address2,
  city,
  state,
  pincode,
  phone,
}: props) {
  const user_id = await EncryptedStorage.getItem('id');
  const response = api
    .post('/user/add/address', {
      user_id,
      name,
      address1,
      address2,
      city,
      state,
      phone,
      pincode,
    })
    .then(res => {
      console.log(
        '🚀 ~ file: AddAddress.ts:11 ~ deleteAddress ~ res.data:',
        res.data,
      );
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
    return result.data;
  } else {
    Alert.alert('Failed', result?.data);
  }
}
