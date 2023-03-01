import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {layout} from '../constants/Layout';
import {colors} from '../constants/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import Ionicons from 'react-native-vector-icons/EvilIcons';
import OrderPreview from '../components/OrdersScreenComponents/OrderPreview';
import {FlatList} from 'react-native';
import {useQuery} from 'react-query';
import {api} from '../api';
// import EncryptedStorage from 'react-native-encrypted-storage';
import OrderDetailScreen from './OrderDetailScreen';

export interface OrdersResponseType {
  status: number;
  data: {data: OrderType[]};
}

export interface OrderType {
  id: number;
  user_id: number;
  order_id: string;
  order_status: string;
  username: string;
  shipping_address: string;
  item_name: string;
  item_weight: string;
  item_qty: string;
  item_price: string;
  shipping_charge: string;
  total_amount: string;
  payment_method: string;
  payment_status: string;
  transation_id: string;
  created_at: string;
  updated_at: string;
}

const OrdersScreen = () => {
  const navigation: any = useNavigation();
  const {data} = useQuery<OrdersResponseType, Error>('orders', async () => {
    // const user_id = await EncryptedStorage.getItem('id');
    return api.post('/user/order-history', {user_id: 2});
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
        <Text style={eStyles.text}>My Orders</Text>
        <View style={styles.space} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={data?.data.data ? data.data.data : []}
          renderItem={item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(OrderDetailScreen.name, {
                    order_id: item.item.order_id,
                  });
                }}>
                <OrderPreview order={item.item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default {component: OrdersScreen, name: 'OrdersScreen'};

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
