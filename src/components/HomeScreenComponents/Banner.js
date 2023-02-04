import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import BannerImage from '../../../assets/images/home_screen/banner.png';
import {Layout} from 'react-native-reanimated';

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
    width: Layout.widthp,
    resizeMode: 'contain',
  },
});
