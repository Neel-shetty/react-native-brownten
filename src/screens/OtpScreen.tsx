import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../components/Button';
import Input from '../components/Input';
import SignScaffold from '../components/SignScaffold';
import {Formik} from 'formik';
import * as yup from 'yup';
import {OtpApi, verifyOtp} from '../api/OtpApi';
import {useRoute} from '@react-navigation/native';

const {width: widthScreen, height: heightScreen} = Dimensions.get('window');
const logo = require('../../assets/images/logo-colour.png');

const OtpScreen = () => {
  const [loading, setLoading] = useState(false);
  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;

  const route: any = useRoute();
  console.log('🚀 ~ file: OtpScreen.tsx:36 ~ route', route.params);

  const formScheme = yup.object({
    otp: yup.string().required('OTP is required!'),
  });

  useEffect(() => {
    const sendOtpToUser = async () => {
      //@ts-ignore
      const result = await OtpApi({
        phone: route?.params?.phone,
        email: route?.params?.email,
        password: route?.params?.password,
        name: route?.params?.name,
        image: route?.params?.image,
      });
      console.log(
        '🚀 ~ file: OtpScreen.tsx:48 ~ sendOtpToUser ~ result',
        result,
      );
    };
    sendOtpToUser();
  }, [route]);

  return (
    <SignScaffold>
      <Image style={styles.logo} source={logo} />
      <View style={styles.form}>
        <View>
          <Text style={styles.headerTitle}>Verify OTP</Text>
          <Text style={styles.headerSubtitle}>
            Enter the OTP to verify your account
          </Text>
        </View>
        <Formik
          initialValues={{otp: ''}}
          onSubmit={async values => {
            console.log(values);
            setLoading(true);
            const result = await verifyOtp({
              otp: values.otp,
              phone: route?.params?.phone,
              email: route?.params?.email,
              password: route?.params?.password,
              name: route?.params?.name,
              image: route?.params?.image,
            });
            console.log('🚀 ~ file: OtpScreen.tsx:76 ~ result:', result);
            if (result?.status === 1) {
              Alert.alert('Success', result?.message);
            }
            console.log(
              '🚀 ~ file: SignIn.tsx:66 ~ Signin ~ result',
              result?.response?.data?.status,
            );
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
                '🚀 ~ file: SignIn.tsx:75 ~ Signin ~ errors',
                errors,
              )}
              <KeyboardAvoidingView behavior={behavior}>
                <Input
                  label="OTP"
                  onChangeText={handleChange('otp')}
                  onBlur={handleBlur('otp')}
                  value={values.otp}
                />
                {errors.otp && touched.otp && (
                  <>
                    <Text style={styles.errorText}>{errors.otp}</Text>
                    <View style={{marginTop: heightScreen * 0.011}} />
                  </>
                )}
                <View style={{marginTop: heightScreen * 0.011}} />
              </KeyboardAvoidingView>
              <View style={styles.termsBox}>
                <TouchableOpacity
                  onPress={async () => {
                    setLoading(true);
                    const result = await OtpApi({
                      phone: route?.params?.phone,
                      email: route?.params?.email,
                      password: route?.params?.password,
                      name: route?.params?.name,
                      image: route?.params?.image,
                    });
                    console.log(
                      '🚀 ~ file: OtpScreen.tsx:118 ~ onPress={ ~ result',
                      result,
                    );

                    setLoading(false);
                  }}>
                  <Text style={styles.infoText}>
                    Didn't Receive OTP?
                    <Text style={[styles.infoText, styles.greenInfoText]}>
                      {' '}
                      Resend OTP
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: heightScreen * 0.022}} />
              {/* <View style={{marginTop: heightScreen * 0.011}} /> */}
              <Button
                onPress={handleSubmit}
                bgColour="#53B175"
                txtColour="#FFF"
                text="Verify OTP"
                loading={loading}
              />
            </>
          )}
        </Formik>
      </View>
    </SignScaffold>
  );
};

export default {component: OtpScreen, name: 'OtpScreen'};

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
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
