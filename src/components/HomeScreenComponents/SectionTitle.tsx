import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation} from '@react-navigation/native';
import ExploreTabs from '../../Navigator/ExploreTabs';
import SearchScreen from '../../screens/SearchScreen';

const SectionTitle = ({
  title,
  linkPage,
  itemData,
}: {
  title?: string;
  linkPage?: string;
  itemData?: any;
}) => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ExploreTabs.name, {
            screen: SearchScreen.name,
            params: {
              itemData: itemData,
              autoFocus: false,
            },
          })
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
