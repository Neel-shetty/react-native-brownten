import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AddressType} from '../../api/fetchAddress';
import RadioButton from '../RadioButton';
//@ts-ignore
import Pen from '../../../assets/icons/commons/Pen.svg';
//@ts-ignore
import Trash from '../../../assets/icons/commons/Trash.svg';
import {layout} from '../../constants/Layout';
import {deleteAddress} from '../../api/deleteAddress';
import {useNavigation} from '@react-navigation/native';
import AddAddressScreen from '../../screens/AddAddressScreen';

interface AddressPropType {
  address: AddressType;
  onPressRadio: (id: number) => void;
}

const Address = ({address, onPressRadio}: AddressPropType) => {
  async function deleteAddr() {
    await deleteAddress(address.id);
  }

  const navigation: any = useNavigation();

  return (
    <View style={styles.root}>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          onPress={() => {
            onPressRadio(address.id);
          }}>
          <RadioButton selected={address.selected} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{address.name}</Text>
        </View>
        <View>
          <Text style={styles.subtitle} numberOfLines={3}>
            {address.address1 +
              '\n' +
              address.address2 +
              '\n' +
              address.city +
              // ', ' +
              // address.state +
              ' - ' +
              address.pincode}
          </Text>
        </View>
      </View>
      <View style={styles.editContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(AddAddressScreen.name, {
              edit: true,
              address: address,
            });
          }}>
          <Pen />
        </TouchableOpacity>
        <View style={styles.smallLine} />
        <TouchableOpacity onPress={deleteAddr}>
          <Trash />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: layout.width * 0.85,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
    // marginVertical: 10,
    paddingVertical: 10,
  },
  radioContainer: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    // backgroundColor: 'pink',
    minWidth: 12,
  },
  infoContainer: {
    flex: 9,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  editContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 5,
    // backgroundColor: 'pink',
  },
  titleContainer: {},
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'black',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#7C7C7C',
  },
  smallLine: {
    borderWidth: 1,
    width: 12,
    marginRight: 6,
    borderColor: '#E2E2E2',
    marginTop: 7,
    marginBottom: 4,
  },
});
