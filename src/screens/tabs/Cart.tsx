import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Text, Alert, ActivityIndicator} from 'react-native';
import CartList from '../../components/CartComponents/CartList';
import {colors} from '../../constants/colors';
import {layout} from '../../constants/Layout';
import EStyleSheet from 'react-native-extended-stylesheet';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBackdrop from '../../components/CartComponents/CustomBackdrop';
import SheetItem from '../../components/CartComponents/SheetItem';
import OrderAccepted from '../status/OrderAccepted';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import Button2 from '../../components/CartComponents/Button';
import Button3 from '../../components/CartComponents/Button3';
import RazorpayCheckout, {CheckoutOptions} from 'react-native-razorpay';
import {api} from '../../api';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useQuery} from 'react-query';
import {AddressType} from '../../api/fetchAddress';
// import {useSelector} from 'react-redux';
import {cartItemType, emptyCart} from '../../store/cart';
import SignIn from '../SignIn';
// import {RootState} from '../../store';

const CartTab = ({navigation}: any) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [online, setOnline] = useState(true);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<AddressType>();
  console.log('🚀 ~ file: Cart.tsx:26 ~ CartTab ~ address:', address);

  const dispatch = useDispatch();

  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

  const itemCost = useSelector((state: RootState) =>
    state.cart.cartItems.map(
      item =>
        (parseInt(item?.variant.item.selling_price, 10) *
          item?.variant.quantity) as number,
    ),
  );
  // console.log('🚀 ~ file: Cart.tsx:38 ~ CartTab ~ itemCost:', itemCost);
  const cartItems: cartItemType[] = useSelector(
    (state: RootState) => state.cart.cartItems,
  );

  // itemCost = itemCost ? itemCost : [0, 0, 0];

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const {
    data: deliveryCharge,
    error,
    isLoading: deliveryChargeLoading,
  } = useQuery(['deliveryCharge', online], async () =>
    api.post('/get/shipping-charge', {
      method: online ? 'Online' : 'Cash on Delivery',
    }),
  );
  // console.log(
  //   '🚀 ~ file: Cart.tsx:38 ~ CartTab ~ data:',
  //   deliveryCharge?.data.data,
  //   error,
  // );
  // console.log(itemCost);
  const totalCartCost =
    itemCost.reduce((a: number, b: number) => a + b, 0) +
    parseInt(deliveryCharge?.data.data, 10);

  // variables
  const snapPoints = useMemo(() => ['25%', '75%'], []);

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

  function login() {
    navigation.navigate(SignIn.name);
  }

  async function placeOrder() {
    setLoading(true);
    if (!deliveryCharge) {
      return;
    }
    const totalCost = totalCartCost;
    const id = await EncryptedStorage.getItem('id');
    api
      .post('/order/insert', {
        user_id: id,
        shipping_address: address?.id,
        shipping_charge: deliveryCharge.data.data,
        items: cartItems,
        total_amount: totalCost,
        payment_method: online ? 'online' : 'Cash On Delivery',
        transaction_id: null,
      })
      .then(result => {
        console.log('order insert response --- ', result.data);
        dispatch(emptyCart());
        setShowBottomSheet(false);
        navigation.setOptions({tabBarStyle: {display: 'flex'}});
        setOnline(true);
        navigation.navigate(OrderAccepted.name);
      })
      .catch(sendCartError =>
        console.log('order insert error --- ', sendCartError.response?.data),
      )
      .finally(() => setLoading(false));
  }

  function pay() {
    setLoading(true);
    if (!deliveryCharge) {
      return;
    }
    const totalCost = totalCartCost;
    console.log('🚀 ~ file: Cart.tsx:92 ~ pay ~ totalCost:', totalCost);
    api
      .post('/create/order/id', {
        amount: totalCost,
      })
      .then(res => {
        console.log('🚀 ~ file: Cart.tsx:73 ~ pay ~ res.data:', res.data);
        if (res.data.status === 1) {
          var options: CheckoutOptions = {
            description: 'Pay Brownten',
            image: 'https://brownten.com/public/uploads/logo/5649782859.png',
            currency: 'INR',
            key: 'rzp_test_RFqjBfnOlEqSwr',
            amount: totalCost,
            name: 'Brownten',
            order_id: res.data.data, //res.data.data.order_id, //Replace this with an order_id created using Orders API.
            // prefill: {
            //   email: 'gaurav.kumar@example.com',
            //   contact: '9191919191',
            //   name: 'Gaurav Kumar',
            // },
            theme: {color: colors.green},
          };
          RazorpayCheckout.open(options)
            .then(data => {
              console.log(
                '🚀 ~ file: Cart.tsx:87 ~ pay ~ data: ----------------------- ',
                data,
              );
              api
                .post('/payment/details', {
                  razorpay_payment_id: data.razorpay_payment_id,
                  razorpay_order_id: res.data.data,
                  razorpay_signature: data.razorpay_signature,
                })
                .then(async response => {
                  if (response.data === 1) {
                    const id = await EncryptedStorage.getItem('id');
                    api
                      .post('/order/insert', {
                        user_id: id,
                        shipping_address: address?.id,
                        shipping_charge: deliveryCharge.data.data,
                        items: cartItems,
                        total_amount: totalCartCost,
                        payment_method: online ? 'online' : 'Cash On Delivery',
                        transaction_id: data.razorpay_payment_id,
                      })
                      .then(result => {
                        console.log('order insert response --- ', result.data);
                        navigation.navigate(OrderAccepted.name);
                        dispatch(emptyCart());
                        setShowBottomSheet(false);
                        navigation.setOptions({tabBarStyle: {display: 'flex'}});
                      })
                      .catch(sendCartError =>
                        console.log(
                          'order insert error --- ',
                          sendCartError.response,
                        ),
                      );
                    // navigation.navigate(OrderAccepted.name);
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

  // if (deliveryChargeLoading || !deliveryCharge) {
  //   return (
  //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Text style={eStyles.text}>My cart</Text>
      </View>
      <View style={styles.listContainer}>
        <CartList />
      </View>
      <View style={styles.buttonContainer}>
        {loggedIn ? (
          <Button2
            text="Go To Checkout"
            bgColour={colors.green}
            onPress={() => {
              setShowBottomSheet(true);
            }}
            txtColour="white"
            value={totalCartCost}
          />
        ) : (
          <Button3
            onPress={login}
            text="Sign In"
            bgColour={colors.green}
            txtColour="white"
          />
        )}
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
              value="address"
              setMainAddress={setAddress}
            />
            <SheetItem
              onPress={() => {
                console.log('pressed');
              }}
              title="Delivery Charge"
              value={deliveryChargeLoading ? 0 : deliveryCharge.data.data}
              field="cost"
            />
            <SheetItem
              onPress={() => {
                console.log('pressed');
              }}
              title="Total Cost"
              value={JSON.stringify(totalCartCost)}
              field="cost"
            />
            {/* </ScrollView> */}
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
                  cartItems?.length > 0 ? (online ? pay : placeOrder) : () => {}
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
