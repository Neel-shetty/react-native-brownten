import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
//@ts-ignore
import SearchIcon from '../../assets/icons/commons/search.svg';
import {useNavigation} from '@react-navigation/native';

interface SearchBarType {
  placeholder: string;
  navigateTo: string;
}

const SearchBar = ({placeholder, navigateTo}: SearchBarType) => {
  const navigation = useNavigation();
  const goToSearchPage = () => {
    //@ts-ignore
    navigation.navigate(navigateTo);
  };

  return (
    <TouchableOpacity onPress={() => goToSearchPage()} style={styles.searchBar}>
      <SearchIcon />
      <Text style={styles.searchBarText}>
        {placeholder ? placeholder : 'Search Store'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  searchBar: {
    width: '100%',
    paddingVertical: 16.0,
    paddingHorizontal: 15.0,
    backgroundColor: '#F2F3F2',
    borderRadius: 15.0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'black',
  },
  searchBarText: {
    marginLeft: 7.0,
    fontFamily: '$gilroyNormal600',
    fontSize: '0.875rem',
    color: '$darkGreyColour',
  },
});

export default SearchBar;
