import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {layout} from '../../constants/Layout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../constants/colors';

const Details = () => {
  return (
    <View style={styles.root}>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.titleSubContainer}>
            <Text style={styles.title}>Red apple</Text>
            <AntDesign name="hearto" size={24} color={'#7C7C7C'} />
          </View>
          <Text style={styles.info}>1kg, Price</Text>
        </View>
        <View style={styles.secondContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => null}
              style={styles.quantityContainer}>
              <Icon name="minus" size={24} color={'#B3B3B3'} />
            </TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.quantity}>1</Text>
            </View>
            <TouchableOpacity
              onPress={() => null}
              style={styles.quantityContainer}>
              <Icon name="plus" size={24} color={colors.green} />
            </TouchableOpacity>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>$4.99</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
        {[1, 2, 3].map(() => {
          return <Info />;
        })}
      </ScrollView>
    </View>
  );
};

const Info = () => {
  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailTitleContainer}>
        <Text style={styles.detailTitle}>Product Detail</Text>
        <Text style={styles.detail}>
          Product Detail Product Detail Product Detail Product Detail Product
          Detail Product Detail Product Detail
        </Text>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    // backgroundColor: 'pink',
  },
  detailContainer: {
    // flex: 1,
  },
  flex: {
    flex: 2,
  },
  titleContainer: {
    height: 100,
    // backgroundColor: 'pink',
    width: layout.widthp,
  },
  titleSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: 'black',
  },
  info: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  button: {
    borderColor: '#F0F0F0',
    borderWidth: 1,
    // width: 40,
    // height: 40,
    borderRadius: 15,
    // padding: 16,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityContainer: {
    marginHorizontal: 15,
  },
  quantity: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  secondContainer: {
    width: layout.widthp,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: 'black',
  },
  detailTitleContainer: {
    paddingVertical: 5,
  },
  detailTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'black',
  },
  detail: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#7C7C7C',
  },
});