import {
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

const Fields = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;
  const formScheme = yup.object({
    phone: yup
      .string()
      .required('Phone Number is Required!')
      .length(10, 'Invalid Phone Number'),
    name: yup.string().required('Username is required'),
    address1: yup.string().required('Address Line 1 is Required'),
    address2: yup.string(),
    city: yup.string().required('City is Required'),
    state: yup.string().required('State is Required'),
    pincode: yup
      .string()
      .required('Pincode is Required')
      .length(6, 'Pincode must be 6 digits'),
  });

  // const onChangeEdit = (editable: boolean) => {
  //   console.log(
  //     '🚀 ~ file: Fields.tsx:40 ~ onChangeEdit ~ editable:',
  //     editable,
  //   );
  //   const prevCount = editMode.counter;
  //   console.log(
  //     '🚀 ~ file: Fields.tsx:45 ~ onChangeEdit ~ prevCount:',
  //     prevCount,
  //   );
  //   //resetting the value when it goes more than the number of inputs
  //   // if (editMode.counter > 3) {
  //   //   setEditMode({counter: 0, editable: editable});
  //   // }

  //   if (!editable) {
  //     const num = editMode.counter + 1;
  //     console.log('🚀 ~ file: Fields.tsx:51 ~ onChangeEdit ~ num:', num);
  //     setEditMode({counter: num, editable: true});
  //   } else if (editable) {
  //     setEditMode({counter: editMode.counter - 1, editable: true});
  //     console.log(editMode.counter);
  //     if (editMode.counter === 1 && prevCount === 1) {
  //       console.log('last condition');
  //       setEditMode({counter: 0, editable: false});
  //     }
  //   }
  // };

  return (
    <ScrollView
      contentContainerStyle={styles.root}
      showsVerticalScrollIndicator={false}>
      <View style={styles.fieldContainer}>
        <Formik
          initialValues={{
            name: '',
            address1: '',
            address2: '',
            state: '',
            city: '',
            pincode: '',
            phone: '',
          }}
          onSubmit={async values => {
            setLoading(true);
            console.log('onsubmit');
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
                <Input
                  label="Address Line 1"
                  onChangeText={handleChange('address1')}
                  onBlur={handleBlur('address1')}
                  value={values.address1}
                />
                {errors.address1 && touched.address1 && (
                  <>
                    <Text style={estyles.errorText}>{errors.address1}</Text>
                    <View style={{marginTop: layout.height * 0.011}} />
                  </>
                )}
                <View style={{marginTop: layout.height * 0.011}} />
                <Input
                  label="Address Line 2"
                  onChangeText={handleChange('address2')}
                  onBlur={handleBlur('address2')}
                  value={values.address2}
                />
                {errors.address2 && touched.address2 && (
                  <>
                    <Text style={estyles.errorText}>{errors.address2}</Text>
                    <View style={{marginTop: layout.height * 0.011}} />
                  </>
                )}
                <View style={{marginTop: layout.height * 0.011}} />
                <Input
                  label="City"
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  value={values.city}
                />
                {errors.city && touched.city && (
                  <>
                    <Text style={estyles.errorText}>{errors.city}</Text>
                    <View style={{marginTop: layout.height * 0.011}} />
                  </>
                )}
                <Input
                  label="State"
                  onChangeText={handleChange('state')}
                  onBlur={handleBlur('state')}
                  value={values.state}
                />
                {errors.state && touched.state && (
                  <>
                    <Text style={estyles.errorText}>{errors.state}</Text>
                    <View style={{marginTop: layout.height * 0.011}} />
                  </>
                )}
                <Input
                  label="Pincode"
                  onChangeText={handleChange('pincode')}
                  onBlur={handleBlur('pincode')}
                  value={values.pincode}
                  numeric
                />
                {errors.pincode && touched.pincode && (
                  <>
                    <Text style={estyles.errorText}>{errors.pincode}</Text>
                    <View style={{marginTop: layout.height * 0.011}} />
                  </>
                )}
                <Input
                  label="Phone Number"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  numeric
                />
                {errors.city && touched.city && (
                  <>
                    <Text style={estyles.errorText}>{errors.city}</Text>
                    <View style={{marginTop: layout.height * 0.011}} />
                  </>
                )}
              </KeyboardAvoidingView>
              <Button
                onPress={handleSubmit}
                bgColour="#53B175"
                txtColour="#FFF"
                text="Add"
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
