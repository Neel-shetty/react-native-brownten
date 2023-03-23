import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {layout} from '../../constants/Layout';
import Button from '../Button';
import Input from '../Input';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {api} from '../../api';
import AccountTabs from '../../Navigator/AccountTabs';

const Fields = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation: any = useNavigation();
  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;
  const formScheme = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    enquiry: yup.string().required('Enquiry is required'),
  });

  async function sendEnquiry(values: {
    name: string;
    email: string;
    enquiry: string;
  }) {
    api
      .post('/submit/enquiry', {
        name: values.name,
        email: values.email,
        enquiry: values.enquiry,
      })
      .then(res => {
        console.log('🚀 ~ file: Fields.tsx:68 ~ sendEnquiry ~ res', res.data);
        Alert.alert('Success', res.data?.message);
        navigation.navigate(AccountTabs.name);
      })
      .catch(error => {
        console.log('🚀 ~ file: Fields.tsx:71 ~ sendEnquiry ~ error', error);
        Alert.alert('Failed to send enquiry.', error?.response?.data?.message);
      });
  }
  return (
    <ScrollView
      contentContainerStyle={styles.root}
      showsVerticalScrollIndicator={false}>
      <View style={styles.fieldContainer}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            enquiry: '',
          }}
          onSubmit={async values => {
            setLoading(true);
            console.log('onsubmit');
            await sendEnquiry(values);
            console.log(values);
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
                touched.name,
              )}
              <KeyboardAvoidingView behavior={behavior}>
                <Input
                  label="Name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <>
                    <Text style={estyles.errorText}>{errors.name}</Text>
                    <View style={{marginTop: layout.height * 0.011}} />
                  </>
                )}
                <View style={{marginTop: layout.height * 0.011}} />

                <View style={{marginTop: layout.height * 0.011}} />
                <Input
                  label="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <>
                    <Text style={estyles.errorText}>{errors.email}</Text>
                    <View style={{marginTop: layout.height * 0.011}} />
                  </>
                )}
                <Input
                  label="Enquiry"
                  onChangeText={handleChange('enquiry')}
                  onBlur={handleBlur('enquiry')}
                  value={values.enquiry}
                />
                {errors.name && touched.name && (
                  <>
                    <Text style={estyles.errorText}>{errors.name}</Text>
                    <View style={{marginTop: layout.height * 0.011}} />
                  </>
                )}
              </KeyboardAvoidingView>
              <Button
                onPress={handleSubmit}
                bgColour="#53B175"
                txtColour="#FFF"
                text="Send"
                loading={loading}
              />
              <View style={{marginTop: layout.height * 0.011}} />
              <View style={{marginTop: layout.height * 0.011}} />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default Fields;

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

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    width: layout.width,
    alignItems: 'center',
  },
  image: {
    width: 165,
    height: 165,
    borderRadius: 165 / 2,
  },
  imageContainer: {
    marginVertical: 10,
    marginTop: 24,
  },
  fieldContainer: {
    width: layout.widthp,
    marginTop: 20,
  },
});
