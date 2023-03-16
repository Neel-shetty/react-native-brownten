import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../components/Button';
import Input from '../components/Input';
import SignScaffold from '../components/SignScaffold';
import {Formik} from 'formik';
import {forgotPassword} from '../api/forgotPassword';
import {setNewPassword} from '../api/setNewPassword';
import * as yup from 'yup';
import {SignIn} from '../api/SignIn';
import { layout } from '../constants/Layout';

const {width: widthScreen, height: heightScreen} = Dimensions.get('window');
// const logo = require('../../assets/images/logo-colour.png');
const logo = require('../../assets/images/home_screen/brownten-logo.png');

interface SignInProps {
  navigation: any;
}

const formScheme = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password has to be atleast 8 characters'),
  otp: yup.string().required('otp is required'),
});

const ResetPasswordScreen = ({navigation}: SignInProps) => {
  const [loading, setLoading] = useState(false);
  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;
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
          <Text style={styles.headerTitle}>Reset Password</Text>
          <Text style={styles.headerSubtitle}>
            Enter your OTP and new password
          </Text>
        </View>
        <Formik
          initialValues={{otp: '', password: ''}}
          onSubmit={async values => {
            setLoading(true);
            const success = await setNewPassword({
              otp: values.otp,
              password: values.password,
            });
            console.log(
              '🚀 ~ file: ResetPasswordScreen.tsx:56 ~ ResetPasswordScreen ~ success:',
              success,
            );
            if (success) {
              navigation.navigate(SignIn.name);
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
              <KeyboardAvoidingView behavior={behavior}>
                <Input
                  label="OTP"
                  onChangeText={handleChange('otp')}
                  onBlur={handleBlur('otp')}
                  value={values.otp}
                  numeric
                />
                {errors.otp && touched.otp && (
                  <>
                    <Text style={styles.errorText}>{errors.otp}</Text>
                    <View style={{marginTop: heightScreen * 0.011}} />
                  </>
                )}
                <Input
                  label="New Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <>
                    <Text style={styles.errorText}>{errors.password}</Text>
                    <View style={{marginTop: heightScreen * 0.011}} />
                  </>
                )}
              </KeyboardAvoidingView>
              <Button
                onPress={handleSubmit}
                bgColour="#53B175"
                txtColour="#FFF"
                text="Reset Password"
                loading={loading}
              />
            </>
          )}
        </Formik>
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
  forgotButtonBox: {
    alignItems: 'flex-end',
    marginBottom: heightScreen * 0.033,
  },
  infoText: {
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

export default {component: ResetPasswordScreen, name: 'ResetPasswordScreen'};
