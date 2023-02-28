import React from 'react';
import {TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');
interface CategoryCardProps {
  image: any;
  title: String;
  onPress: Function;
}

const CategoryCard = ({image, title, onPress}: CategoryCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[styles.card, styles.green]}>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
        resizeMode="contain"
      />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  card: {
    width: widthScreen * 0.42,
    height: heightScreen * 0.21,
    borderWidth: 1.0,
    marginHorizontal: 7.5,
    marginBottom: 15.0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 18.0,
    borderColor: 'red',
    padding: 15.0,
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

export default CategoryCard;
