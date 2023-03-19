import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {layout} from '../constants/Layout';
import EStyleSheet from 'react-native-extended-stylesheet';
import Fields from '../components/AccountComponents/Fields';
import Ionicons from 'react-native-vector-icons/EvilIcons';

const AccountDetailsScreen = ({navigation}: any) => {
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-left" size={30} color={'black'} />
        </TouchableOpacity>
        <Text style={eStyles.text}>My Account</Text>
        <View />
      </View>
      <View style={styles.listContainer}>
        <Fields />
      </View>
    </View>
  );
};

export default {component: AccountDetailsScreen, name: 'AccountDetailsScreen'};

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
  space: {
    width: 30,
  },
});
