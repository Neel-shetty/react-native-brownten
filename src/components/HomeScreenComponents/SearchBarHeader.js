import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SearchBar from '../SearchBar';

const SearchBarHeader = () => {
  return (
    <View style={styles.root}>
      <SearchBar navigateTo="search-page" />
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
