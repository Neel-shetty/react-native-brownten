import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import React from 'react';
import RazorpayCheckout from 'react-native-razorpay';

const RazorPayScreen = () => {
  function pay() {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_live_DuYBNnUQGI2bMj',
      amount: '1',
      name: 'Acme Corp',
      order_id: 'order_DslnoIgkIDL8Zt', //Replace this with an order_id created using Orders API.
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar',
      },
      theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        Alert.alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        Alert.alert('Failed', `Error: ${error.code} | ${error.description}`);
      });
  }
  return (
    <View style={styles.root}>
      <Text>RazorPayScreen</Text>
      <Button title="Pay" onPress={pay} />
    </View>
  );
};

export default {component: RazorPayScreen, name: 'RazorPayScreen'};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});
