import {api} from '.';

interface props {
  password: string;
  phone: string;
  email: string;
  name: string;
  image: any;
}

export async function SignUpApi({password, phone, email, name, image}: props) {
  console.log(
    '🚀 ~ file: SignUpApi.js:4 ~ SignUpApi ~ password',
    password,
    image,
  );
  console.log('signup api running');
  const formdata = new FormData();
  formdata.append('password', password);
  formdata.append('phone', phone);
  formdata.append('email', email);
  formdata.append('name', name);
  formdata.append('image', {
    uri: image.uri,
    name: image.fileName,
    type: image.type,
  });
  return api
    .post('/user/register', formdata, {
      headers: {
        // accept: "application/json",
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      // console.log(res.data);
      return res.data;
    })
    .catch(error => {
      // console.log(error.response);
      return error;
    });
}
