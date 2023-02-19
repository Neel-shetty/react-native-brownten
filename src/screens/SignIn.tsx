import React, {useEffect, useState} from 'react';
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
import SignUp from './SignUp';
import Tabs from './Tabs';
import {Formik} from 'formik';
import * as yup from 'yup';

const {width: widthScreen, height: heightScreen} = Dimensions.get('window');
const logo = require('../../assets/images/logo-colour.png');

interface SignInProps {
  navigation: any;
}

const Signin = ({navigation}: SignInProps) => {
  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;

  const formScheme = yup.object({
    // phoneNumber: yup.string().phoneNumber("error").required("error"),
    email: yup
      .string()
      .email('Email format is invalid')
      .required('Email is required!'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password has to be atleast 8 characters'),
  });

  const goToSignUp = () => {
    navigation.navigate(SignUp.name);
  };

  const goToHome = () => {
    navigation.navigate(Tabs.name);
  };

  return (
    <SignScaffold>
      <Image style={styles.logo} source={logo} />
      <View style={styles.form}>
        <View>
          <Text style={styles.headerTitle}>Sign in</Text>
          <Text style={styles.headerSubtitle}>
            Enter your email and password
          </Text>
        </View>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={values => {
            console.log(values);
            goToHome();
          }}
          // validationSchema={formScheme}
        >
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
                  onChangeText={handleChange('password')}
                  label="Password"
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secure={true}
                />
                {errors.password && touched.password && (
                  <>
                    <Text style={styles.errorText}>{errors.password}</Text>
                    <View style={{marginTop: heightScreen * 0.011}} />
                  </>
                )}
              </KeyboardAvoidingView>

              <TouchableOpacity style={styles.forgotButtonBox}>
                <Text style={styles.infoText}>Forgot your password?</Text>
              </TouchableOpacity>
              <Button
                onPress={handleSubmit}
                bgColour="#53B175"
                txtColour="#FFF"
                text="Sign in"
              />
            </>
          )}
        </Formik>
        <View style={styles.footer}>
          <Text style={styles.infoText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={goToSignUp}>
            <Text style={[styles.infoText, styles.greenInfoText]}>Sign up</Text>
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

export default {component: Signin, name: 'Signin'};
