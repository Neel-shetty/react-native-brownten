import {api} from '.';

interface imageProps {
  fileName: string;
  fileSize: number;
  height: number;
  type: string;
  uri: string;
  width: number;
}

interface otpParams {
  password: string;
  phone: string;
  email: string;
  name: string;
  image: imageProps;
  otp?: string;
}

export async function OtpApi({password, phone, email, name, image}: otpParams) {
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

export async function verifyOtp({
  password,
  phone,
  email,
  name,
  image,
  otp,
}: otpParams) {
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
