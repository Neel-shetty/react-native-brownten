import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {layout} from '../constants/Layout';
import EStyleSheet from 'react-native-extended-stylesheet';
import Fields from '../components/AddAddressComponents/Fields';

const AddAddressScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Text style={eStyles.text}>Add New Address</Text>
      </View>
      <View style={styles.listContainer}>
        <Fields />
      </View>
    </View>
  );
};

export default {component: AddAddressScreen, name: 'AddAddressScreen'};

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
    justifyContent: 'center',
    // backgroundColor: 'pink',
    width: layout.width,
    maxHeight: 60,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
  },
  listContainer: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    width: layout.width,
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
