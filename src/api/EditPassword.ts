import {Alert} from 'react-native';
import {api} from '.';
import EncryptedStorage from 'react-native-encrypted-storage';

interface props {
  password: string;
}

export async function EditPassword({password}: props) {
  const user_id = await EncryptedStorage.getItem('id');
  const response = api
    .post('/user/password-update', {
      user_id,
      password,
    })
    .then(res => {
      console.log(
        '🚀 ~ file: AddAddress.ts:11 ~ EditAccount ~ res.data:',
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
