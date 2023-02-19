import {api} from '.';

export async function OtpApi({password, phone, email, name, image}) {
  console.log('sending otp...');
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
    .post('/send/otp', formdata, {
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

export async function verifyOtp({password, phone, email, name, image, otp}) {
  console.log('verify otp');
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
  formdata.append('otp', otp);
  return api
    .post('/varify/otp', formdata, {
      headers: {
        // accept: "application/json",
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return error;
    });
}
