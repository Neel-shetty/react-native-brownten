import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../components/Button';
import Input from '../components/Input';
import SignScaffold from '../components/SignScaffold';
import * as yup from 'yup';
import {Formik} from 'formik';
import OtpScreen from './OtpScreen';
import ImageInput from '../components/SignUpComponents/ImageInput';
import {Alert} from 'react-native';
import {SignUpApi} from '../api/SignUpApi';
import EncryptedStorage from 'react-native-encrypted-storage';
import {layout} from '../constants/Layout';

const {width: widthScreen, height: heightScreen} = Dimensions.get('window');
// const logo = require('../../assets/images/logo-colour.png');
const logo = require('../../assets/images/home_screen/brownten-logo.png');

interface SignUpProps {
  navigation: any;
}

const SignUp = ({navigation}: SignUpProps) => {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;
  const formScheme = yup.object({
    phone: yup
      .string()
      .required('Phone Number is Required!')
      .length(10, 'Invalid Phone Number'),
    email: yup
      .string()
      .email('Email format is invalid')
      .required('Email is required!'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password has to be atleast 8 characters'),
    username: yup.string().required('Username is required'),
  });

  const goToSignIn = () => {
    navigation.pop();
  };

  const goToOtp = ({phone, name, email, password}: any) => {
    navigation.navigate(OtpScreen.name, {
      phone: phone,
      name: name,
      email: email,
      password: password,
      image: image,
    });
  };

  return (
    <SignScaffold>
      {/* <Image style={styles.logo} source={logo} /> */}
      <Image
        style={{height: 75, width: layout.width, marginVertical: 20}}
        source={logo}
        resizeMode="contain"
      />
      <View style={styles.form}>
        <View>
          <Text style={styles.headerTitle}>Sign up</Text>
          <Text style={styles.headerSubtitle}>
            Enter your credentials to continue
          </Text>
        </View>
        <Formik
          initialValues={{email: '', password: '', username: '', phone: ''}}
          onSubmit={async values => {
            setLoading(true);
            console.log('onsubmit');
            console.log(values);
            if (!image) {
              Alert.alert('Please select an Image');
              setLoading(false);
              return;
            }
            const result = await SignUpApi({
              password: values.password,
              email: values.email,
              name: values.username,
              phone: values.phone,
              image: image,
            });
            if (result?.status === 1) {
              Alert.alert('Success', result.message);
              await EncryptedStorage.setItem(
                'id',
                JSON.stringify(result.data.id),
              );
              goToOtp({
                name: values.username,
                email: values.email,
                password: values.password,
                phone: values.phone,
              });
            }
            if (result?.response?.data?.status === 0) {
              Alert.alert('Failed', result.response.data.message);
            }
            setLoading(false);
          }}
          validationSchema={formScheme}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              {console.log(
                '🚀 ~ file: SignUp.tsx:70 ~ SignUp ~ errors',
                errors,
                touched.email,
              )}
              <KeyboardAvoidingView behavior={behavior}>
                <Input
                  label="Username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
                {errors.username && touched.username && (
                  <>
                    <Text style={styles.errorText}>{errors.username}</Text>
                    <View style={{marginTop: heightScreen * 0.011}} />
                  </>
                )}
                <View style={{marginTop: heightScreen * 0.011}} />
                <Input
                  label="Phone Number"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  numeric
                />
                {errors.phone && touched.phone && (
                  <>
                    <Text style={styles.errorText}>{errors.phone}</Text>
                    <View style={{marginTop: heightScreen * 0.011}} />
                  </>
                )}
                <View style={{marginTop: heightScreen * 0.011}} />
                <Input
                  label="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <>
                    <Text style={styles.errorText}>{errors.email}</Text>
                    <View style={{marginTop: heightScreen * 0.011}} />
                  </>
                )}
                <View style={{marginTop: heightScreen * 0.011}} />
                <Input
                  label="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secure
                />
                {errors.password && touched.password && (
                  <>
                    <Text style={styles.errorText}>{errors.password}</Text>
                    <View style={{marginTop: heightScreen * 0.011}} />
                  </>
                )}
                <ImageInput
                  label="Profile Picture"
                  image={image}
                  setImage={setImage}
                />
              </KeyboardAvoidingView>

              <View style={styles.termsBox}>
                <Text style={styles.infoText}>
                  By continuing you agree to our{' '}
                  <Text style={[styles.infoText, styles.greenInfoText]}>
                    Terms of Service
                  </Text>{' '}
                  and{' '}
                  <Text style={[styles.infoText, styles.greenInfoText]}>
                    Privacy Policy
                  </Text>
                  .
                </Text>
              </View>

              <Button
                onPress={handleSubmit}
                bgColour="#53B175"
                txtColour="#FFF"
                text="Sign up"
                loading={loading}
              />
            </>
          )}
        </Formik>
        <View style={styles.footer}>
          <Text style={styles.infoText}>Already have an account?</Text>
          <TouchableOpacity onPress={goToSignIn}>
            <Text style={[styles.infoText, styles.greenInfoText]}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SignScaffold>
  );
};

const styles = EStyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginTop: heightScreen * 0.032,
    marginBottom: heightScreen * 0.112,
  },
  form: {
    paddingHorizontal: widthScreen * 0.06,
  },
  headerTitle: {
    fontSize: '1.625rem',
    lineHeight: '1.625rem',
    height: '1.625rem',
    fontFamily: '$gilroyNormal600',
    marginBottom: heightScreen * 0.017,
    color: '$blackColour',
  },
  headerSubtitle: {
    fontSize: '1rem',
    lineHeight: '1rem',
    height: '1rem',
    fontFamily: '$gilroyMedium',
    marginBottom: heightScreen * 0.045,
    color: '$darkGreyColour',
  },
  termsBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: heightScreen * 0.033,
  },
  infoText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '$gilroyNormal600',
    fontWeight: '600',
    fontSize: '0.875rem',
    color: '$blackColour',
    letterSpacing: '0.05rem',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: heightScreen * 0.028,
  },
  greenInfoText: {
    color: '$greenColour',
    marginLeft: 5.0,
  },
  errorText: {
    color: 'red',
    fontFamily: '$gilroyNormal600',
  },
});

export default {component: SignUp, name: 'SignUp'};
