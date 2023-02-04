import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LocationPin from '../../../assets/icons/home_screen/location-pin.svg';

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../../../assets/images/logo-colour.png')}
        style={styles.logo}
      />
      <View style={styles.locationBox}>
        <LocationPin style={styles.locationIcon} />
        <Text style={styles.locationText}>Dhaka, Banassre</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    fontSize: '1.125rem',
  },
  locationIcon: {
    marginRight: 5.0,
  },
});
