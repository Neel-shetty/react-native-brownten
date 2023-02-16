import {StyleSheet, View} from 'react-native';
import React from 'react';
import SearchBar from '../SearchBar';
import SearchScreen from '../../screens/SearchScreen';

const SearchBarHeader = () => {
  return (
    <View style={styles.root}>
      <SearchBar navigateTo={SearchScreen.name} />
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
