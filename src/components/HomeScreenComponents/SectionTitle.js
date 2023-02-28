import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation} from '@react-navigation/native';

const SectionTitle = ({title, linkPage, itemData}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(linkPage, {itemData: itemData, autoFocus: false})
        }>
        <Text style={styles.link}>See all</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginTop: 30.0,
    marginBottom: 20.0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: '$gilroyNormal600',
    fontSize: '1.3rem',
    lineHeight: '1.3rem',
    color: '$blackColour',
  },
  link: {
    fontFamily: '$gilroyNormal600',
    fontSize: '1rem',
    color: '$greenColour',
  },
});

export default SectionTitle;
