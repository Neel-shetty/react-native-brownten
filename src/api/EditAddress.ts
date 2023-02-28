import {Alert} from 'react-native';
import {api} from '.';

interface props {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  id: number;
}

export async function editAddress({
  name,
  address1,
  address2,
  city,
  state,
  pincode,
  phone,
  id,
}: props) {
  const response = api
    .post('/user/update/address', {
      id,
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
    Alert.alert('Success', result.message);
  } else {
    Alert.alert('Failed', result?.data);
  }
}
