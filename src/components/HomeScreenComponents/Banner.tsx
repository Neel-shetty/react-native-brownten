import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
//@ts-ignore
import BannerImage from '../../../assets/images/home_screen/banner.png';
import {layout} from '../../constants/Layout';

const Banner = () => {
  return (
    <View style={styles.localBox}>
      <Image style={styles.banner} source={BannerImage} />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  localBox: {
    paddingHorizontal: 25.0,
  },
  banner: {
    marginTop: 20.0,
    width: layout.widthp,
    resizeMode: 'contain',
  },
});
