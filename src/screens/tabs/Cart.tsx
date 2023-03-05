import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CartList from '../../components/CartComponents/CartList';
import Button from '../../components/Button';
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

const CartTab = ({navigation}: any) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const itemCost = useSelector((state: RootState) =>
    state.cart.cartItems.map(
      item =>
        parseInt(item?.variant.item.selling_price, 10) * item?.variant.quantity,
    ),
  );
  console.log('🚀 ~ file: Cart.tsx:23 ~ CartTab ~ itemCost:', itemCost);
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

  // useEffect(() => {
  //   navigation.setOptions({tabBarStyle: {display: 'flex'}});
  // }, []);

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
          value={itemCost.reduce((a: number, b: number) => a + b, 10)}
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
            <View style={styles.itemContainer}>
              <SheetItem
                onPress={() => {
                  console.log('pressed');
                }}
                title="Payment Method"
                value="Online"
                field="payment"
              />
              <SheetItem
                onPress={() => {
                  console.log('pressed');
                }}
                title="Total Cost"
                value={JSON.stringify(
                  itemCost.reduce((a: number, b: number) => a + b, 10),
                )}
                field="cost"
              />
            </View>
            <View style={{flex: 1}}></View>
            <View
              style={{
                width: layout.widthp,
                alignSelf: 'center',
                marginBottom: 20,
              }}>
              <Button
                bgColour={colors.green}
                text="Place Order"
                txtColour="white"
                onPress={() => {
                  navigation.navigate(OrderAccepted.name);
                }}
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
