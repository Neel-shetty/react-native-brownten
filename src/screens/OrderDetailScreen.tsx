import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {api} from '../api';
import EncryptedStorage from 'react-native-encrypted-storage';
import Ionicons from 'react-native-vector-icons/EvilIcons';
import {layout} from '../constants/Layout';
import {colors} from '../constants/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import Details from '../components/OrderDetailComponents/Details';
import {OrderType} from './OrdersScreen';

export interface SingleOrdersResponseType {
  status: number;
  data: {data: OrderType};
}

const OrderDetailScreen = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const {data} = useQuery<SingleOrdersResponseType, Error>(
    'singleOrder',
    async () => {
      return api.post('/user/order/detail', {
        order_id: route?.params?.order_id,
      });
    },
  );
  console.log(
    '🚀 ~ file: OrdersScreen.tsx:46 ~ const{data}=useQuery<OrdersResponseType,Error> ~ data:',
    data?.data,
  );
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-left" size={30} color={'black'} />
        </TouchableOpacity>
        <Text style={eStyles.text}>Order Details</Text>
        <View style={styles.space} />
      </View>
      <View style={styles.listContainer}>
        <Details order={data?.data?.data ? data?.data.data : null} />
      </View>
    </View>
  );
};

export default {component: OrderDetailScreen, name: 'OrderDetailScreen'};

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
