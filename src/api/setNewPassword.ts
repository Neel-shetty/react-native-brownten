import {Alert} from 'react-native';
import {api} from '.';

export async function setNewPassword({
  otp,
  password,
}: {
  otp: string;
  password: string;
}) {
  console.log('🚀 ~ file: setNewPassword.ts:11 ~ otp:', otp);
  const result = await api
    .post('/user/set-password', {otp, password})
    .then(res => {
      console.log(res.data);
      Alert.alert(res.data?.message);
      return true;
    })
    .catch(error => {
      console.log(
        '🚀 ~ file: setNewPassword.ts:31 ~ error:',
        error.response.data,
      );
      if (error?.response) {
        Alert.alert('Failed', error.response?.data.message);
      }
      return false;
    });
  if (result) {
    return true;
  } else {
    return false;
  }
}
