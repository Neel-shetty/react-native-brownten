import {api} from '.';

export async function SignIn(phone: string, password: string) {
  return api
    .post('/user/login', {password: password, phone: phone})
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return error;
    });
}
