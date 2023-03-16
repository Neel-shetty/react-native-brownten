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
import ResetPasswordScreen from './ResetPasswordScreen';
import {layout} from '../constants/Layout';

const {width: widthScreen, height: heightScreen} = Dimensions.get('window');
// const logo = require('../../assets/images/logo-colour.png');
const logo = require('../../assets/images/home_screen/brownten-logo.png');

interface SignInProps {
  navigation: any;
}

const ForgotPasswordScreen = ({navigation}: SignInProps) => {
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
            Enter your email or phone number
          </Text>
        </View>
        <Formik
          initialValues={{email: ''}}
          onSubmit={async values => {
            setLoading(true);
            await forgotPassword<string | number>(values.email);
            navigation.navigate(ResetPasswordScreen.name);
            setLoading(false);
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <>
              <KeyboardAvoidingView behavior={behavior}>
                <Input
                  label="Phone Number or Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </KeyboardAvoidingView>
              <Button
                onPress={handleSubmit}
                bgColour="#53B175"
                txtColour="#FFF"
                text="Send OTP"
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

export default {component: ForgotPasswordScreen, name: 'ForgotPasswordScreen'};
