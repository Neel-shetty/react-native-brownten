import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {layout} from '../../constants/Layout';
import Button from '../Button';
import Input from './Input';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Formik} from 'formik';
import * as yup from 'yup';
import {EditAccount} from '../../api/EditAccount';
import {useNavigation} from '@react-navigation/native';
import PasswordUpdateScreen from '../../screens/PasswordUpdateScreen';
import {api} from '../../api';
import EncryptedStorage from 'react-native-encrypted-storage';

export interface ProfileType {
  created_at: '2022-08-09T05:33:25.000000Z';
  email: 'mark@example.com';
  email_verified_at: null;
  forgot_pin: null;
  id: 4;
  image: 'uploads/profile/2409601481.jpg';
  is_active: '1';
  name: 'mark';
  otp: null;
  phone: '8787676565';
  role: '3';
  updated_at: '2022-08-09T05:33:25.000000Z';
}

const Fields = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [editMode, setEditMode] = useState({counter: 0, editable: false});
  const [details, setDetails] = useState<ProfileType>();

  const naviagtion: any = useNavigation();

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
    username: yup.string().required('Username is required'),
  });

  async function fetchProfile() {
    const id = await EncryptedStorage.getItem('id');
    console.log('🚀 ~ file: Fields.tsx:46 ~ fetchProfile ~ id:', id);
    api
      .post('/user/profile', {user_id: 4})
      .then(res => {
        console.log(res.data);
        setDetails(res.data.data);
      })
      .catch(error => console.log(error?.response?.data));
  }

  const onChangeEdit = (editable: boolean) => {
    const prevCount = editMode.counter;

    if (!editable) {
      const num = editMode.counter + 1;
      console.log('🚀 ~ file: Fields.tsx:51 ~ onChangeEdit ~ num:', num);
      setEditMode({counter: num, editable: true});
    } else if (editable) {
      setEditMode({counter: editMode.counter - 1, editable: true});
      console.log(editMode.counter);
      if (editMode.counter === 1 && prevCount === 1) {
        console.log('last condition');
        setEditMode({counter: 0, editable: false});
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!details) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.root}
      showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png',
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.fieldContainer}>
        <Formik
          initialValues={{
            email: details.email,
            username: details.name,
            phone: details.phone,
            password: '',
          }}
          onSubmit={async values => {
            setLoading(true);
            console.log('onsubmit');
            console.log(values);
            await EditAccount({
              name: values.username,
              phone: values.phone,
              email: values.email,
            });
            setEditMode({counter: 0, editable: false});
            //fetchDetails()
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
                  onPressEdit={onChangeEdit}
                />
                {errors.username && touched.username && (
                  <>
                    <Text style={estyles.errorText}>{errors.username}</Text>
                    <View style={{marginTop: layout.height * 0.011}} />
                  </>
                )}
                <View style={{marginTop: layout.height * 0.011}} />
                <Input
                  label="Phone Number"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  numeric
                  onPressEdit={onChangeEdit}
                />
                {errors.phone && touched.phone && (
                  <>
                    <Text style={estyles.errorText}>{errors.phone}</Text>
                    <View style={{marginTop: layout.height * 0.011}} />
                  </>
                )}
                <View style={{marginTop: layout.height * 0.011}} />
                <Input
                  label="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  onPressEdit={onChangeEdit}
                />
                {errors.email && touched.email && (
                  <>
                    <Text style={estyles.errorText}>{errors.email}</Text>
                    <View style={{marginTop: layout.height * 0.011}} />
                  </>
                )}
                <View style={{marginTop: layout.height * 0.011}} />
              </KeyboardAvoidingView>
              <View style={estyles.termsBox}>
                <TouchableOpacity
                  onPress={() => {
                    naviagtion.navigate(PasswordUpdateScreen.name);
                  }}>
                  <Text style={estyles.infoText}>
                    <Text style={[estyles.infoText, estyles.greenInfoText]}>
                      Change Password
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
              {editMode.editable ? (
                <Button
                  onPress={handleSubmit}
                  bgColour="#53B175"
                  txtColour="#FFF"
                  text="Update"
                  loading={loading}
                />
              ) : null}
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
