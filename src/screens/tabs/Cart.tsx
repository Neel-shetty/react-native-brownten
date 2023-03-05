import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import CartList from '../../components/CartComponents/CartList';
import {colors} from '../../constants/colors';
import {layout} from '../../constants/Layout';
import EStyleSheet from 'react-native-extended-stylesheet';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBackdrop from '../../components/CartComponents/CustomBackdrop';
import SheetItem from '../../components/CartComponents/SheetItem';
import OrderAccepted from '../status/OrderAccepted';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import Button2 from '../../components/CartComponents/Button';
import Button3 from '../../components/CartComponents/Button3';
import RazorpayCheckout, {CheckoutOptions} from 'react-native-razorpay';
import {api} from '../../api';
import {ScrollView} from 'react-native';

const CartTab = ({navigation}: any) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [online, setOnline] = useState(true);
  const [loading, setLoading] = useState(false);
  console.log('🚀 ~ file: Cart.tsx:21 ~ CartTab ~ online:', online);

  const itemCost = useSelector((state: RootState) =>
    state.cart.cartItems.map(
      item =>
        parseInt(item?.variant.item.selling_price, 10) * item?.variant.quantity,
    ),
  );
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log('handleSheetChanges', index);
      if (index === 1) {
        navigation.setOptions({tabBarStyle: {display: 'none'}});
      }
      if (index === -1) {
        setShowBottomSheet(false);
        navigation.setOptions({tabBarStyle: {display: 'flex'}});
      }
    },
    [navigation],
  );

  function pay() {
    setLoading(true);
    const totalCost = itemCost.reduce((a: number, b: number) => a + b);
    console.log('🚀 ~ file: Cart.tsx:57 ~ pay ~ totalCost:', totalCost);
    api
      .post('/create/order/id', {
        amount: totalCost,
      })
      .then(res => {
        console.log('🚀 ~ file: Cart.tsx:73 ~ pay ~ res.data:', res.data);
        if (res.data.status === 1) {
          var options: CheckoutOptions = {
            description: 'Pay Brownten',
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: 'INR',
            key: 'rzp_test_RFqjBfnOlEqSwr',
            amount: totalCost,
            name: 'Brownten',
            order_id: res.data.data, //res.data.data.order_id, //Replace this with an order_id created using Orders API.
            prefill: {
              email: 'gaurav.kumar@example.com',
              contact: '9191919191',
              name: 'Gaurav Kumar',
            },
            theme: {color: colors.green},
          };
          RazorpayCheckout.open(options)
            .then(data => {
              // handle success
              // Alert.alert(`Success: ${data.razorpay_payment_id}`);
              console.log('🚀 ~ file: Cart.tsx:87 ~ pay ~ data:', data);
              api
                .post('/payment/details', {
                  razorpay_payment_id: data.razorpay_payment_id,
                  razorpay_order_id: data.razorpay_order_id,
                  razorpay_signature: data.razorpay_signature,
                })
                .then(response => {
                  if (response.data?.status === 1) {
                    navigation.navigate(OrderAccepted.name);
                  }
                })
                .catch(err => {
                  if (err.response) {
                    console.log(
                      '🚀 ~ file: Cart.tsx:96 ~ pay ~ err.response:',
                      err.response,
                    );
                    Alert.alert('Failed', err.response.message);
                  }
                });
            })
            .catch(error => {
              // handle failure\
              console.log(
                '🚀 ~ file: Cart.tsx:113 ~ pay ~ error:',
                error.description,
              );
              Alert.alert(
                'Failed',
                `Error: ${error?.code} | ${error?.description}`,
              );
            });
          setLoading(false);
        }
      })
      .catch(error => {
        console.log('🚀 ~ file: Cart.tsx:125 ~ pay ~ error:', error);
        if (error) {
          Alert.alert('failed', error.response);
        }
        setLoading(false);
      });
  }

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Text style={eStyles.text}>My cart</Text>
      </View>
      <View style={styles.listContainer}>
        <CartList />
      </View>
      <View style={styles.buttonContainer}>
        <Button2
          text="Go To Checkout"
          bgColour={colors.green}
          onPress={() => {
            setShowBottomSheet(true);
          }}
          txtColour="white"
          value={itemCost.reduce((a: number, b: number) => a + b)}
        />
      </View>
      {showBottomSheet ? (
        <BottomSheet
          ref={bottomSheetRef}
          index={showBottomSheet ? 1 : -1}
          snapPoints={snapPoints}
          backdropComponent={CustomBackdrop}
          enablePanDownToClose={true}
          // onClose={() => {
          //   setBottomSheetShown(false);
          // }}
          onChange={handleSheetChanges}>
          <View style={styles.checkoutContainer}>
            <View style={styles.bottomSheetHeaderContainer}>
              <Text style={eStyles.text}>Checkout</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <SheetItem
                onPress={() => {
                  console.log('pressed');
                }}
                title="Payment Method"
                value="Online"
                field="payment"
                setOnline={setOnline}
              />
              <SheetItem
                onPress={() => {
                  console.log('pressed');
                }}
                title="Address"
                field="address"
              />
              <SheetItem
                onPress={() => {
                  console.log('pressed');
                }}
                title="Total Cost"
                value={JSON.stringify(
                  itemCost.reduce((a: number, b: number) => a + b),
                )}
                field="cost"
              />
            </ScrollView>
            <View style={{flex: 1}}></View>
            <View
              style={{
                width: layout.widthp,
                alignSelf: 'center',
                marginBottom: 20,
              }}>
              <Button3
                bgColour={colors.green}
                text="Place Order"
                txtColour="white"
                loading={loading}
                onPress={
                  online
                    ? pay
                    : () => {
                        navigation.navigate(OrderAccepted.name);
                      }
                }
              />
            </View>
          </View>
        </BottomSheet>
      ) : null}
    </View>
  );
};

export default {component: CartTab, name: 'Cart'};

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
    justifyContent: 'center',
    // backgroundColor: 'pink',
    width: layout.width,
    maxHeight: 60,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
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
  checkoutContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  bottomSheetHeaderContainer: {
    width: layout.width,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    paddingHorizontal: layout.width * 0.05,
    paddingBottom: 10,
    // backgroundColor: 'pink',
    // alignItems: 'flex-start',
  },
});

const eStyles = EStyleSheet.create({
  text: {
    // alignSelf: 'center',
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: '1.125rem',
  },
});
