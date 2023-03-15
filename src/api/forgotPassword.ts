import {api} from '.';
import {Alert} from 'react-native';

export async function forgotPassword<T>(email: T) {
  api
    .post('/user/forgot-password', {email: '9380385003'})
    .then(res => {
      console.log(res.data);
      Alert.alert('Success', res.data.message);
    })
    .catch(error => {
      console.log(error.data);
      Alert.alert('Failed', error.response.message);
    });
}
