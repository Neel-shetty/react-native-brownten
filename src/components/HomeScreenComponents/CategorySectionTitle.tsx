import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const CategorySectionTitle = ({title}: {title: string; linkPage?: string}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {/* <TouchableOpacity onPress={() => navigation.navigate(linkPage)}>
        <Text style={styles.link}>See all</Text>
      </TouchableOpacity> */}
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

export default CategorySectionTitle;
