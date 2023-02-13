import {StyleSheet, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {layout} from '../../constants/Layout';
import {ImageSlider} from 'react-native-image-slider-banner';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const apple = require('../../../assets/images/products/fruits/applebig.png');

const ProductHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <View style={styles.backContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-back" size={24} color={'#181725'} />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <ImageSlider
          //@ts-ignore
          data={[
            // {
            //   img: 'https://i.imgur.com/lJSWF1N.png',
            // },
            {
              img: apple,
            },
            // {
            //   img: 'https://i.imgur.com/R7YmRyV.png',
            // },
          ]}
          // autoPlay={true}
          closeIconColor="#181725"
          localImg
          // caroselImageStyle={{resizeMode: 'center'}}
        />
      </View>
    </View>
  );
};

export default ProductHeader;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 370,
    backgroundColor: '#F2F3F2',
    width: layout.width,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  backContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    width: layout.widthp,
    marginTop: 20,
    // backgroundColor: 'pink',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minHeight: 300,
  },
});
