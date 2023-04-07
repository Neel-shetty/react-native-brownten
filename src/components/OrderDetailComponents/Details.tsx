import {StyleSheet, View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import Toggle from './Toggle';
import OrderPreview from '../OrdersScreenComponents/OrderPreview';
import {layout} from '../../constants/Layout';
import {OrderType} from '../../screens/OrdersScreen';
import FoodCardPreview from './FoodCardPreview';

const Details = ({order}: {order: OrderType}) => {
  console.log('🚀 ~ file: Details.tsx:9 ~ Details ~ order:', order);
  const [info, setInfo] = useState(true);
  const handlePressInfo = () => {
    setInfo(true);
  };
  const handlePressItems = () => {
    setInfo(false);
  };
  return (
    <View style={styles.root}>
      <View style={styles.toggleContainer}>
        <Toggle
          info={info}
          items={!info}
          onPressInfo={handlePressInfo}
          onPressItems={handlePressItems}
        />
      </View>
      {/* <OrderPreview order={order} /> */}
      {info ? (
        <>
          <View style={styles.addressContainer}>
            <Text style={styles.title}>Address</Text>
            <Text style={styles.name}>{order?.username}</Text>
            <Text>
              {order?.shipping_address + '\n'}
              {/* {'No 10, xyz colony\n' +
            'abc layout, efg nagar\n' +
            'Maharashtra - 560023\n' +
            'Phone - 9934567890\n'} */}
            </Text>
          </View>
          <View style={styles.paymentContainer}>
            <Text style={styles.title}>Payment Details</Text>
            {order?.transation_id && (
              <TextPair title="Transaction ID" value={order?.transation_id} />
            )}
            <TextPair title="Payment Method" value={order?.payment_method} />
            <TextPair title="Payment Status" value={order?.payment_status} />
            <TextPair
              title="SubTotal"
              value={(
                parseInt(order?.total_amount, 10) -
                parseInt(order?.shipping_charge, 10)
              ).toString()}
            />
            <TextPair title="Shipping Charges" value={order?.shipping_charge} />
            <Text style={styles.bkeyText}>
              Total
              <Text style={styles.bvalueText}> - Rs {order?.total_amount}</Text>
            </Text>
          </View>
        </>
      ) : (
        <FlatList
          data={order.items}
          renderItem={({item}) => <FoodCardPreview item={item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={180}
        />
      )}
    </View>
  );
};

const TextPair = ({title, value}: {title: string; value: string}) => {
  return (
    <>
      <Text style={styles.keyText}>
        {title} -<Text style={styles.valueText}> {value}</Text>
      </Text>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
  },
  addressContainer: {
    width: layout.widthp,
    paddingLeft: 5,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'black',
  },
  toggleContainer: {
    marginBottom: 10,
  },
  paymentContainer: {
    width: layout.widthp,
    paddingLeft: 5,
    marginTop: 10,
  },
  keyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'black',
  },
  bkeyText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: 'black',
  },
  bvalueText: {
    color: '#7C7C7C',
    fontFamily: 'Poppins-Regular',
  },
  valueText: {
    color: '#7C7C7C',
  },
});
