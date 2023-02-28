import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  View,
  StyleSheet,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');
interface CategoryCardProps {
  image: any;
  title: string;
  onPress: Function;
}

const SubCategoryCard = ({title, onPress}: CategoryCardProps) => {
  const colorsArr = [
    {bg: 'rgba(83, 177, 117, 0.1)', border: 'rgba(83, 177, 117, 0.7)'},
    {bg: 'rgba(248, 164, 76, 0.1)', border: 'rgba(248, 164, 76, 0.7)'},
    {bg: 'rgba(247, 165, 147, 0.1)', border: 'rgba(247, 165, 147, 0.7)'},
    {bg: 'rgba(211, 176, 224, 0.1)', border: 'rgba(211, 176, 224, 0.7)'},
    {bg: 'rgba(253, 229, 152, 0.1)', border: 'rgba(253, 229, 152, 0.7)'},
    // {bg: 'rgba(215, 59, 119, 0.1)', border: 'rgba(215, 59, 119, 0.7)'},
  ];
  function randomChoice(arr: {bg: string; border: string}[]): {
    bg: string;
    border: string;
  } {
    const num = arr[Math.floor(arr.length * Math.random())];
    if (!num) {
      return randomChoice(colorsArr);
    } else {
      return num;
    }
  }

  const color = randomChoice(colorsArr);
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}>
      <View
        style={[
          styles2.card,
          {backgroundColor: color.bg, borderColor: color.border},
        ]}>
        <Text style={styles2.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  card: {
    width: widthScreen * 0.42,
    // height: 60,
    borderWidth: 1.0,
    marginHorizontal: 7.5,
    marginBottom: 15.0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 18.0,
    // borderColor: color.bg,
    // padding: 15.0,
    // backgroundColor: color.border,
  },
  image: {
    height: heightScreen * 0.1,
    width: widthScreen * 0.3,
    borderRadius: 10,
  },
  text: {
    color: '$blackColour',
    fontFamily: '$gilroyNormal600',
    fontSize: '1rem',
    letterSpacing: 0.1,
  },
  green: {backgroundColor: 'white', borderColor: '#E2E2E2'},
});

const styles2 = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 20,
  },
  card: {
    width: widthScreen * 0.42,
    minHeight: 60,
    borderWidth: 1.0,
    marginHorizontal: 7.5,
    marginBottom: 15.0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18.0,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
});

export default SubCategoryCard;
