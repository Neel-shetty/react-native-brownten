import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {layout} from '../../constants/Layout';
import {colors} from '../../constants/colors';
import {OrderType} from '../../screens/OrdersScreen';
import {format} from 'date-fns';

const OrderPreview = ({order}: {order: OrderType}) => {
  if (!order) return;
  const created_at = new Date(order.created_at);
  const month = format(created_at, 'MMM');
  const date = format(created_at, 'd');
  const year = format(created_at, 'yyyy');
  const day = format(created_at, 'iii');
  return (
    <View style={styles.root}>
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {day} {date} {month} {year}
          </Text>
        </View>
        <View>
          <Text style={styles.subtitle} numberOfLines={3}>
            {`Order ID - ${order.order_id}\n` +
              `Order Status - ${order.order_status}\n` +
              `${order.item_qty} items`}
          </Text>
        </View>
      </View>
      <View style={styles.editContainer}>
        <Text style={styles.cost}>₹{order.total_amount}</Text>
      </View>
    </View>
  );
};

export default OrderPreview;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: layout.width * 0.85,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
    paddingVertical: 10,
  },
  radioContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
    minWidth: 12,
  },
  infoContainer: {
    flex: 5,
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
  cost: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: colors.green,
  },
});
