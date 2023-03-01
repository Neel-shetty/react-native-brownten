import {StyleSheet, View, Text} from 'react-native';
import React, {useState} from 'react';
import Toggle from './Toggle';
import OrderPreview from '../OrdersScreenComponents/OrderPreview';
import {layout} from '../../constants/Layout';

const Details = () => {
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
      <OrderPreview order={''} />
      <View style={styles.addressContainer}>
        <Text style={styles.title}>Address</Text>
        <Text style={styles.name}>Name</Text>
        <Text>
          {'No 10, xyz colony\n' +
            'abc layout, efg nagar\n' +
            'Maharashtra - 560023\n' +
            'Phone - 9934567890\n'}
        </Text>
      </View>
      <View style={styles.paymentContainer}>
        <Text style={styles.title}>Payment Details</Text>
        <TextPair title="Transaction ID" value="pay_K4Et3GqcIfRwAM" />
        <TextPair title="Payment Method" value="Online" />
        <TextPair title="Payment Status" value="Success" />
        <TextPair title="SubTotal" value="Rs 4350" />
        <TextPair title="Shipping Charges" value="Rs 150" />
        <Text style={styles.bkeyText}>
          Total
          <Text style={styles.bvalueText}> - Rs 4500</Text>
        </Text>
      </View>
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
