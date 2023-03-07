import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {layout} from '../../constants/Layout';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {colors} from '../../constants/colors';
import EncryptedStorage from 'react-native-encrypted-storage';
import {AddressType, fetchAddress} from '../../api/fetchAddress';
import Address from '../AddressComponents/Address';
import {BottomSheetFlatList, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {current} from '@reduxjs/toolkit';

const SheetItem = ({
  title,
  value,
  onPress,
  field,
  setOnline,
}: {
  title: string;
  value?: string;
  onPress: () => void;
  field: string;
  setOnline?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log('🚀 ~ file: SheetItem.tsx:20 ~ field:', field);
  const [idk, setIdk] = useState<boolean>(false);
  const [selected, setSelected] = useState('Online');
  const initalOptions = [
    {title: 'Online', selected: true},
    {title: 'Cash on Delivery', selected: false},
  ];
  const [options, setOptions] = useState(initalOptions);
  const [address, setAddress] = useState<AddressType[]>();
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressType>();
  console.log('🚀 ~ file: SheetItem.tsx:41 ~ selectedAddress:', address);

  async function getAddress() {
    setLoading(true);
    const user_id = await EncryptedStorage.getItem('id');
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
      if (address) {
        setSelectedAddress(address[0]);
      }
    }
    setLoading(false);
  }
  const onPressRadio = (id: number) => {
    console.log(id);
    let tempArr: AddressType[] = [];
    if (!address) {
      return;
    }
    address.map(item => {
      if (item.id === id) {
        tempArr.push({...item, selected: true});
        setSelectedAddress(item);
      } else {
        tempArr.push({...item, selected: false});
      }
    });
    setAddress(tempArr);
    setIdk(false);
  };
  useEffect(() => {
    async function getAddress() {
      setLoading(true);
      const user_id = await EncryptedStorage.getItem('id');
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
    getAddress();
  }, []);

  useEffect(() => {
    if (address) {
      setSelectedAddress(address[0]);
    }
  }, [address]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (field === 'address' && !selectedAddress) {
    return (
      <View>
        <Text>Error fetching address, close this window and try again</Text>
      </View>
    );
  }

  if (idk) {
    if (field === 'payment') {
      return (
        <View>
          {options.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setIdk(false);
                  setSelected(item.title);
                  if (item.title === 'Online') {
                    //@ts-ignore
                    setOnline(true);
                    setOptions([
                      {title: item.title, selected: true},
                      {title: 'Cash on Delivery', selected: false},
                    ]);
                  }
                  if (item.title === 'Cash on Delivery') {
                    //@ts-ignore
                    setOnline(false);
                    setOptions([
                      {title: 'Online', selected: false},
                      {title: 'Cash on Delivery', selected: true},
                    ]);
                  }
                }}>
                <View
                  style={[
                    styles.optionContainer,
                    item.selected ? {backgroundColor: colors.green} : null,
                  ]}>
                  <Text
                    style={[
                      styles.value,
                      item.selected ? {color: 'white'} : null,
                    ]}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    } else if (field === 'address') {
      return (
        <View style={{height: layout.height * 0.3}}>
          <BottomSheetFlatList
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
                    edit={false}
                  />
                </>
              );
            }}
          />
        </View>
      );
    }
  } else {
    if (field === 'payment') {
      return (
        <View style={styles.root}>
          <View style={styles.container}>
            <Text style={styles.key}>{title}</Text>
            <TouchableOpacity
              onPress={() => {
                onPress();
                setIdk(true);
              }}>
              <View style={styles.valueContainer}>
                <Text style={styles.value}>
                  {selected === 'Cash on Delivery' ? 'COD' : selected}
                </Text>
                <EvilIcons name={'chevron-right'} size={34} color={'black'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    console.log(
      "🚀 ~ file: SheetItem.tsx:106 ~ field === 'address':",
      field === 'address',
    );
    if (field === 'address') {
      return (
        <View style={styles.root}>
          <View style={styles.container}>
            <Text style={styles.key}>{title}</Text>
            <TouchableOpacity
              onPress={() => {
                onPress();
                setIdk(true);
              }}>
              <View style={styles.valueContainer}>
                <Text style={styles.value}>{selectedAddress?.name}</Text>
                <EvilIcons name={'chevron-right'} size={34} color={'black'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (field === 'cost') {
      return (
        <View style={styles.root}>
          <View style={styles.container}>
            <Text style={styles.key}>{title}</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>₹{value}</Text>
              <View style={styles.placeHolder} />
            </View>
          </View>
        </View>
      );
    }
  }
  return null;
};

export default SheetItem;

const styles = StyleSheet.create({
  root: {
    width: layout.widthp,
    height: 40,
    justifyContent: 'center',
    marginVertical: 10,
  },
  key: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#7C7C7C',
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  value: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: 'black',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2e2e2',
    width: layout.widthp,
    marginTop: 10,
    borderRadius: 10,
  },
  placeHolder: {
    width: 14,
  },
});
