import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {layout} from '../constants/Layout';
import EStyleSheet from 'react-native-extended-stylesheet';
import Address from '../components/AddressComponents/Address';
import {AddressType, fetchAddress} from '../api/fetchAddress';
import EncryptedStorage from 'react-native-encrypted-storage';
//@ts-ignore
import Add from '../../assets/icons/commons/AddSquare.svg';
import Ionicons from 'react-native-vector-icons/EvilIcons';
import {colors} from '../constants/colors';
import AddAddressScreen from './AddAddressScreen';

const AddressScreen = ({navigation}: any) => {
  const [address, setAddress] = useState<AddressType[]>();
  const [loading, setLoading] = useState(false);
  console.log(
    '🚀 ~ file: AddressScreen.tsx:16 ~ AddressScreen ~ address:',
    address,
  );

  async function getAddress() {
    setLoading(true);
    const user_id = await EncryptedStorage.getItem('id');
    console.log(
      '🚀 ~ file: AddressScreen.tsx:32 ~ getAddress ~ user_id:',
      user_id,
    );
    if (!user_id) {
      return;
    }
    const result = await fetchAddress(parseInt(user_id, 10));
    console.log(
      '🚀 ~ file: AddressScreen.tsx:27 ~ getAddress ~ result:',
      result,
    );
    if (result) {
      let tempArr: AddressType[] = [];
      result.map((item, index) => {
        tempArr.push({...item, selected: index === 0 ? true : false});
      });
      setAddress(tempArr);
    }
    setLoading(false);
  }
  useEffect(() => {
    getAddress();
  }, []);

  const onPressRadio = (id: number) => {
    console.log(id);
    let tempArr: AddressType[] = [];
    if (!address) {
      return;
    }
    address.map(item => {
      if (item.id === id) {
        tempArr.push({...item, selected: true});
      } else {
        tempArr.push({...item, selected: false});
      }
    });
    setAddress(tempArr);
  };

  if (loading) {
    return (
      <View style={styles.flex1}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  if (!address) {
    return;
  }

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-left" size={30} color={'black'} />
        </TouchableOpacity>
        <Text style={eStyles.text}>My Address</Text>
        <View style={styles.space} />
      </View>
      <View style={styles.listContainer}>
        <View>
          {address.length > 0 ? (
            <FlatList
              data={address}
              onRefresh={() => {
                getAddress();
              }}
              refreshing={loading}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <>
                    <Address
                      key={index}
                      address={item}
                      onPressRadio={onPressRadio}
                    />
                    {index === address.length - 1 && (
                      <TouchableOpacity
                        key={item as unknown as string}
                        onPress={() => {
                          navigation.navigate(AddAddressScreen.name);
                        }}>
                        <View
                          key={index + Math.random()}
                          style={styles.addContainer}>
                          <Add key={index + Math.random()} />
                          <Text
                            key={index + Math.random()}
                            style={styles.addText}>
                            Add New
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </>
                );
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(AddAddressScreen.name);
              }}>
              <View
                style={[
                  styles.addContainer,
                  {
                    flex: 1,
                    // backgroundColor: 'pink',
                    alignItems: 'flex-start',
                    paddingTop: 10,
                  },
                ]}>
                <Add />
                <Text style={styles.addText}>Add New</Text>
              </View>
            </TouchableOpacity>
          )}
          {/* {address.map((item, index) => {})} */}
        </View>
      </View>
    </View>
  );
};

export default {component: AddressScreen, name: 'AddressScreen'};

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
