import {StyleSheet, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {layout} from '../../constants/Layout';
import {ImageSlider} from 'react-native-image-slider-banner';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {ProductProps} from '../../screens/ProductScreen';

interface ProductHeadeProps {
  product: ProductProps;
}

const ProductHeader = ({product}: ProductHeadeProps) => {
  const navigation = useNavigation();
  function createImagesArray() {
    const images = [];
    for (let i = 0; i < product.images?.length; i++) {
      images.push({img: product.images[i]});
    }
    return images;
  }
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
          // @ts-ignore
          data={createImagesArray()}
          closeIconColor="#181725"
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
    minHeight: 350,
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
