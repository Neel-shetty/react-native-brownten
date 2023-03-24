import React from 'react';
import {
  TouchableOpacity,
  Text,
  Dimensions,
  View,
  StyleSheet,
} from 'react-native';
import {layout} from '../../constants/Layout';

const {width: widthScreen} = Dimensions.get('screen');
interface CategoryCardProps {
  image: any;
  title: string;
  onPress: Function;
  index: number;
  length: number;
}

const SubCategoryCard = ({
  title,
  onPress,
  index,
  length,
}: CategoryCardProps) => {
  console.log('🚀 ~ file: SubCategoryCard.tsx:26 ~ length:', length);
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
          index === 0
            ? {
                borderTopWidth: 1,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }
            : {borderTopWidth: 0},
          index === length - 1
            ? {
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                marginBottom: 20,
              }
            : {},
        ]}>
        <Text style={styles2.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles2 = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 20,
  },
  card: {
    width: layout.widthp - 5,
    minHeight: 60,
    // borderWidth: 1.0,
    marginHorizontal: 7.5,
    // marginBottom: 15.0,
    justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 5.0,
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderBottomWidth: 1,
    // borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});

export default SubCategoryCard;
