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
import SignUp from './SignUp';
import {Formik} from 'formik';
import * as yup from 'yup';
import {SignIn} from '../api/SignIn';
import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import {setLoggedIn} from '../store/user';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import {layout} from '../constants/Layout';
import Home from './tabs/Home';

const {width: widthScreen, height: heightScreen} = Dimensions.get('window');
// const logo = require('../../assets/images/logo-colour.png');
const logo = require('../../assets/images/home_screen/brownten-logo.png');

interface SignInProps {
  navigation: any;
}

const Signin = ({navigation}: SignInProps) => {
  const [loading, setLoading] = useState(false);
  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;

  const dispatch = useDispatch();

  const formScheme = yup.object({
    phone: yup
      .string()
      .length(10, 'Invalid Phone Number')
      .required('Phone Number is Required!'),
    password: yup
      .string()
      .required('Password is required!')
      .min(8, 'Password has to be atleast 8 characters'),
  });

  const goToSignUp = () => {
    navigation.navigate(SignUp.name);
  };

  return (
    <SignScaffold>
      <Image
        style={{height: 75, width: layout.width, marginVertical: 20}}
        source={logo}
        resizeMode="contain"
      />
      <View style={styles.form}>
        <View>
          <Text style={styles.headerTitle}>Sign in</Text>
          <Text style={styles.headerSubtitle}>
            Enter your email and password
          </Text>
        </View>
        <Formik
          initialValues={{phone: '', password: ''}}
          onSubmit={async values => {
            setLoading(true);
            const result = await SignIn(values.phone, values.password);
            if (result?.status === 1) {
              await EncryptedStorage.setItem('isLoggedIn', 'true');
              await EncryptedStorage.setItem(
                'id',
                JSON.stringify(result.data.id),
              );
              dispatch(setLoggedIn(true));
              navigation.navigate(Home.name);
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
              <KeyboardAvoidingView behavior={behavior}>
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

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(ForgotPasswordScreen.name);
                }}
                style={styles.forgotButtonBox}>
                <Text style={styles.infoText}>Forgot your password?</Text>
              </TouchableOpacity>
              <Button
                onPress={handleSubmit}
                bgColour="#53B175"
                txtColour="#FFF"
                text="Sign in"
                loading={loading}
              />
            </>
          )}
        </Formik>
        <View style={styles.footer}>
          <Text style={styles.infoText}>Don't have an account?</Text>
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
