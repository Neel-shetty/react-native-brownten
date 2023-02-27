import {api} from '.';
import {Alert} from 'react-native';

export interface AddressType {
  id: number;
  user_id: string;
  is_default: string;
  name: string;
  address1: string;
  address2: string;
  state: string;
  city: string;
  pincode: string;
  phone: string;
  phone2: string;
  created_at: string;
  updated_at: string;
  selected?: boolean;
}

interface AddressResponseType {
  status: number;
  data: AddressType[];
  message?: string;
}

export async function fetchAddress(id: number) {
  const response = api
    .post('/user/address', {user_id: id})
    .then(res => {
      // console.log(res.data);
      return res.data as AddressResponseType;
    })
    .catch(error => {
      console.log(
        '🚀 ~ file: SearchProducts.ts:13 ~ SearchProducts ~ error.response:',
        error?.response?.data,
      );
      return error?.response?.data;
    });
  const result: AddressResponseType = await response;
  if (result.status === 1) {
    const success: AddressType[] = result.data;
    return success;
  } else {
    Alert.alert('Failed', result?.message);
  }
}
