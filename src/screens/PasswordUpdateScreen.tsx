import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {layout} from '../constants/Layout';
import {colors} from '../constants/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import Ionicons from 'react-native-vector-icons/EvilIcons';
import {Formik} from 'formik';
import {Platform} from 'react-native';
import * as yup from 'yup';
import Input from '../components/Input';
import {KeyboardAvoidingView} from 'react-native';
import Button from '../components/Button';
import {EditPassword} from '../api/EditPassword';
import Account from './tabs/Account';

const PasswordUpdateScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation: any = useNavigation();
  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;
  const formScheme = yup.object({
    password: yup
      .string()
      .required('Required!')
      .min(8, 'Password has to be atleast 8 characters long'),
  });
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-left" size={30} color={'black'} />
        </TouchableOpacity>
        <Text style={eStyles.text}>Change Password</Text>
        <View style={styles.space} />
      </View>
      <View style={styles.listContainer}>
        <View style={{width: layout.widthp}}>
          <Formik
            initialValues={{
              password: '',
            }}
            onSubmit={async values => {
              setLoading(true);
              console.log('onsubmit');
              console.log(values);
              await EditPassword({password: values.password});
              navigation.navigate(Account.name);
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
                  touched.password,
                )}
                <KeyboardAvoidingView behavior={behavior}>
                  <Input
                    label="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('passwrod')}
                    value={values.password}
                    secure
                  />
                  {errors.password && touched.password && (
                    <>
                      <Text style={estyles.errorText}>{errors.password}</Text>
                      <View style={{marginTop: layout.height * 0.011}} />
                    </>
                  )}
                  <View style={{marginTop: layout.height * 0.011}} />
                </KeyboardAvoidingView>
                <Button
                  onPress={handleSubmit}
                  bgColour="#53B175"
                  txtColour="#FFF"
                  text="Update"
                  loading={loading}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
    </View>
  );
};

export default {component: PasswordUpdateScreen, name: 'PasswordUpdateScreen'};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    width: layout.width,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
    width: layout.width,
    maxHeight: 60,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
    flexDirection: 'row',
    paddingHorizontal: layout.width * 0.03,
  },
  listContainer: {
    flex: 9,
    alignItems: 'center',
    // justifyContent: 'center',
    width: layout.width,
    paddingTop: 20,
  },
  buttonContainer: {
    // flex: 2,
    width: layout.widthp,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 70,
    marginBottom: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
  addContainer: {
    width: layout.width * 0.85,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  addText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.green,
  },
  space: {
    width: 30,
  },
  flex1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

const eStyles = EStyleSheet.create({
  text: {
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: '1.125rem',
  },
});

const estyles = EStyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginTop: layout.height * 0.032,
    marginBottom: layout.width * 0.112,
  },
  form: {
    paddingHorizontal: layout.width * 0.06,
  },
  headerTitle: {
    fontSize: '1.625rem',
    lineHeight: '1.625rem',
    height: '1.625rem',
    fontFamily: '$gilroyNormal600',
    marginBottom: layout.height * 0.017,
    color: '$blackColour',
  },
  headerSubtitle: {
    fontSize: '1rem',
    lineHeight: '1rem',
    height: '1rem',
    fontFamily: '$gilroyMedium',
    marginBottom: layout.height * 0.045,
    color: '$darkGreyColour',
  },
  termsBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: layout.height * 0.033,
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
    marginVertical: layout.height * 0.028,
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
