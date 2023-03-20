import {api} from '.';
import {Alert} from 'react-native';

export async function forgotPassword<T>(email: T) {
  console.log('🚀 ~ file: forgotPassword.ts:5 ~ email:', email);
  api
    .post('/user/forgot-password', {email: email})
    .then(res => {
      console.log(res.data);
      Alert.alert('Success', res.data.message);
    })
    .catch(error => {
      console.log(error.data);
      Alert.alert('Failed', error.response.message);
    });
}
