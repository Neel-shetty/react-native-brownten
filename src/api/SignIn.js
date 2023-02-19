import {api} from '.';

export async function SignIn(phone, password) {
  return api
    .post('/user/login', {password: password, phone: phone})
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return error;
    });
}
