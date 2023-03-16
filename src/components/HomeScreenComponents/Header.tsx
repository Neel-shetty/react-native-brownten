/*eslint eqeqeq:0*/
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
//@ts-ignore
import LocationPin from '../../../assets/icons/home_screen/location-pin.svg';

const Header = () => {
  const logo = {width: 75, height: 75};
  return (
    <View style={styles.header}>
      <Image
        source={require('../../../assets/images/home_screen/brownten-logo.png')}
        style={{...logo}}
        resizeMode="contain"
      />
      {/* <View style={styles.locationBox}>
        <LocationPin style={styles.locationIcon} />
        <Text style={styles.locationText}>Dhaka, Banassre</Text>
      </View> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    // display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: 'pink',
  },
  logo: {
    width: 26.48,
    height: 30.0,
  },
  locationBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'gilroyNormal600',
    fontSize: 20,
  },
  locationIcon: {
    marginRight: 5.0,
  },
});
