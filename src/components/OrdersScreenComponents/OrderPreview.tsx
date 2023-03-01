import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {layout} from '../../constants/Layout';
import {colors} from '../../constants/colors';

const OrderPreview = ({order}) => {
  return (
    <View style={styles.root}>
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tue 28 Feb 2023</Text>
        </View>
        <View>
          <Text style={styles.subtitle} numberOfLines={3}>
            {'Order ID - 14089114\n' + 'Order Status - Delivered\n' + '6 items'}
          </Text>
        </View>
      </View>
      <View style={styles.editContainer}>
        <Text style={styles.cost}>$4500</Text>
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
