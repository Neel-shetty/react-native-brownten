import {TouchableOpacity, StyleSheet, View} from 'react-native';
import React from 'react';
import SearchBar from '../SearchBar';
import SearchScreen from '../../screens/SearchScreen';
import ExploreTabs from '../../Navigator/ExploreTabs';
import ProductScreen from '../../screens/ProductScreen';
import {useNavigation} from '@react-navigation/native';

const SearchBarHeader = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ExploreTabs.name, {screen: SearchScreen.name});
        }}>
        <SearchBar placeholder="Search Store" navigateTo={null} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBarHeader;

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    paddingHorizontal: 25,
  },
});
